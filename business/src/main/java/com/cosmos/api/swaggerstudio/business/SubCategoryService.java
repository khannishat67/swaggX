package com.cosmos.api.swaggerstudio.business;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.language.DoubleMetaphone;
import org.apache.commons.configuration2.CombinedConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Component;

import com.cosmos.api.core.Category;
import com.cosmos.api.core.SubCategory;
import com.cosmos.api.dao.CategoryRepository;
import com.cosmos.api.dao.SubCategoryRepository;
import com.cosmos.api.domain.SubCategoryResponse;
import com.cosmos.api.swaggerstudio.business.util.PrintJsonUtil;
import com.cosmos.api.swaggerstudio.business.util.StringDoubleMetaphoneUtil;
import com.cosmos.api.swaggerstudio.business.util.SubCategoryConverter;
import com.cosmos.api.swaggerstudio.controller.exception.AppException;

@Component
public class SubCategoryService {
	private static final Logger logger = LoggerFactory.getLogger(SubCategoryService.class);

	@Inject
	private SubCategoryRepository subCategoryRepository;
	
	@Inject
	private CombinedConfiguration config;

	@Inject
	private CategoryRepository categoryRepository;

	@Cacheable(value = "subcategoryAllCache")
	public SubCategoryResponse getAllSubCategory() {

		List<SubCategory> allSubCategoryEntity = subCategoryRepository.findAll();
		List<com.cosmos.api.domain.SubCategory> allSubCategoryDomainList = new ArrayList<>();

		for (SubCategory subCategory : allSubCategoryEntity) {
			allSubCategoryDomainList.add(SubCategoryConverter.coreToDomain(subCategory));
		}
		SubCategoryResponse response = new SubCategoryResponse();
		allSubCategoryDomainList
				.sort((subCategory1, subCategory2) -> subCategory1.getName().compareTo(subCategory2.getName()));
		response.setSubCategories(allSubCategoryDomainList);
		logger.info("Returned {} result from database", allSubCategoryDomainList.size());
		return response;
	}

	@Cacheable(value = "subcategoryFindCache", key = "#name")
	public SubCategoryResponse getSubCategoryByName(String name) {
		logger.info("Searching for " + name);
		List<SubCategory> allsubCategoryEntity = subCategoryRepository.findByQueryAllIgnoreCase(name);
		logger.info("data from database " + allsubCategoryEntity);
		List<com.cosmos.api.domain.SubCategory> allSubCategoryDomainList = new ArrayList<>();
		for (SubCategory category : allsubCategoryEntity) {
			allSubCategoryDomainList.add(SubCategoryConverter.coreToDomain(category));
		}
		allSubCategoryDomainList.sort((subCat1, subCat2) -> subCat1.getName().compareTo(subCat2.getName()));

		SubCategoryResponse response = new SubCategoryResponse();
		// remove duplicate
		if (!allSubCategoryDomainList.isEmpty()) {
			List<com.cosmos.api.domain.SubCategory> newList = allSubCategoryDomainList.stream().distinct()
					.collect(Collectors.toList());
			response.setSubCategories(newList);
			return response;
		}
		response.setSubCategories(allSubCategoryDomainList);
		logger.info("Returned {} result from database with name {}", allSubCategoryDomainList.size(), name);
		return response;
	}

	@Cacheable(value = "subcategoryFindMetaphoneCache", key = "#name")
	public SubCategoryResponse getSubCategoryByNameWithMetaphone(String name) {

		Map<String, Set<com.cosmos.api.domain.SubCategory>> metaphoneMap = getSubCategoryMetaphoneMap();
		DoubleMetaphone metaphone = new DoubleMetaphone();
		String code = metaphone.encode(name);
		SubCategoryResponse response = new SubCategoryResponse();
		List<com.cosmos.api.domain.SubCategory> allSubCategoryDomainList = new ArrayList<>();
		Set<com.cosmos.api.domain.SubCategory> metaphoneCodeSet = metaphoneMap.get(code);
		com.cosmos.api.domain.SubCategory emptySubCat = new com.cosmos.api.domain.SubCategory();
		emptySubCat.setName(name);
		if (metaphoneCodeSet == null) {
			metaphoneCodeSet = new HashSet<>();
		}
		metaphoneCodeSet.add(emptySubCat);
		if (!metaphoneCodeSet.isEmpty()) {
			for (com.cosmos.api.domain.SubCategory subCat : metaphoneCodeSet) {
				List<com.cosmos.api.domain.SubCategory> allSubCategoryEntity = getSubCategoryByName(subCat.getName())
						.getSubCategories();
				allSubCategoryDomainList.addAll(allSubCategoryEntity);
			}
		}
		allSubCategoryDomainList.sort((subl, sub2) -> subl.getName().compareTo(sub2.getName()));
		// remove duplicate
		if (!allSubCategoryDomainList.isEmpty()) {
			List<com.cosmos.api.domain.SubCategory> newList = allSubCategoryDomainList.stream().distinct()
					.collect(Collectors.toList());
			response.setSubCategories(newList);
			return response;
		}
		logger.info("Returned (} result from database with name {)", allSubCategoryDomainList.size(), name);
		response.setSubCategories(allSubCategoryDomainList);
		return response;

	}

	@Cacheable(value = "subcategoryMetaphoneFindMap")
	public Map<String, Set<com.cosmos.api.domain.SubCategory>> getSubCategoryMetaphoneMap() {
		SubCategoryResponse response = getAllSubCategory();
		List<com.cosmos.api.domain.SubCategory> allSubCategoryDomainList = response.getSubCategories();
		return StringDoubleMetaphoneUtil.generateMetaphoneMap(allSubCategoryDomainList);
	}

	public SubCategoryResponse getSubCategoryByParentIds(String parentId) {
		List<String> parentIds = new ArrayList<>();
		parentIds.add(parentId);
		List<SubCategory> allSubCategoryEntity = subCategoryRepository.findByParentIdsIn(parentIds);
		List<com.cosmos.api.domain.SubCategory> allSubCategoryDomainList = new ArrayList<>();
		for (SubCategory category : allSubCategoryEntity) {
			allSubCategoryDomainList.add(SubCategoryConverter.coreToDomain(category));
		}
		//allSubCategoryDomainList.sort((subCat1, subCat2) -> subCat1.getName().compareTo(subCat2.getName()));
		SubCategoryResponse response = new SubCategoryResponse();
		response.setSubCategories(allSubCategoryDomainList);
		logger.info("Returned {} result from database with parentId (}", allSubCategoryDomainList.size(), parentId);
		return response;
	}

	public SubCategoryResponse getSpecificSubCategory(String id) throws AppException {

		Optional<SubCategory> subCategoryOptional = subCategoryRepository.findById(id);
		SubCategory subCategoryEntity = subCategoryOptional
				.orElseThrow(() -> new AppException(Response.Status.NOT_FOUND.getStatusCode(), 404,
						"The category you requested with id " + id + " was not found in the database",
						"Verify the existence of the category with the id " + id + " in the database"));
		SubCategoryResponse response = new SubCategoryResponse();
		List<com.cosmos.api.domain.SubCategory> allSubCategoryDomainList = new ArrayList<>();
		allSubCategoryDomainList.add(SubCategoryConverter.coreToDomain(subCategoryEntity));
		response.setSubCategories(allSubCategoryDomainList);
		logger.info("Returned {) result from database with id {}", allSubCategoryDomainList.size(), id);
		return response;
	}

	@Caching(evict = { @CacheEvict("subcategoryMetaphoneFindMap"), @CacheEvict(value = "subcategoryFindMetaphoneCache"),
			@CacheEvict(value = "subcategoryFindCache"), @CacheEvict("subcategoryAllCache") })
	public SubCategoryResponse addSpecificSubCategory(String jsonContent) throws AppException {

		com.cosmos.api.domain.SubCategory[] subCategoryArr = (com.cosmos.api.domain.SubCategory[]) PrintJsonUtil
				.getObjectFromJsonString(jsonContent, com.cosmos.api.domain.SubCategory[].class);

		// get all the Categories from jsonContent, make sure we do not add
		// duplicate Category
		Set<Category> categoryNameSet = new TreeSet<>(new Comparator<Category>() {

			@Override
			public int compare(Category o1, Category o2) {
				return o1.getName().equals(o2.getName()) ? 0 : 1;
			}

		});
		for (com.cosmos.api.domain.SubCategory subCategory : subCategoryArr) {
			if (subCategory.getCategory() != null) {
				Category category = new Category();
				category.setName(subCategory.getCategory());
				category.setDescription(subCategory.getCategory());
				categoryNameSet.add(category);
			}
		}

		// cleanup the old data
		categoryRepository.deleteAll();
		subCategoryRepository.deleteAll();

		// Add Category into the database
		List<Category> categoryList = categoryRepository.saveAll(categoryNameSet);

		// update the category id into subcategory's parent id (This is useful
		// for subcategory which has parents such as BODY, HEADER etc)
		for (Category category : categoryList) {
			for (com.cosmos.api.domain.SubCategory subCategory : subCategoryArr) {
				String parentName = subCategory.getParent().get(0);
				if (category.getName().equals(parentName)) {
					subCategory.setParentIdUpdated(true);
					subCategory.setCategory(category.getId());
					subCategory.getParent().add(category.getId());
					subCategory.getParent().remove(category.getName());
				}
			}
		}
		List<SubCategory> insertData = new ArrayList<>();
		for (com.cosmos.api.domain.SubCategory subCategory : subCategoryArr) {
			SubCategory subCatDB = SubCategoryConverter.domainToCore(subCategory);
			insertData.add(subCatDB);
		}
		List<SubCategory> result = subCategoryRepository.saveAll(insertData);
		// once the data is saved in the database all the subcategories are
		// updated with id
		// hence updating the parentids and child ids with which has reference
		// to subcategory as parent
		for (SubCategory subCategory : result) {

			List<String> parentNames = subCategory.getParentIds();
			int index = 0;
			if (parentNames != null && !subCategory.isParentIdUpdated()) {
				for (String parentName : parentNames) {
					SubCategory parentCategory = findByProperty(result,
							subcat -> subcat.getDataElement().equals(parentName));
					if (parentCategory != null && parentCategory.getDataElement().equalsIgnoreCase(parentName)) {
						// update parentid of the subcategory
						parentNames.set(index, parentCategory.getId());

						if (parentCategory.getCategoryId() != null) {
							subCategory.setCategoryId(parentCategory.getCategoryId());
						}
						subCategory.setParentIdUpdated(true);
						// also update the children id of the parent category
						if (parentCategory.getChildrenIds() != null) {
							parentCategory.getChildrenIds().add(subCategory.getId());
							parentCategory.getChildrenIds().remove(subCategory.getName());
						} else {
							List<String> childrenIds = new ArrayList<>();
							childrenIds.add(subCategory.getId());
							parentCategory.setChildrenIds(childrenIds);
						}
					}
					index++;
				}
			}
		}
		result = subCategoryRepository.saveAll(insertData);

		// now update the category data with the subcategoryid with childid
		for (Category category : categoryList) {
			category.setChildrenIds(new ArrayList<String>());
			for (SubCategory subCategory : insertData) {
				List<String> parentCategoryIds = subCategory.getParentIds();
				if (parentCategoryIds != null && subCategory.getId() != null) {
					for (String parentId : parentCategoryIds) {
						if (category.getId().equalsIgnoreCase(parentId)) {
							// update the category
							category.addToChildrenIds(subCategory.getId());
						}
					}
				}
			}
		}
		categoryRepository.saveAll(categoryList);
		logger.info("Total subcategories added " + insertData.size());
		return new SubCategoryResponse();
	}

	public static <T> T findByProperty(Collection<T> col, Predicate<T> filter) {
		return col.stream().filter(filter).findFirst().orElse(null);
	}
}
