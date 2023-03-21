package com.cosmos.api.core;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.querydsl.core.annotations.QueryEntity;

@QueryEntity
@Document(value = "dcss_subcategory")
public class SubCategory {

	@Id
	private String id;

	private String name;
	private String dataElement;
	private String type;
	private boolean required;
	private String minLength;
	private String maxLength;
	private String description;
	private String format;

	@Field("parent_ids")
	private List<String> parentIds;

	@Field("children_ids")
	private List<String> childrenIds;
	private String categoryId;
	private List<String> values;
	private boolean isParentIdUpdated;
	private String code;

	@Field("schema_ref")
	private String schemaRef;
	private List<SubCategory> headers;
	private String pattern;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public List<String> getParentIds() {
		return parentIds;
	}

	public void setParentIds(List<String> parentIds) {
		this.parentIds = parentIds;
	}

	public List<String> getChildrenIds() {
		return childrenIds;
	}

	public void setChildrenIds(List<String> childrenIds) {
		this.childrenIds = childrenIds;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public List<String> getValues() {
		return values;
	}

	public void setValues(List<String> values) {
		this.values = values;
	}

	public boolean isParentIdUpdated() {
		return isParentIdUpdated;
	}

	public void setParentIdUpdated(boolean isParentIdUpdated) {
		this.isParentIdUpdated = isParentIdUpdated;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSchemaRef() {
		return schemaRef;
	}

	public void setSchemaRef(String schemaRef) {
		this.schemaRef = schemaRef;
	}

	public List<SubCategory> getHeaders() {
		return headers;
	}

	public void setHeaders(List<SubCategory> headers) {
		this.headers = headers;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getDataElement() {
		return dataElement;
	}

	public void setDataElement(String dataElement) {
		this.dataElement = dataElement;
	}

	@Override
	public String toString() {
		return "SubCategory [id=" + id + ", name=" + name + ", dataElement=" + dataElement + ", type=" + type
				+ ", required=" + required + ", minLength=" + minLength + ", maxLength=" + maxLength + ", description="
				+ description + ", format=" + format + ", parentIds=" + parentIds + ", childrenIds=" + childrenIds
				+ ", categoryId=" + categoryId + ", values=" + values + ", isParentIdUpdated=" + isParentIdUpdated
				+ ", code=" + code + ", schemaRef=" + schemaRef + ", headers=" + headers + ", pattern=" + pattern + "]";
	}
	

}
