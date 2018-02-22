package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Batch;

import com.icl.repository.BatchRepository;
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
 * REST controller for managing Batch.
 */
@RestController
@RequestMapping("/api")
public class BatchResource {

    private final Logger log = LoggerFactory.getLogger(BatchResource.class);

    private static final String ENTITY_NAME = "batch";

    private final BatchRepository batchRepository;

    public BatchResource(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    /**
     * POST  /batches : Create a new batch.
     *
     * @param batch the batch to create
     * @return the ResponseEntity with status 201 (Created) and with body the new batch, or with status 400 (Bad Request) if the batch has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/batches")
    @Timed
    public ResponseEntity<Batch> createBatch(@RequestBody Batch batch) throws URISyntaxException {
        log.debug("REST request to save Batch : {}", batch);
        if (batch.getBatch() != null) {
            throw new BadRequestAlertException("A new batch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Batch result = batchRepository.save(batch);
        return ResponseEntity.created(new URI("/api/batches/" + result.getBatch()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getBatch().toString()))
            .body(result);
    }

    /**
     * PUT  /batches : Updates an existing batch.
     *
     * @param batch the batch to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated batch,
     * or with status 400 (Bad Request) if the batch is not valid,
     * or with status 500 (Internal Server Error) if the batch couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/batches")
    @Timed
    public ResponseEntity<Batch> updateBatch(@RequestBody Batch batch) throws URISyntaxException {
        log.debug("REST request to update Batch : {}", batch);
        if (batch.getBatch() == null) {
            return createBatch(batch);
        }
        Batch result = batchRepository.save(batch);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, batch.getBatch().toString()))
            .body(result);
    }

    /**
     * GET  /batches : get all the batches.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of batches in body
     */
    @GetMapping("/batches")
    @Timed
    public ResponseEntity<List<Batch>> getAllBatches(Pageable pageable) {
        log.debug("REST request to get a page of Batches");
        Page<Batch> page = batchRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/batches");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /batches/:id : get the "id" batch.
     *
     * @param batchId the id of the batch to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the batch, or with status 404 (Not Found)
     */
    @GetMapping("/batches/{batchId}")
    @Timed
    public ResponseEntity<Batch> getBatch(@PathVariable String batchId) {
        log.debug("REST request to get Batch : {}", batchId);
        Batch batch = batchRepository.findOne(batchId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(batch));
    }

    /**
     * DELETE  /batches/:id : delete the "id" batch.
     *
     * @param batchId the id of the batch to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/batches/{batchId}")
    @Timed
    public ResponseEntity<Void> deleteBatch(@PathVariable String batchId) {
        log.debug("REST request to delete Batch : {}", batchId);
        batchRepository.delete(batchId);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, batchId)).build();
    }
}
