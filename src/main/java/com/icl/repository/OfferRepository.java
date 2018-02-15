package com.icl.repository;

import com.icl.domain.Offer;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends MongoRepository<Offer, String> {

}
