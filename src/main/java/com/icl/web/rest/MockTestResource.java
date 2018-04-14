package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Company;
import com.icl.domain.MockTest;
import com.icl.repository.MockTestRepository;
import com.icl.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MockTestResource {

    private final Logger log = LoggerFactory.getLogger(MockTestResource.class);

    private static final String ENTITY_NAME = "mocktest";

private final MockTestRepository mockTestRepository;

    public MockTestResource(MockTestRepository mockTestRepository) {
        this.mockTestRepository = mockTestRepository;
    }

    /**
     * GET  /companies : get all the companies.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companies in body
     */
    @GetMapping("/mocktest")
    @Timed
    public ResponseEntity<List<MockTest>> getAllTests(Pageable pageable) {
        log.debug("REST request to get a page of Mocktests");
        Page<MockTest> page = mockTestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mocktest");
        return new ResponseEntity(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /companies/:id : get the "id" company.
     *
     * @param id the id of the company to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the company, or with status 404 (Not Found)
     */
    @GetMapping("/mocktest/{id}")
    @Timed
    public ResponseEntity<MockTest> getName(@PathVariable String id) {
        log.debug("REST request to get Mocktest : {}", id);
        MockTest mockTest = mockTestRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mockTest));
    }

}
