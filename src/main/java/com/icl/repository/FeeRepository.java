package com.icl.repository;

import com.icl.domain.Fee;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Fee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeeRepository extends MongoRepository<Fee, String> {

}
