package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Batch;
import com.icl.domain.Criteria;
import com.icl.domain.Offer;

import com.icl.domain.OfferType;
import com.icl.repository.OfferRepository;
import com.icl.repository.OfferTypeRepository;
import com.icl.service.OfferService;
import com.icl.service.dto.UserDTO;
import com.icl.web.rest.errors.BadRequestAlertException;
import com.icl.web.rest.util.HeaderUtil;
import com.icl.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Offer.
 */
@RestController
@RequestMapping("/api")
public class OfferResource {

    private final Logger log = LoggerFactory.getLogger(OfferResource.class);

    private static final String ENTITY_NAME = "offer";

    private final OfferService offerService;

    private final OfferRepository offerRepository;

    private final OfferTypeRepository offerTypeRepository;

    public OfferResource(OfferRepository offerRepository, OfferTypeRepository offerTypeRepository, OfferService offerService) {
        this.offerRepository = offerRepository;
        this.offerTypeRepository = offerTypeRepository;
        this.offerService = offerService;
    }

    /**
     * POST  /offers : Create a new offer.
     *
     * @param offer the offer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offer, or with status 400 (Bad Request) if the offer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offers")
    @Timed
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to save Offer : {}", offer);
        if (offer.getId() != null) {
            throw new BadRequestAlertException("A new offer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Offer result = offerRepository.save(offer);
        return ResponseEntity.created(new URI("/api/offers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /offers : Updates an existing offer.
     *
     * @param offer the offer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offer,
     * or with status 400 (Bad Request) if the offer is not valid,
     * or with status 500 (Internal Server Error) if the offer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offers")
    @Timed
    public ResponseEntity<Offer> updateOffer(@RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to update Offer : {}", offer);
        if (offer.getId() == null) {
            return createOffer(offer);
        }
        Offer result = offerRepository.save(offer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /offers : get all the offers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers")
    @Timed
    public ResponseEntity<List<Offer>> getAllOffers(Pageable pageable) {
        log.debug("REST request to get a page of Offers");
        Page<Offer> page = offerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/offers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /offers/:id : get the "id" offer.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Offer> getOffer(@PathVariable String id) {
        log.debug("REST request to get Offer : {}", id);
        Offer offer = offerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    /**
     * DELETE  /offers/:id : delete the "id" offer.
     *
     * @param id the id of the offer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteOffer(@PathVariable String id) {
        log.debug("REST request to delete Offer : {}", id);
        offerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }


    /**
     * GET  /offers/batch/{batch} : get all the offers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers/batch/{batch}")
    @Timed
    public ResponseEntity<List<Offer>> getAllOffersByBatch(Pageable pageable, @RequestBody Batch batch) {
        final Page<Offer> page = offerService.getAllOffersByBatch(pageable, batch);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/companies/batch");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /offers/batch/{batch} : get all the offers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers/types/{types}")
    @Timed
    public ResponseEntity<List<Offer>> getAllOfferByTypes(Pageable pageable, @RequestBody OfferType offerType) {
        log.debug("REST request to get a page of Offers");
        Page<Offer> page = offerService.getAllOffersByOfferType(pageable, offerType);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/offer/type");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /offers/batch/{batch} : get all the offers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers/types/")
    @Timed
    public ResponseEntity<List<OfferType>> getAllOfferTypes(Pageable pageable) {
        log.debug("REST request to get a page of Offers");
        Page<OfferType> page = offerTypeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/offer/type");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /offers/batch/{batch} : get all the offers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
//    @PostMapping("/general")
//    @Timed
//    public ResponseEntity<List<UserDTO>> getGeneralEligibility(Pageable pageable, @RequestBody Criteria criteria) {
//        Page<UserDTO> page = offerService.getGeneralEligibility(pageable, criteria);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/general/");
//        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
//    }

}
