package com.cosmos.api.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.cosmos.api.core.SubCategory;

public interface SubCategoryRepository extends MongoRepository<SubCategory, String> {

	@Query("{'name': {$regex : ?0,$options: 'i' }}")
	List<SubCategory> findByQueryAllIgnoreCase(String name);
	List<SubCategory> findByParentIdsIn(List<String> parentIds);
}
