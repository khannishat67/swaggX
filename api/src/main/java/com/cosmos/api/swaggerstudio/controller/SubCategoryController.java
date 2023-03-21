package com.cosmos.api.swaggerstudio.controller;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.configuration2.CombinedConfiguration;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

import com.cosmos.api.datadictionary.util.ExcelSheetToJsonConverter;
import com.cosmos.api.domain.AppConstants;
import com.cosmos.api.domain.SubCategoryResponse;
import com.cosmos.api.swaggerstudio.business.SubCategoryService;
import com.cosmos.api.swaggerstudio.business.util.PrintJsonUtil;
import com.cosmos.api.swaggerstudio.controller.exception.AppException;
import com.cosmos.api.swaggerstudio.util.FileUtil;

@Path("/subcategories")
@Resource
@RestController
public class SubCategoryController {
	private static final Logger logger = LoggerFactory.getLogger(SubCategoryController.class);

	@Inject
	SubCategoryService subCategoryService;

	@Inject
	private CombinedConfiguration config;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public SubCategoryResponse getAllsubCategories(@QueryParam("text") String text,
			@QueryParam("metaphoneText") String metatext, @QueryParam("parentId") String categoryid) {
		if (metatext != null) {
			return subCategoryService.getSubCategoryByNameWithMetaphone(metatext);
		} else if (text != null) {
			return subCategoryService.getSubCategoryByName(text);
		} else if (categoryid != null) {
			return subCategoryService.getSubCategoryByParentIds(categoryid);
		}
		return subCategoryService.getAllSubCategory();

	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public SubCategoryResponse getSubCategory(@PathParam("id") String id) throws AppException {
		return subCategoryService.getSpecificSubCategory(id);
	}

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public com.cosmos.api.domain.Response addCategory(@FormDataParam("file") InputStream fileInputStream,
			@FormDataParam("file") FormDataContentDisposition fileMetaData) throws AppException {
		logger.info("Adding category ");
		String uploadPath = config.getString(AppConstants.TEMP_PATH);
		File directory = new File(uploadPath);
		if (!directory.exists()) {
			directory.mkdirs();
		}
		logger.info("uploadPath is " + uploadPath);
		logger.info("fileMetaData contains " + fileMetaData);

		try {
			int read = 0;
			byte[] bytes = new byte[1024];
			String fileName = uploadPath + File.separator + UUID.randomUUID().toString();
			OutputStream out = FileUtil.getFile(fileName);
			while ((read = fileInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
			String jsonContent = "";
			try {
				if (!isJsonFile(fileMetaData.getFileName())) {
					String categoryListString= config.getString(AppConstants.CATEGORIES);
					List<String> categoryList = Arrays.asList(categoryListString.split(","));
					jsonContent = ExcelSheetToJsonConverter.getJsonDataFromExcel(fileName,categoryList);
				} else {
					jsonContent = PrintJsonUtil.readJsonFile(fileName);
				}
				// logger.info("jsonContent " + jsonContent);
			} catch (Exception e) {
				e.printStackTrace();
				throw new AppException(Response.Status.NOT_FOUND.getStatusCode(), 484, "Invalid file found + fileName",
						"Invalid file found " + fileName);
			}
			subCategoryService.addSpecificSubCategory(jsonContent);
		} catch (Exception e) {
			logger.info("" + e);
			throw new WebApplicationException("Error while uploading file. Please try again !!");
		}
		return new com.cosmos.api.domain.Response(200, "Data uploaded successfully");
	}

	public boolean isJsonFile(String fileName) {
		for (String extension : AppConstants.EXCEL_TYPES) {
			if (fileName.endsWith(extension)) {
				return false;
			}
		}
		return true;
	}
}
