package com.cosmos.api.swaggerstudio.config;

import javax.inject.Inject;

import org.apache.commons.configuration2.CombinedConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.cosmos.api.domain.AppConstants;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
@EnableMongoRepositories(basePackages = "com.cosmos.api.dao")
public class MongoConfig extends AbstractMongoClientConfiguration {

	@Inject
	private CombinedConfiguration config;
	@Autowired
	Environment env;

	@Override
	protected String getDatabaseName() {
		return config.getString("db.database");
	}

	@Override
	public MongoClient mongoClient() {
		String credentials = config.getString(AppConstants.DB_USERNAME) + ":"
				+ config.getString(AppConstants.DB_SECRET);
		if (config.getString(AppConstants.DB_USERNAME) != null && config.getString(AppConstants.DB_SECRET) != null) {
			return MongoClients
					.create(new ConnectionString("mongodb://" + credentials + "@" + config.getString("db.url")));
		}
		return MongoClients.create(new ConnectionString("mongodb://" + config.getString("db.url")));
	}

	@Bean
	public GridFsTemplate gridFsTemplate() throws Exception {
		return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
	}

	@Bean
	public MongoTransactionManager transactionManager(MongoDbFactory dbFactory) {
		return new MongoTransactionManager(dbFactory);
	}
}