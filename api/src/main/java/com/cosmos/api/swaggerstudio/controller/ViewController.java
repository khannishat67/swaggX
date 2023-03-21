package com.cosmos.api.swaggerstudio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ViewController {

	@GetMapping
	public static String index(Model model) {
		return "index";
	}
	
	@GetMapping(path = "/swagger-builder")
	public static String swaggerBuilder(Model model) {
		return "index";
	}
	
	@GetMapping(path = "/swagger-review")
	public static String swaggerReview(Model model) {
		return "index";
	}
	
	@GetMapping(path = "/swagger-editor")
	public static String swaggerEditor(Model model) {
		return "index";
	}
	
	@GetMapping(path = "/data-dictionary-console")
	public static String ddConsole(Model model) {
		return "index";
	}
}
