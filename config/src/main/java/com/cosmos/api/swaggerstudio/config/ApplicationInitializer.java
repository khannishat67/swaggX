package com.cosmos.api.swaggerstudio.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApplicationInitializer implements WebApplicationInitializer {
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
		context.register(ApiConfigurations.class);
		context.register(MongoConfig.class);
		context.register(RestConfig.class);
		context.register(ViewConfiguration.class);
		context.setConfigLocation("com.cosmos.api.swaggerstudio.config");
		servletContext.addListener(new ContextLoaderListener(context));
		servletContext.setInitParameter("contextConfigLocation", "com.cosmos.api.swaggerstudio");
		servletContext.setInitParameter("jersey.config.server.provider.packages",
				"com.cosmos.api.swaggerstudio.util,com.cosmos.api.swaggerstudio.controller,com.cosmos.api.swaggerstudio.business");
		servletContext.setInitParameter("jersey.config.server.provider.classnames",
				"org.glassfish.jersey.media.multipart.MultiPartFeature");
		servletContext.setInitParameter("com.sun.jersey.spi.container.ContainerResponseFilters",
				"com.cosmos.api.swaggerstudio.config.CORSFilter");
		ServletRegistration.Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(context));
		servlet.setLoadOnStartup(1);
		servlet.addMapping("/");
	}
}
