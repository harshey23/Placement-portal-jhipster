package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.RoundType;

import com.icl.repository.RoundTypeRepository;
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
 * REST controller for managing RoundType.
 */
@RestController
@RequestMapping("/api")
public class RoundTypeResource {

    private final Logger log = LoggerFactory.getLogger(RoundTypeResource.class);

    private static final String ENTITY_NAME = "roundType";

    private final RoundTypeRepository roundTypeRepository;

    public RoundTypeResource(RoundTypeRepository roundTypeRepository) {
        this.roundTypeRepository = roundTypeRepository;
    }

    /**
     * POST  /round-types : Create a new roundType.
     *
     * @param roundType the roundType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new roundType, or with status 400 (Bad Request) if the roundType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/round-types")
    @Timed
    public ResponseEntity<RoundType> createRoundType(@RequestBody RoundType roundType) throws URISyntaxException {
        log.debug("REST request to save RoundType : {}", roundType);
        if (roundType.getId() != null) {
            throw new BadRequestAlertException("A new roundType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoundType result = roundTypeRepository.save(roundType);
        return ResponseEntity.created(new URI("/api/round-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /round-types : Updates an existing roundType.
     *
     * @param roundType the roundType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated roundType,
     * or with status 400 (Bad Request) if the roundType is not valid,
     * or with status 500 (Internal Server Error) if the roundType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/round-types")
    @Timed
    public ResponseEntity<RoundType> updateRoundType(@RequestBody RoundType roundType) throws URISyntaxException {
        log.debug("REST request to update RoundType : {}", roundType);
        if (roundType.getId() == null) {
            return createRoundType(roundType);
        }
        RoundType result = roundTypeRepository.save(roundType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, roundType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /round-types : get all the roundTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of roundTypes in body
     */
    @GetMapping("/round-types")
    @Timed
    public ResponseEntity<List<RoundType>> getAllRoundTypes(Pageable pageable) {
        log.debug("REST request to get a page of RoundTypes");
        Page<RoundType> page = roundTypeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/round-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /round-types/:id : get the "id" roundType.
     *
     * @param id the id of the roundType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the roundType, or with status 404 (Not Found)
     */
    @GetMapping("/round-types/{id}")
    @Timed
    public ResponseEntity<RoundType> getRoundType(@PathVariable String id) {
        log.debug("REST request to get RoundType : {}", id);
        RoundType roundType = roundTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(roundType));
    }

    /**
     * DELETE  /round-types/:id : delete the "id" roundType.
     *
     * @param id the id of the roundType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/round-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoundType(@PathVariable String id) {
        log.debug("REST request to delete RoundType : {}", id);
        roundTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
