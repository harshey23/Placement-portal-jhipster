package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Offer;
import com.icl.repository.OfferRepository;
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


@RestController
@RequestMapping("/api")
public class OfferResource {

    private final Logger log = LoggerFactory.getLogger(OfferResource.class);

    private static final String ENTITY_NAME = "offer";

    private final OfferRepository offerRepository;

    public OfferResource(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }


    /**
     * POST  /offers : Create a new job(offer).
     *
     * @param offer the company to create
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
        return ResponseEntity.created(new URI("/api/offers/" + result.getTitle()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getTitle().toString()))
            .body(result);
    }


    @PutMapping("/offers")
    @Timed
    public ResponseEntity<Offer> updateOffer(@RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to update Offer : {}", offer);
        if (offer.getId() == null) {
            return createOffer(offer);
        }
        Offer result = offerRepository.save(offer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offer.getTitle().toString()))
            .body(result);
    }


    @GetMapping("/offers")
    @Timed
    public ResponseEntity<List<Offer>> getAllOffers(Pageable pageable) {
        log.debug("REST request to get a page of Offers");
        Page<Offer> page = offerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/offers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Offer> getOffer(@PathVariable String id) {
        log.debug("REST request to get Offer : {}", id);
        Offer offer = offerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    @DeleteMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteOffer(@PathVariable String id) {
        log.debug("REST request to delete Offer : {}", id);
        offerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
