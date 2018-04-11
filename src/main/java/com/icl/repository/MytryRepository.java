package com.icl.repository;

import com.icl.domain.Mytry;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Mytry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MytryRepository extends MongoRepository<Mytry, String> {

}
