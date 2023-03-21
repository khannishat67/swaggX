package com.cosmos.api.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class SubCategoryResponse implements Serializable{

	private static final long serialVersionUID = 2617723989678255565L;
	private List<SubCategory> subCategories = new ArrayList<>();

	public List<SubCategory> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(List<SubCategory> subCategories) {
		this.subCategories = subCategories;
	}
	
}
