package com.cosmos.api.datadictionary.model;

public class ExcelDataStructure {

	private String name;
	private int count;
	private Type type;

	public ExcelDataStructure(String name, int count, Type type) {
		super();
		this.name = name;
		this.count = count;
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

}
