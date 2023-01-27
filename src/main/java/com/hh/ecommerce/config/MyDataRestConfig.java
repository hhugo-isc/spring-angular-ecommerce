package com.hh.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.hh.ecommerce.entity.Country;
import com.hh.ecommerce.entity.Product;
import com.hh.ecommerce.entity.ProductCategory;
import com.hh.ecommerce.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;

	@Autowired
	public MyDataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] unsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

//		disable HTTP methods for PRODUCTS, ProductCategory, Country and State: 
//		PUT, POST, DELETE
		disableHttpMethods(Product.class, config, unsupportedActions);
		disableHttpMethods(ProductCategory.class, config, unsupportedActions);
		disableHttpMethods(Country.class, config, unsupportedActions);
		disableHttpMethods(State.class, config, unsupportedActions);

//		call an internal helper method
		exposeIds(config);
	}

	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config,
			HttpMethod[] unsupportedActions) {

		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
	}

	private void exposeIds(RepositoryRestConfiguration config) {

//		expose entity ids
//		- get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

//		create an array of the entity types
		List<Class> entityClassess = new ArrayList<>();

//		get the tntity types for the entities
		for (EntityType entityType : entities) {
			entityClassess.add(entityType.getJavaType());
		}

//		expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClassess.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}

}
