package com.cosmos.api.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Component;

import com.cosmos.api.core.Category;

@Component
public interface CategoryRepository extends MongoRepository<Category, String>, QuerydslPredicateExecutor<Category> {
	List<Category> findByName(String name);
}
