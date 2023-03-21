package com.cosmos.api.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class CategoryResponse implements Serializable {

	private static final long serialVersionUID = -8849289471174466769L;
	private List<Category> categories = new ArrayList<Category>();

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

}
