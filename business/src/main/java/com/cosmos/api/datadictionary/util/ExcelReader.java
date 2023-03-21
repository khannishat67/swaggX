package com.cosmos.api.datadictionary.util;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.cosmos.api.datadictionary.model.ExcelDataStructure;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

public class ExcelReader {
	
	
	public static JsonArray readExcelsheet(String SAMPLE_XLSX_FILE_PATH, String sheetName,
			Map<String, ExcelDataStructure> columnMapping, int rowStartCountr, int rowEndNumber) throws IOException {
		Workbook workbook = WorkbookFactory.create(new File(SAMPLE_XLSX_FILE_PATH));		
		Sheet sheet = workbook.getSheet(sheetName);

		if(sheet == null){
			return null;
		}
		
		// Create a DataFormatter to format and get each cell's value as String
		DataFormatter dataFormatter = new DataFormatter();
		JsonArray excelJsonArray = new JsonArray();
		if (rowEndNumber == 0) {
			rowEndNumber = sheet.getPhysicalNumberOfRows() + 2;
		}

		for (int rownum = rowStartCountr; rownum < rowEndNumber; rownum++) {
			JsonObject rowJsonObject = new JsonObject();
			Row row = sheet.getRow(rownum);

			if (row != null) {
				for (Cell cell : row) {
					int coulumnIndex = cell.getColumnIndex();
					String cellValue = dataFormatter.formatCellValue(cell).trim().replaceAll("\n", "/")/*.replaceAll("\r",
							"/");*/;

					for (Entry<String, ExcelDataStructure> entry : columnMapping.entrySet()) {

						if (coulumnIndex == entry.getValue().getCount()) {

							if (cellValue != null && cellValue.contains("\"")) {
								cellValue = cellValue.replaceAll("\"", "");
							}

							/*if (cellValue != null) {
								List<String> parents = Arrays.stream(cellValue.trim().split("&&")).map(String::trim)
										.collect(Collectors.toList());
								cellValue = parents.toString().substring(1, parents.toString().length() - 1);
							}*/
							switch (entry.getValue().getType()) {
							case STRING: {
								rowJsonObject.addProperty(entry.getKey(), cellValue);
								break;
							}
							case ARRAY: {
								JsonArray cellData = new JsonArray();
								String splitChar = ",";
								if (cellValue.contains("*")) {
									splitChar = "*";
								}
								String[] arr = cellValue.split(splitChar);
								for (String str : arr) {
									if (str != null && !str.isEmpty()) {
										str = str.replaceAll("/", "");
										cellData.add(str.trim());
									}
								}
								rowJsonObject.add(entry.getKey(), cellData);
								break;
							}
							case BOOL: {
								JsonElement cellPrData = new JsonPrimitive(cellValue);
								rowJsonObject.add(entry.getKey(), cellPrData);
								break;
							}
							case NUMBER: {
								JsonElement cellPrData = new JsonPrimitive(cellValue);
								rowJsonObject.add(entry.getKey(), cellPrData);
								break;
							}
							default: {
								break;
							}
							}
						}
					}
				}
			}
			excelJsonArray.add(rowJsonObject);
		}

		workbook.close();
		return excelJsonArray;
	}
}