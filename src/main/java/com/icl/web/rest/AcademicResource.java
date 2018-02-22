package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Academic;

import com.icl.repository.AcademicRepository;
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
 * REST controller for managing Academic.
 */
@RestController
@RequestMapping("/api")
public class AcademicResource {

    private final Logger log = LoggerFactory.getLogger(AcademicResource.class);

    private static final String ENTITY_NAME = "academic";

    private final AcademicRepository academicRepository;

    public AcademicResource(AcademicRepository academicRepository) {
        this.academicRepository = academicRepository;
    }

    /**
     * POST  /academics : Create a new academic.
     *
     * @param academic the academic to create
     * @return the ResponseEntity with status 201 (Created) and with body the new academic, or with status 400 (Bad Request) if the academic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/academics")
    @Timed
    public ResponseEntity<Academic> createAcademic(@RequestBody Academic academic) throws URISyntaxException {
        log.debug("REST request to save Academic : {}", academic);
        if (academic.getId() != null) {
            throw new BadRequestAlertException("A new academic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Academic result = academicRepository.save(academic);
        return ResponseEntity.created(new URI("/api/academics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /academics : Updates an existing academic.
     *
     * @param academic the academic to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated academic,
     * or with status 400 (Bad Request) if the academic is not valid,
     * or with status 500 (Internal Server Error) if the academic couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/academics")
    @Timed
    public ResponseEntity<Academic> updateAcademic(@RequestBody Academic academic) throws URISyntaxException {
        log.debug("REST request to update Academic : {}", academic);
        if (academic.getId() == null) {
            return createAcademic(academic);
        }
        Academic result = academicRepository.save(academic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, academic.getId().toString()))
            .body(result);
    }

    /**
     * GET  /academics : get all the academics.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of academics in body
     */
    @GetMapping("/academics")
    @Timed
    public ResponseEntity<List<Academic>> getAllAcademics(Pageable pageable) {
        log.debug("REST request to get a page of Academics");
        Page<Academic> page = academicRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/academics");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /academics/:id : get the "id" academic.
     *
     * @param id the id of the academic to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the academic, or with status 404 (Not Found)
     */
    @GetMapping("/academics/{id}")
    @Timed
    public ResponseEntity<Academic> getAcademic(@PathVariable String id) {
        log.debug("REST request to get Academic : {}", id);
        Academic academic = academicRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(academic));
    }

    /**
     * DELETE  /academics/:id : delete the "id" academic.
     *
     * @param id the id of the academic to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/academics/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcademic(@PathVariable String id) {
        log.debug("REST request to delete Academic : {}", id);
        academicRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
