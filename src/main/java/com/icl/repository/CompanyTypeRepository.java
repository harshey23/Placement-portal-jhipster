package com.icl.repository;

import com.icl.domain.CompanyType;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the CompanyType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyTypeRepository extends MongoRepository<CompanyType, String> {

}
