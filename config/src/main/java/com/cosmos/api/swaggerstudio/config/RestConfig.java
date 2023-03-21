package com.cosmos.api.swaggerstudio.config;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.glassfish.jersey.media.multipart.MultiPartFeature;

import com.cosmos.api.swaggerstudio.controller.CategoryController;
import com.cosmos.api.swaggerstudio.controller.SubCategoryController;
import com.cosmos.api.swaggerstudio.util.AppExceptionMapper;
import com.cosmos.api.swaggerstudio.util.GsonProvider;

@ApplicationPath("api")
public class RestConfig extends Application {
	@Override
	public Set<Class<?>> getClasses() {
		return new HashSet<>(Arrays.asList(CategoryController.class, SubCategoryController.class, GsonProvider.class,
				AppExceptionMapper.class, MultiPartFeature.class, CORSFilter.class));
	}
}