package com.cosmos.api.swaggerstudio.business.util;

import com.cosmos.api.core.Category;

public final class CategoryConverter {

	private CategoryConverter() {
		// added empty constructor
	}

	public static com.cosmos.api.domain.Category coreToDomain(Category categoryEntity) {
		if (categoryEntity != null) {
			return new com.cosmos.api.domain.Category(categoryEntity.getId(), categoryEntity.getName(),
					categoryEntity.getDescription(), categoryEntity.getChildrenIds());
		}
		return null;
	}

	public static Category domainToCore(com.cosmos.api.domain.Category category) {
		if (category != null) {
			Category categoryEntity = new Category();
			categoryEntity.setId(category.getId());
			categoryEntity.setDescription(category.getDescription());
			categoryEntity.setName(category.getName());
			categoryEntity.setChildrenIds(category.getChildrenIds());
			return categoryEntity;
		}
		return null;

	}
}
