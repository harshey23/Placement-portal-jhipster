package com.icl.repository;

import com.icl.domain.RoundType;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the RoundType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoundTypeRepository extends MongoRepository<RoundType, String> {

}
