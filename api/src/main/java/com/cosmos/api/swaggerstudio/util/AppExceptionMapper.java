package com.cosmos.api.swaggerstudio.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.cosmos.api.swaggerstudio.controller.exception.AppException;
import com.cosmos.api.swaggerstudio.controller.exception.ErrorMessage;

@Provider
public class AppExceptionMapper implements ExceptionMapper<AppException> {

	@Override
	public Response toResponse(AppException ex) {
		return Response.status(ex.getStatus()).entity(new ErrorMessage(ex)).type(MediaType.APPLICATION_JSON).build();
	}

}
