package com.cosmos.api.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.SerializedName;

public class SubCategory implements Serializable {

	private static final long serialVersionUID = 6374294518961231927L;
	private String id;
	private String name;
	private String type;
	private boolean required;
	private String minLength;
	private String maxLength;
	private String description;
	private List<String> values;
	private String category;
	private String format;

	private String code;
	@SerializedName("schema_ref")
	private String schemaRef;
	private List<SubCategory> headers;
	@SerializedName("parent_ids")
	private List<String> parent;
	@SerializedName("children_ids")
	private List<String> childrenIds;
	private transient boolean isParentIdUpdated;
	private String pattern;
	private String dataElement;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		if(name.contains("\\")){
			name.replaceAll("\\", "");
		}
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

	public List<String> getValues() {
		if (values == null) {
			values = new ArrayList<String>();
		}
		return values;
	}

	public void setValues(List<String> values) {
		this.values = values;
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

	public List<String> getParent() {
		if (this.parent == null) {
			this.parent = new ArrayList<String>();
		}
		return this.parent;
	}

	public void setParent(List<String> parent) {
		this.parent = parent;
	}

	public List<String> getChildrenIds() {
		return this.childrenIds;
	}

	public void adddTochildrenIds(String childrenId){
		if(childrenIds == null){
			childrenIds = new ArrayList<String>();
		}
		childrenIds.add(childrenId);
	}
	
	public boolean isParentIdUpdated() {
		return isParentIdUpdated;
	}

	public void setParentIdUpdated(boolean isParentIdUpdated) {
		this.isParentIdUpdated = isParentIdUpdated;
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
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + ((childrenIds == null) ? 0 : childrenIds.hashCode());
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((format == null) ? 0 : format.hashCode());
		result = prime * result + ((headers == null) ? 0 : headers.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((maxLength == null) ? 0 : maxLength.hashCode());
		result = prime * result + ((minLength == null) ? 0 : minLength.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((parent == null) ? 0 : parent.hashCode());
		result = prime * result + ((pattern == null) ? 0 : pattern.hashCode());
		result = prime * result + (required ? 1231 : 1237);
		result = prime * result + ((schemaRef == null) ? 0 : schemaRef.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		result = prime * result + ((values == null) ? 0 : values.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SubCategory other = (SubCategory) obj;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (childrenIds == null) {
			if (other.childrenIds != null)
				return false;
		} else if (!childrenIds.equals(other.childrenIds))
			return false;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (format == null) {
			if (other.format != null)
				return false;
		} else if (!format.equals(other.format))
			return false;
		if (headers == null) {
			if (other.headers != null)
				return false;
		} else if (!headers.equals(other.headers))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (maxLength == null) {
			if (other.maxLength != null)
				return false;
		} else if (!maxLength.equals(other.maxLength))
			return false;
		if (minLength == null) {
			if (other.minLength != null)
				return false;
		} else if (!minLength.equals(other.minLength))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (parent == null) {
			if (other.parent != null)
				return false;
		} else if (!parent.equals(other.parent))
			return false;
		if (pattern == null) {
			if (other.pattern != null)
				return false;
		} else if (!pattern.equals(other.pattern))
			return false;
		if (required != other.required)
			return false;
		if (schemaRef == null) {
			if (other.schemaRef != null)
				return false;
		} else if (!schemaRef.equals(other.schemaRef))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		if (values == null) {
			if (other.values != null)
				return false;
		} else if (!values.equals(other.values))
			return false;
		return true;
	}

	public void setChildrenIds(List<String> childrenIds) {
		if (this.getChildrenIds() == null) {
			this.childrenIds = new ArrayList<>();
		}
		this.childrenIds.addAll(childrenIds);

	}

	@Override
	public String toString() {
		return "SubCategory [id=" + id + ", name=" + name + ", type=" + type + ", required=" + required + ", minLength="
				+ minLength + ", maxLength=" + maxLength + ", description=" + description + ", values=" + values
				+ ", category=" + category + ", format=" + format + ", code=" + code + ", schemaRef=" + schemaRef
				+ ", headers=" + headers + ", parent=" + parent + ", childrenIds=" + childrenIds + ", pattern="
				+ pattern + "]";
	}

	
}
