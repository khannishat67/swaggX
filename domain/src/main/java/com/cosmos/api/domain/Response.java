package com.cosmos.api.domain;

import java.io.Serializable;

public class Response implements Serializable {

	private static final long serialVersionUID = 6147297579789130905L;

	private int statusCode;
	private String message;

	public Response(int statusCode, String message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
