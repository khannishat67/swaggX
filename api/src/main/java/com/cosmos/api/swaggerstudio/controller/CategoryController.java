package com.cosmos.api.swaggerstudio.controller;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.web.bind.annotation.RestController;

import com.cosmos.api.domain.CategoryResponse;
import com.cosmos.api.swaggerstudio.business.CategoryService;
import com.cosmos.api.swaggerstudio.controller.exception.AppException;

@Path("/categories")
@Resource
@RestController

public class CategoryController {

	@Inject
	CategoryService categoryService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public CategoryResponse getAllCategories(@QueryParam("text") String name) {
		if (name != null) {
			return categoryService.getCategoryByName(name);
		}
		return categoryService.getAllCategory();
	}

	@GET
	@Path("/(id}")
	@Produces(MediaType.APPLICATION_JSON)

	public CategoryResponse getCategory(@PathParam("id") String id) throws AppException {
		return categoryService.getSpecificCategory(id);
	}
}
