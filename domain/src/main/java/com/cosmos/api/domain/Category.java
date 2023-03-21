package com.cosmos.api.domain;

import java.io.Serializable;
import java.util.List;

import com.google.gson.annotations.SerializedName;

public class Category implements Serializable {
	private static final long serialVersionUID = -1177703565160657892L;
	private String id;
	private String name;
	private String description;
	@SerializedName(value = "children_ids")
	private List<String> childrenIds;

	public Category(String id, String name, String description, List<String> childrenIds) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.childrenIds = childrenIds;
	}

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getChildrenIds() {
		return childrenIds;
	}

	public void setChildrenIds(List<String> childrenIds) {
		this.childrenIds = childrenIds;
	}

}