package com.cosmos.api.swaggerstudio.business.util;

import java.util.ArrayList;
import java.util.List;

import com.cosmos.api.core.SubCategory;

public final class SubCategoryConverter {

	private SubCategoryConverter() {
		// added private constructor
	}

	public static com.cosmos.api.domain.SubCategory coreToDomain(SubCategory subCategoryEntity) {
		if (subCategoryEntity != null) {
			List<String> parent = subCategoryEntity.getParentIds();
			com.cosmos.api.domain.SubCategory subCategoryDomain = new com.cosmos.api.domain.SubCategory();
			subCategoryDomain.setId(subCategoryEntity.getId());
			subCategoryDomain.setName(subCategoryEntity.getName());
			subCategoryDomain.setType(subCategoryEntity.getType());
			subCategoryDomain.setRequired(subCategoryEntity.isRequired());
			subCategoryDomain.setMinLength(subCategoryEntity.getMinLength());
			subCategoryDomain.setMaxLength(subCategoryEntity.getMaxLength());
			subCategoryDomain.setDescription(subCategoryEntity.getDescription());
			subCategoryDomain.setParent(parent);
			if(subCategoryEntity.getChildrenIds() != null){
				subCategoryDomain.setChildrenIds(subCategoryEntity.getChildrenIds());
			}			
			subCategoryDomain.setCategory(subCategoryEntity.getCategoryId());
			if (subCategoryEntity.getValues() != null) {
				subCategoryDomain.setValues(subCategoryEntity.getValues());
			}
			subCategoryDomain.setFormat(subCategoryEntity.getFormat());
			subCategoryDomain.setDataElement(subCategoryEntity.getDataElement());
			subCategoryDomain.setCode(subCategoryEntity.getCode());
			subCategoryDomain.setPattern(subCategoryEntity.getPattern());
			subCategoryDomain.setSchemaRef(subCategoryEntity.getSchemaRef());
			if (subCategoryEntity.getHeaders() != null && subCategoryEntity.getHeaders().isEmpty()) {
				List<com.cosmos.api.domain.SubCategory> subCatList = new ArrayList<>();
				for (SubCategory subCatHeader : subCategoryEntity.getHeaders()) {
					subCatList.add(coreToDomain(subCatHeader));
				}
				subCategoryDomain.setHeaders(subCatList);
			}
			return subCategoryDomain;
		}
		return null;
	}

	public static SubCategory domainToCore(com.cosmos.api.domain.SubCategory subCategoryDomain) {
		if (subCategoryDomain != null) {
			SubCategory subcategoryCore = new SubCategory();

			subcategoryCore.setId(subCategoryDomain.getId());
			subcategoryCore.setName(subCategoryDomain.getName());
			subcategoryCore.setType(subCategoryDomain.getType());
			subcategoryCore.setRequired(subCategoryDomain.isRequired());
			subcategoryCore.setMinLength(subCategoryDomain.getMinLength());
			subcategoryCore.setMaxLength(subCategoryDomain.getMaxLength());
			subcategoryCore.setDescription(subCategoryDomain.getDescription());
			subcategoryCore.setParentIds(subCategoryDomain.getParent());
			subcategoryCore.setChildrenIds(subCategoryDomain.getChildrenIds());
			subcategoryCore.setParentIdUpdated(subCategoryDomain.isParentIdUpdated());
			subcategoryCore.setCategoryId(subCategoryDomain.getCategory());
			subcategoryCore.setValues(subCategoryDomain.getValues());
			subcategoryCore.setFormat(subCategoryDomain.getFormat());
			subcategoryCore.setDataElement(subCategoryDomain.getDataElement());
			return subcategoryCore;
		}
		return null;
	}

}
