package com.cosmos.api.swaggerstudio.controller.exception;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;

public class ErrorMessage {

	private static final Logger logger = LoggerFactory.getLogger(ErrorMessage.class);

	private int status;
	private int code;
	private String message;
	private String developerMessage;

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDeveloperMessage() {
		return developerMessage;
	}

	public void setDeveloperMessage(String developerMessage) {
		this.developerMessage = developerMessage;
	}

	public ErrorMessage(AppException ex) {
		try {
			BeanUtils.copyProperties(this, ex);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

	public ErrorMessage(NotFoundException ex) {
		this.status = Response.Status.NOT_FOUND.getStatusCode();
		this.message = ex.getMessage();
	}

	public ErrorMessage() {

	}

}
