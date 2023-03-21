package com.cosmos.api.swaggerstudio.config;

import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.WebJarsResourceResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvc
@PropertySource(value = "classpath:/config.properties")
public class ViewConfiguration implements WebMvcConfigurer {

	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setSuffix(".html");
		return viewResolver;
	}

	public void addResourceHandlers(final ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/static/css/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/ui/static/css/")
				.setCacheControl(CacheControl.maxAge(30L, TimeUnit.DAYS).cachePublic()).resourceChain(true)
				.addResolver(new WebJarsResourceResolver());

		registry.addResourceHandler("/static/js/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/ui/static/js/")
				.setCacheControl(CacheControl.maxAge(30L, TimeUnit.DAYS).cachePublic()).resourceChain(true)
				.addResolver(new WebJarsResourceResolver());

		registry.addResourceHandler("/static/media/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/ui/static/media/")
				.setCacheControl(CacheControl.maxAge(30L, TimeUnit.DAYS).cachePublic()).resourceChain(true)
				.addResolver(new WebJarsResourceResolver());

		registry.addResourceHandler("/sample/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/ui/sample/")
				.setCacheControl(CacheControl.maxAge(30L, TimeUnit.DAYS).cachePublic()).resourceChain(true)
				.addResolver(new WebJarsResourceResolver());

		registry.addResourceHandler("/**").addResourceLocations("classpath:/META-INF/resources/webjars/ui/")
				.setCacheControl(CacheControl.maxAge(30L, TimeUnit.DAYS).cachePublic()).resourceChain(true)
				.addResolver(new WebJarsResourceResolver());

	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

}