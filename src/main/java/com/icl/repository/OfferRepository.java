package com.icl.repository;

import com.icl.domain.Batch;
import com.icl.domain.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends MongoRepository<Offer, String> {

    Page<Offer> findAllByCriteria_Batch(Pageable pageable, String batch);

    Page<Offer> findAllByOfferType_OfferType(Pageable pageable, String offerType);

}
