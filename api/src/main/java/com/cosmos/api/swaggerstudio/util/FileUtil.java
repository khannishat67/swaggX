package com.cosmos.api.swaggerstudio.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;

public final class FileUtil {

	private FileUtil() {

	}

	public static OutputStream getFile(String fileName) throws FileNotFoundException {
		return new FileOutputStream(new File(fileName), false);
	}
}
