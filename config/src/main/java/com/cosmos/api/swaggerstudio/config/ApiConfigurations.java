package com.cosmos.api.swaggerstudio.config;

import org.apache.commons.configuration2.CombinedConfiguration;
import org.apache.commons.configuration2.FileBasedConfiguration;
import org.apache.commons.configuration2.PropertiesConfiguration;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

import com.cosmos.api.domain.AppConstants;

@Configuration
@ComponentScan(basePackages = "com.cosmos.api.swaggerstudio")
@EnableCaching
public class ApiConfigurations {
	private static final Logger logger = LoggerFactory.getLogger(ApiConfigurations.class);

	@Bean
	public CombinedConfiguration configurations(Environment environment) {
		CombinedConfiguration cc = new CombinedConfiguration();
		try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext()) {
			ConfigurableEnvironment env = context.getEnvironment();

			String envName = (String) env.getSystemProperties().get(AppConstants.ENVIRONMENT_NAME);
			String password = (String) env.getSystemProperties().get(AppConstants.DB_SECRET);
			String username = (String) env.getSystemProperties().get(AppConstants.DB_USERNAME);

			String prepertiesFileName = "app.properties";
			if (envName == null) {
				envName = "local";
			}
			String propertiesFile = StringUtils.join(envName.toUpperCase() + "/", prepertiesFileName);
			logger.info("-----propertiesFile is -----", propertiesFile);
			Parameters params = new Parameters();
			FileBasedConfigurationBuilder<FileBasedConfiguration> builder = new FileBasedConfigurationBuilder<FileBasedConfiguration>(
					PropertiesConfiguration.class).configure(
							params.fileBased().setURL(getClass().getClassLoader().getResource(propertiesFile)));
			builder.getConfiguration().addProperty(AppConstants.DB_SECRET, password);
			builder.getConfiguration().addProperty(AppConstants.DB_USERNAME, username);
			cc.addConfiguration(builder.getConfiguration());
		} catch (ConfigurationException ex) {
			logger.error("ApiConfiguration configurations failed to load properties... ()", ex);
		}
		logger.info("Environment Configurations initialized successfully");
		return cc;

	}

	@Primary
	@Bean
	public CacheManager cacheManager() {
		return new EhCacheCacheManager(ehCacheManager().getObject());
	}

	@Bean(destroyMethod = "destroy")
	public EhCacheManagerFactoryBean ehCacheManager() {
		EhCacheManagerFactoryBean ehConfig = new EhCacheManagerFactoryBean();
		ehConfig.setConfigLocation(new ClassPathResource("ss-ehcache.xml"));
		return ehConfig;
	}
}