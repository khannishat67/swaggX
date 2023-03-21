package com.cosmos.api.datadictionary;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.junit.Assert;

import com.cosmos.api.datadictionary.model.ExcelDataStructure;
import com.cosmos.api.datadictionary.model.Type;
import com.cosmos.api.datadictionary.util.ExcelSheetToJsonConverter;
import com.cosmos.api.datadictionary.util.PopulateDataDictionaryUtil;
import com.cosmos.api.domain.AppConstants;
import com.cosmos.api.domain.SubCategory;
import com.cosmos.api.swaggerstudio.business.util.PrintJsonUtil;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class SwaggerStudioDataDictionaryTest extends TestCase {

	public SwaggerStudioDataDictionaryTest(String testName) {
		super(testName);
	}

	public static Test suite() {
		return new TestSuite(SwaggerStudioDataDictionaryTest.class);
	}

	public void testApp() {
		try {
			File resourcesDirectory = new File("src/main/resources");
			String SAMPLE_XLSX_FILE_PATH = resourcesDirectory.getAbsolutePath() + "//DataDictionary_Sample.xlsx";
			String SAMPLE_JSON_FILE_PATH = resourcesDirectory.getAbsolutePath() + "//datadic-sample.json";
			Map<String, ExcelDataStructure> columnMapping = new HashMap<String, ExcelDataStructure>();

			ExcelDataStructure st2 = new ExcelDataStructure("Object", 0, Type.STRING);
			columnMapping.put("Object", st2);
			ExcelDataStructure st3 = new ExcelDataStructure("DataElement", 1, Type.STRING);
			columnMapping.put("DataElement", st3);
			ExcelDataStructure st4 = new ExcelDataStructure("Label", 2, Type.STRING);
			columnMapping.put("Label", st4);
			ExcelDataStructure st5 = new ExcelDataStructure("Type", 3, Type.STRING);
			columnMapping.put("Type", st5);
			ExcelDataStructure st6 = new ExcelDataStructure("Minlength", 4, Type.STRING);
			columnMapping.put("Minlength", st6);
			ExcelDataStructure st7 = new ExcelDataStructure("MaxLength", 5, Type.STRING);
			columnMapping.put("MaxLength", st7);
			ExcelDataStructure st8 = new ExcelDataStructure("Required", 6, Type.STRING);
			columnMapping.put("Required", st8);
			ExcelDataStructure st12 = new ExcelDataStructure("Format", 7, Type.STRING);
			columnMapping.put("Format", st12);
			ExcelDataStructure st10 = new ExcelDataStructure("Example", 8, Type.STRING);
			columnMapping.put("Example", st10);
			ExcelDataStructure st11 = new ExcelDataStructure("Description", 9, Type.STRING);
			columnMapping.put("Description", st11);
			
			String categoryListString= "HEADERS,PARAMETERS,RESOURCES,ERRORS";
			List<String> categoryList = Arrays.asList(categoryListString.split(","));
			
			List<SubCategory> childSubcategoriesAll = new ArrayList<>();
			
			// Get the data from all the excel sheet	
			for(int i=0;i<categoryList.size();i++){
				List<SubCategory> childSubcategories = PopulateDataDictionaryUtil.generateDictionaryData(SAMPLE_XLSX_FILE_PATH, categoryList.get(i),
						columnMapping, 1, 0);
				childSubcategoriesAll.addAll(childSubcategories);
			}
			
			String jsonData = PrintJsonUtil.getJsonFromObject(childSubcategoriesAll);
			PrintJsonUtil.exportJsonToFile(SAMPLE_JSON_FILE_PATH, jsonData);
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
			Assert.fail();
		}
	}
}
