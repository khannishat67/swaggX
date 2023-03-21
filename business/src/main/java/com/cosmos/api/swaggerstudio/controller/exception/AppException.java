package com.cosmos.api.swaggerstudio.controller.exception;

public class AppException extends Exception {

	private static final long serialVersionUID = 1960129801199176198L;

	private final Integer status;
	private final int code;
	private final String developerMessage;

	public AppException(Integer status, int code, String message, String developerMessage) {
		super(message);
		this.status = status;
		this.code = code;
		this.developerMessage = developerMessage;
	}

	public Integer getStatus() {
		return status;
	}

	public int getCode() {
		return code;
	}

	public String getDeveloperMessage() {
		return developerMessage;
	}

}
