package com.cosmos.api.core;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.querydsl.core.annotations.QueryEntity;

@QueryEntity
@Document(value = "dccs_category")
public class Category {

	@Id
	private String id;
	private String name;
	private String description;

	@Field("children_ids")
	private List<String> childrenIds;

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

	public void addToChildrenIds(String id) {
		if (this.childrenIds == null) {
			this.childrenIds = new ArrayList<String>();
		}
		this.childrenIds.add(id);
	}

}
