package com.cosmos.api.swaggerstudio.business.util;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.codec.language.DoubleMetaphone;

import com.cosmos.api.domain.SubCategory;

public class StringDoubleMetaphoneUtil {

	private StringDoubleMetaphoneUtil() {
		// added empty
	}

	public static Map<String, Set<SubCategory>> generateMetaphoneMap(List<SubCategory> subCategoryList) {
		Map<String, Set<SubCategory>> metaphoneMap = new HashMap<>();
		DoubleMetaphone metaphone = new DoubleMetaphone();
		for (SubCategory subCategory : subCategoryList) {
			String name = subCategory.getName();
			if (name != null) {
				String code = metaphone.encode(name);
				if (metaphoneMap.get(code) == null) {
					Set<SubCategory> subCatSet = new HashSet<>();
					subCatSet.add(subCategory);
					metaphoneMap.put(code, subCatSet);
				} else {
					Set<SubCategory> subCatSet = metaphoneMap.get(code);
					subCatSet.add(subCategory);
				}
			}
		}
		return metaphoneMap;
	}

}
