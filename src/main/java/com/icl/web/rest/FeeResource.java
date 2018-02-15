package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Fee;

import com.icl.repository.FeeRepository;
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
 * REST controller for managing Fee.
 */
@RestController
@RequestMapping("/api")
public class FeeResource {

    private final Logger log = LoggerFactory.getLogger(FeeResource.class);

    private static final String ENTITY_NAME = "fee";

    private final FeeRepository feeRepository;

    public FeeResource(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    /**
     * POST  /fees : Create a new fee.
     *
     * @param fee the fee to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fee, or with status 400 (Bad Request) if the fee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fees")
    @Timed
    public ResponseEntity<Fee> createFee(@RequestBody Fee fee) throws URISyntaxException {
        log.debug("REST request to save Fee : {}", fee);
        if (fee.getId() != null) {
            throw new BadRequestAlertException("A new fee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fee result = feeRepository.save(fee);
        return ResponseEntity.created(new URI("/api/fees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fees : Updates an existing fee.
     *
     * @param fee the fee to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fee,
     * or with status 400 (Bad Request) if the fee is not valid,
     * or with status 500 (Internal Server Error) if the fee couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fees")
    @Timed
    public ResponseEntity<Fee> updateFee(@RequestBody Fee fee) throws URISyntaxException {
        log.debug("REST request to update Fee : {}", fee);
        if (fee.getId() == null) {
            return createFee(fee);
        }
        Fee result = feeRepository.save(fee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fee.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fees : get all the fees.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fees in body
     */
    @GetMapping("/fees")
    @Timed
    public ResponseEntity<List<Fee>> getAllFees(Pageable pageable) {
        log.debug("REST request to get a page of Fees");
        Page<Fee> page = feeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fees");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fees/:id : get the "id" fee.
     *
     * @param id the id of the fee to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fee, or with status 404 (Not Found)
     */
    @GetMapping("/fees/{id}")
    @Timed
    public ResponseEntity<Fee> getFee(@PathVariable String id) {
        log.debug("REST request to get Fee : {}", id);
        Fee fee = feeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fee));
    }

    /**
     * DELETE  /fees/:id : delete the "id" fee.
     *
     * @param id the id of the fee to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fees/{id}")
    @Timed
    public ResponseEntity<Void> deleteFee(@PathVariable String id) {
        log.debug("REST request to delete Fee : {}", id);
        feeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
