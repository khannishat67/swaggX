package com.cosmos.api.datadictionary.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import com.cosmos.api.datadictionary.model.ExcelDataStructure;
import com.cosmos.api.datadictionary.model.ExcelSubCategory;
import com.cosmos.api.domain.SubCategory;
import com.cosmos.api.swaggerstudio.business.util.PrintJsonUtil;
import com.google.gson.JsonArray;

public final class PopulateDataDictionaryUtil {

	public static List<SubCategory> generateDictionaryData(String excelFileName, String category,
			Map<String, ExcelDataStructure> columnMapping, int rowStartCountr, int endRowCounter)
			throws InvalidFormatException, IOException {
		List<SubCategory> subCategoryList = new ArrayList<SubCategory>();
		JsonArray subCategoryDetails = ExcelReader.readExcelsheet(excelFileName, category, columnMapping,
				rowStartCountr, endRowCounter);
		if(subCategoryDetails!= null){
			List<ExcelSubCategory> excelArr = populateSubCategory(subCategoryDetails);
			for (ExcelSubCategory ecl : excelArr) {
				// convert ExcelSubCategory to SubCategory
				if (ecl.getDataElement() != null) {
					SubCategory subCatgr = ExcelObjectToObjectConversion.convertExcelCategoryToObject(ecl,category);
					subCategoryList.add(subCatgr);
				}
			}
			// System.out.println(subCategoryList);
			subCategoryList = cleanData(subCategoryList);
			//subCategoryList = SubCategoryUtil.generateMiddleLayerSubCategoryList(subCategoryList);
			subCategoryList = SubCategoryUtil.populateSubCategoryParentChild(subCategoryList);
		}
		
		return subCategoryList;
	}

	public static List<ExcelSubCategory> populateSubCategory(JsonArray jsonArray)
			throws InvalidFormatException, IOException {
		ExcelSubCategory[] excelSubCatArr = (ExcelSubCategory[]) PrintJsonUtil.getObjectFromJsonObject(jsonArray,
				ExcelSubCategory[].class);
		return Arrays.asList(excelSubCatArr);
	}

	public static ExcelSubCategory[] populateSubCategory(String jsonString) {
		return (ExcelSubCategory[]) PrintJsonUtil.getObjectFromJsonString(jsonString, ExcelSubCategory[].class);
	}

	/**
	 * Keep only those rows which have proper data
	 * 
	 * @param subCategoryList
	 * @return
	 */
	public static List<SubCategory> cleanData(List<SubCategory> subCategoryList) {
		List<SubCategory> updatedSubCategory = new ArrayList<SubCategory>();
		for (SubCategory subCategory : subCategoryList) {
			if (!isEmptySubCategory(subCategory)) {
				updatedSubCategory.add(subCategory);
			}
		}
		return updatedSubCategory;
	}

	public static boolean isEmptySubCategory(SubCategory subCategory) {
		if (subCategory == null) {
			return true;
		}
		if (subCategory.getCategory() != null && !subCategory.getCategory().isEmpty()) {
			return false;
		}
		if (subCategory.getParent() != null && !subCategory.getParent().isEmpty()) {
			return false;
		}
		if (subCategory.getName() != null && !subCategory.getName().isEmpty()) {
			return false;
		}
		return true;
	}
}