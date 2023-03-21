package com.cosmos.api.datadictionary.util;

import java.util.Arrays;
import java.util.List;

import com.cosmos.api.datadictionary.model.ExcelSubCategory;
import com.cosmos.api.domain.SubCategory;

public class ExcelObjectToObjectConversion {

	public static String removeLastSpecialCharecter(String str) {
		if (str != null && str.length() > 0) {
			char ch = str.charAt(str.length() - 1);
			if (!(Character.isAlphabetic(ch) || Character.isDigit(ch))) {
				str = str.substring(0, str.length() - 1);
			}
		}
		return str;
	}

	public static SubCategory convertExcelCategoryToObject(ExcelSubCategory excelSubCategory, String category) {
		SubCategory subCategory = new SubCategory();
		String name = excelSubCategory.getLabel();
		if (name == null || name.isEmpty()) {
			return null;
		} else {
			if (name.contains(":")) {
				name = name.split(":")[0];
			}
			if (name.contains("*")) {
				name = name.replaceAll("*", "");
			}
			if (name.contains("/")) {
				name = name.replaceAll("/", "");
			}
			name = name.trim();
			name = removeLastSpecialCharecter(name);
		}
		String type = excelSubCategory.getType();
		if (type != null) {
			type = type.trim();
			if (type.contains(",")) {
				type = type.split(",")[0];
			}
			if (type.contains(" ")) {
				type = type.split(" ")[0];
			} else if (type.equalsIgnoreCase("array")) {
				type = "object";
			}
		}
		subCategory.setDataElement(excelSubCategory.getDataElement());
		if(excelSubCategory.getMaxLength() != null && !excelSubCategory.getMaxLength().isEmpty()){
			subCategory.setMaxLength(excelSubCategory.getMaxLength());
		}
		if(excelSubCategory.getMinLength() != null && !excelSubCategory.getMinLength().isEmpty()){
			subCategory.setMinLength(excelSubCategory.getMinLength());
		}
		if (excelSubCategory.getOptionalRequired() != null) {
			boolean isRequired = excelSubCategory.getOptionalRequired().equalsIgnoreCase("Required");
			subCategory.setRequired(isRequired);

		}
		if (excelSubCategory.getValues() != null) {
			if (excelSubCategory.getValues() != null) {
				String[] values = excelSubCategory.getValues().split(",");
				subCategory.getValues().addAll(Arrays.asList(values));
			}

		}
		if (name != null) {
			subCategory.setName(name.trim().replaceAll("/", "").trim());
		}
		subCategory.setType(type);
		if (excelSubCategory.getObject() != null) {
			subCategory.getParent().add(excelSubCategory.getObject());
		}
		String description = excelSubCategory.getDescription();
		subCategory.setDescription(description);
		subCategory.setCategory(category);
		if(excelSubCategory.getFormat() != null && !excelSubCategory.getFormat().isEmpty()){
			subCategory.setFormat(excelSubCategory.getFormat());
		}
		return subCategory;

	}

}
