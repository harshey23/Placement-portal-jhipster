package com.icl.repository;

import com.icl.domain.Batch;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Batch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BatchRepository extends MongoRepository<Batch, String> {

}
