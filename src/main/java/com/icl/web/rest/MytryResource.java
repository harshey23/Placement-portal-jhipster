package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Mytry;

import com.icl.repository.MytryRepository;
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
 * REST controller for managing Mytry.
 */
@RestController
@RequestMapping("/api")
public class MytryResource {

    private final Logger log = LoggerFactory.getLogger(MytryResource.class);

    private static final String ENTITY_NAME = "mytry";

    private final MytryRepository mytryRepository;

    public MytryResource(MytryRepository mytryRepository) {
        this.mytryRepository = mytryRepository;
    }

    /**
     * POST  /mytries : Create a new mytry.
     *
     * @param mytry the mytry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mytry, or with status 400 (Bad Request) if the mytry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mytries")
    @Timed
    public ResponseEntity<Mytry> createMytry(@RequestBody Mytry mytry) throws URISyntaxException {
        log.debug("REST request to save Mytry : {}", mytry);
        if (mytry.getId() != null) {
            throw new BadRequestAlertException("A new mytry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mytry result = mytryRepository.save(mytry);
        return ResponseEntity.created(new URI("/api/mytries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mytries : Updates an existing mytry.
     *
     * @param mytry the mytry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mytry,
     * or with status 400 (Bad Request) if the mytry is not valid,
     * or with status 500 (Internal Server Error) if the mytry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mytries")
    @Timed
    public ResponseEntity<Mytry> updateMytry(@RequestBody Mytry mytry) throws URISyntaxException {
        log.debug("REST request to update Mytry : {}", mytry);
        if (mytry.getId() == null) {
            return createMytry(mytry);
        }
        Mytry result = mytryRepository.save(mytry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mytry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mytries : get all the mytries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mytries in body
     */
    @GetMapping("/mytries")
    @Timed
    public ResponseEntity<List<Mytry>> getAllMytries(Pageable pageable) {
        log.debug("REST request to get a page of Mytries");
        Page<Mytry> page = mytryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mytries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mytries/:id : get the "id" mytry.
     *
     * @param id the id of the mytry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mytry, or with status 404 (Not Found)
     */
    @GetMapping("/mytries/{id}")
    @Timed
    public ResponseEntity<Mytry> getMytry(@PathVariable String id) {
        log.debug("REST request to get Mytry : {}", id);
        Mytry mytry = mytryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mytry));
    }

    /**
     * DELETE  /mytries/:id : delete the "id" mytry.
     *
     * @param id the id of the mytry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mytries/{id}")
    @Timed
    public ResponseEntity<Void> deleteMytry(@PathVariable String id) {
        log.debug("REST request to delete Mytry : {}", id);
        mytryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
