package com.icl.repository;

import com.icl.domain.Round;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Round entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoundRepository extends MongoRepository<Round, String> {

}
