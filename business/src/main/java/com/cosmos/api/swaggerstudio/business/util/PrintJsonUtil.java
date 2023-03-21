package com.cosmos.api.swaggerstudio.business.util;

import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public final class PrintJsonUtil {

	private PrintJsonUtil() {

		// added empty constructor
	}


	public static String getJsonFromObject(Object jsonObj) {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.registerTypeAdapter(String.class, new EscapeStringSerializer());
		Gson gson = gsonBuilder.disableHtmlEscaping().create();
		return gson.toJson(jsonObj);
	}

	public static Object getObjectFromJsonString(String jsonString, Class className) {
		Gson gson = new Gson();
		return gson.fromJson(jsonString, className);
	}

	public static Object getObjectFromJsonObject(JsonArray jsonArr, Class className) {
		return new Gson().fromJson(jsonArr, className);
	}

	private static class EscapeStringSerializer implements JsonSerializer<String> {
		@Override
		public JsonElement serialize(String s, Type type, JsonSerializationContext jsonSerializationContext) {
			return new JsonPrimitive(escapeJS(s));
		}

		public static String escapeJS(String string) {

			String[][] escapes = new String[][] { { "\\", "\\\\" }, { "\"", "\\\"" },/* { "n", "\\n" }, { "r", "\\r" },*/
					{ "\b", "\\b" }, { "\f", "\\f" }, { "\t", "\\t" } };

			for (String[] esc : escapes)

			{
				string = string.replace(esc[0], esc[1]);
			}
			return string;
		}

	}

	public static void exportJsonToFile(String sampleJsonPathFile, String jsonData) throws IOException {
		try (FileWriter writer = new FileWriter(sampleJsonPathFile, false)) {
			writer.write(jsonData);
		}

	}

	public static String readJsonFile(String filePath) throws IOException {
		StringBuilder contentBuilder = new StringBuilder();
		try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
			stream.forEach(s -> contentBuilder.append(s).append("\n"));
			return contentBuilder.toString();
		}
	}
}