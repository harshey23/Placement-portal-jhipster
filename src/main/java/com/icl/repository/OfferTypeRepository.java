package com.icl.repository;

import com.icl.domain.OfferType;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferTypeRepository extends MongoRepository<OfferType, String> {

}
