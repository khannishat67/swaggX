package com.cosmos.api.datadictionary.util;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;

import com.cosmos.api.domain.Category;
import com.cosmos.api.domain.SubCategory;

public class SubCategoryUtil {

	public static List<SubCategory> generateMiddleLayerSubCategoryList(List<SubCategory> subCategoryList) {
		Set<SubCategory> parentCategories = new HashSet<SubCategory>();
		for (SubCategory subCategory : subCategoryList) {
			try {
				if (subCategory.getParent() != null && !subCategory.getParent().isEmpty()
						&& (subCategory.getType() != null && !subCategory.getType().equalsIgnoreCase("object"))
						&& !subCategory.getName().isEmpty()) {
					SubCategory newSubCategory = new SubCategory();
					newSubCategory.setName(subCategory.getParent().get(0));
					newSubCategory.setCategory(subCategory.getCategory());
					newSubCategory.setType("object");
					parentCategories.add(newSubCategory);
				}
			} catch (Exception e) {
				System.out.println("subCategory is " + subCategory);
				e.printStackTrace();
			}
		}
		// remove duplicates
		Set<SubCategory> uniqueSet = new LinkedHashSet<>();
		uniqueSet.addAll(subCategoryList);
		uniqueSet.addAll(parentCategories);
		subCategoryList.clear();
		subCategoryList.addAll(uniqueSet);
		return subCategoryList;
	}

	public static List<SubCategory> populateSubCategoryParentName(List<SubCategory> subCategoryList,
			List<SubCategory> knownList, Category parentName) {
		for (SubCategory subCategory : subCategoryList) {
			for (SubCategory knownSubCat : knownList) {
				if (subCategory.getName().equals(knownSubCat.getName())) {
					subCategory.getParent().add(parentName.getName());
				}
			}
		}
		return subCategoryList;
	}

	/**
	 * Update the childIds in the data structure. For example CityName is a
	 * subcategory whose parent is City. Hence the City entry is updated to have
	 * the childid as cityName
	 * 
	 * @param subCategoryList
	 * @return
	 */
	public static List<SubCategory> populateSubCategoryParentChild(List<SubCategory> subCategoryList) {
		for (SubCategory subCategory : subCategoryList) {
			try {
				if (subCategory.getParent() != null && !subCategory.getParent().isEmpty()
				// && subCategory.getParent().get(0) != null &&
				// subCategory.getParent().get(0).isEmpty()
				) {
					String parentName = subCategory.getParent().get(0);
					if (parentName != null) {
						SubCategory parentCategory = findByProperty(subCategoryList,
								(subcat) -> subcat.getDataElement().equals(parentName));
						if (parentCategory != null) {
							// for root elements the parentname and its own name is same,hence the parent should be the category
							if (parentCategory.getName().equals(subCategory.getName())) {
								subCategory.getParent().clear();
								subCategory.getParent().add(subCategory.getCategory());
							} else {
								parentCategory.adddTochildrenIds(subCategory.getName());
							}
						}
					} else {
						subCategory.getParent().add(subCategory.getCategory());
					}
				}
				// System.out.println("---- subCategory " + subCategory);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return subCategoryList;
	}


	/**
	 * Find by any attributes of the object
	 * 
	 * @param col
	 * @param filter
	 * @return
	 */
	public static <T> T findByProperty(Collection<T> col, Predicate<T> filter) {
		return col.stream().filter(filter).findFirst().orElse(null);
	}

	public static List<String> categoryParentList = Arrays.asList("HEADERS", "PARAMETERS","");
}
