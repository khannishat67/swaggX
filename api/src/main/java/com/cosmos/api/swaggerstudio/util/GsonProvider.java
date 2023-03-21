package com.cosmos.api.swaggerstudio.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Provider
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GsonProvider<T> implements MessageBodyReader<T>, MessageBodyWriter<T> {

	private static final String PRETTY_PRINT = "pretty-print";
	private final Gson gson;
	private final Gson prettyGson;
	@Context
	private UriInfo ui;

	public GsonProvider() {
		GsonBuilder builder = new GsonBuilder()
				// .serializeNulls ()
				.enableComplexMapKeySerialization();
		this.gson = builder.create();
		this.prettyGson = builder.setPrettyPrinting().create();
	}

	@Override
	public boolean isWriteable(Class<?> arg0, Type arg1, Annotation[] arg2, MediaType arg3) {
		return true;
	}

	@Override
	public void writeTo(T t, Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType,
			MultivaluedMap<String, Object> httpHeaders, OutputStream entityStream) throws IOException {
		PrintWriter printWriter = new PrintWriter(entityStream);
		try {
			String json;
			if (ui != null && ui.getQueryParameters() != null && ui.getQueryParameters().containsKey(PRETTY_PRINT)) {
				json = prettyGson.toJson(t);
			} else {
				json = gson.toJson(t);
			}
			printWriter.write(json);
			printWriter.flush();
		} finally {
			printWriter.close();
		}
	}

	@Override
	public boolean isReadable(Class<?> arg0, Type arg1, Annotation[] arg2, MediaType arg3) {
		return true;
	}

	@Override
	public T readFrom(Class<T> type, Type arg1, Annotation[] arg2, MediaType mediaType,
			MultivaluedMap<String, String> arg4, InputStream entityStream) throws IOException, WebApplicationException {
		InputStreamReader reader = new InputStreamReader(entityStream, StandardCharsets.UTF_8);
		try {
			return gson.fromJson(reader, type);
		} finally {
			reader.close();
		}

	}
}