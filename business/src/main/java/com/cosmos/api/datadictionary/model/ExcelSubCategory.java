package com.cosmos.api.datadictionary.model;

import com.google.gson.annotations.SerializedName;

public class ExcelSubCategory {

	@SerializedName("Object")
	private String object;

	@SerializedName("DataElement")
	private String dataElement;
	@SerializedName("Label")
	private String label;
	@SerializedName("Type")
	private String type;
	@SerializedName("MinLength")
	private String minLength;
	@SerializedName("MaxLength")
	private String maxLength;
	@SerializedName("Required")
	private String optionalRequired;
	@SerializedName("Example")
	private String values;
	@SerializedName("Description")
	private String description;
	@SerializedName("Category")
	private String category;
	@SerializedName("Format")
	private String format;

	public String getObject() {
		return object;
	}

	public void setObject(String object) {
		this.object = object;
	}

	public String getDataElement() {
		return dataElement;
	}

	public void setDataElement(String dataElement) {
		this.dataElement = dataElement;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMinLength() {
		return minLength;
	}

	public void setMinLength(String minLength) {
		this.minLength = minLength;
	}

	public String getMaxLength() {
		return maxLength;
	}

	public void setMaxLength(String maxLength) {
		this.maxLength = maxLength;
	}

	public String getOptionalRequired() {
		return optionalRequired;
	}

	public void setOptionalRequired(String optionalRequired) {
		this.optionalRequired = optionalRequired;
	}

	public String getValues() {
		return values;
	}

	public void setValues(String values) {
		this.values = values;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public ExcelSubCategory(String object, String dataElement, String label, String type, String minLength,
			String maxLength, String optionalRequired, String exampleValues, String description, String category) {
		super();
		this.object = object;
		this.dataElement = dataElement;
		this.label = label;
		this.type = type;
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.optionalRequired = optionalRequired;
		this.values = exampleValues;
		this.description = description;
		this.category = category;
	}

}
