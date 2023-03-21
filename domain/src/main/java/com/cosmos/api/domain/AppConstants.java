package com.cosmos.api.domain;

public final class AppConstants {
	private AppConstants() {

		// adding private constructor
	}

	public static final int GENERIC_APP_ERROR_CODE = 500;
	public static final String DB_USERNAME = "db.username";
	public static final String DB_SECRET = "db.password";
	public static final String ENVIRONMENT_NAME = "environment.name";

	public static final String[] EXCEL_TYPES = { ".xlsx" ,"xls" };
	
	public static final String TEMP_PATH="temp.path";
	public static final String CATEGORIES = "categories";
}