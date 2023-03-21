package com.cosmos.api.swaggerstudio.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.apache.commons.configuration2.CombinedConfiguration;
import org.springframework.stereotype.Component;

import com.cosmos.api.core.Category;
import com.cosmos.api.dao.CategoryRepository;
import com.cosmos.api.domain.CategoryResponse;
import com.cosmos.api.swaggerstudio.business.util.CategoryConverter;
import com.cosmos.api.swaggerstudio.controller.exception.AppException;

@Component
public class CategoryService {

	@Inject
	private CategoryRepository categoryRepository;
	

	public CategoryResponse getAllCategory() {

		List<com.cosmos.api.domain.Category> allCategoryDomainList = new ArrayList<>();
		List<Category> allCategoryEntity = categoryRepository.findAll();
		for (Category category : allCategoryEntity) {
			allCategoryDomainList.add(CategoryConverter.coreToDomain(category));
		}
		//allCategoryDomainList.sort((cat1, cat2) -> cat1.getName().compareTo(cat2.getName()));
		CategoryResponse response = new CategoryResponse();
		response.setCategories(allCategoryDomainList);
		return response;
	}

	public CategoryResponse getCategoryByName(String name) {
		List<Category> allCategoryEntity = categoryRepository.findByName(name);
		List<com.cosmos.api.domain.Category> allCategoryDomainList = new ArrayList<>();
		for (Category category : allCategoryEntity) {
			allCategoryDomainList.add(CategoryConverter.coreToDomain(category));
		}
		CategoryResponse response = new CategoryResponse();
		response.setCategories(allCategoryDomainList);
		return response;
	}

	public CategoryResponse getSpecificCategory(String id) throws AppException {
		Optional<Category> categoryOptional = categoryRepository.findById(id);
		Category categoryEntity = categoryOptional
				.orElseThrow(() -> new AppException(Response.Status.NOT_FOUND.getStatusCode(), 404,
						"The category you requested with id " + id + " was not found in the database",
						"Verify the existence of the category with the id " + id + " in the database"));
		CategoryResponse response = new CategoryResponse();
		List<com.cosmos.api.domain.Category> allCategoryDomainList = new ArrayList<>();
		allCategoryDomainList.add(CategoryConverter.coreToDomain(categoryEntity));
		response.setCategories(allCategoryDomainList);
		return response;
	}
}
