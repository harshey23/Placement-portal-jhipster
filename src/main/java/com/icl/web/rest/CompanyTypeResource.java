package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.CompanyType;

import com.icl.repository.CompanyTypeRepository;
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
 * REST controller for managing CompanyType.
 */
@RestController
@RequestMapping("/api")
public class CompanyTypeResource {

    private final Logger log = LoggerFactory.getLogger(CompanyTypeResource.class);

    private static final String ENTITY_NAME = "companyType";

    private final CompanyTypeRepository companyTypeRepository;

    public CompanyTypeResource(CompanyTypeRepository companyTypeRepository) {
        this.companyTypeRepository = companyTypeRepository;
    }

    /**
     * POST  /company-types : Create a new companyType.
     *
     * @param companyType the companyType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companyType, or with status 400 (Bad Request) if the companyType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/company-types")
    @Timed
    public ResponseEntity<CompanyType> createCompanyType(@RequestBody CompanyType companyType) throws URISyntaxException {
        log.debug("REST request to save CompanyType : {}", companyType);
        if (companyType.getCompanyType() != null) {
            throw new BadRequestAlertException("A new companyType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyType result = companyTypeRepository.save(companyType);
        return ResponseEntity.created(new URI("/api/company-types/" + result.getCompanyType()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getCompanyType().toString()))
            .body(result);
    }

    /**
     * PUT  /company-types : Updates an existing companyType.
     *
     * @param companyType the companyType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companyType,
     * or with status 400 (Bad Request) if the companyType is not valid,
     * or with status 500 (Internal Server Error) if the companyType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/company-types")
    @Timed
    public ResponseEntity<CompanyType> updateCompanyType(@RequestBody CompanyType companyType) throws URISyntaxException {
        log.debug("REST request to update CompanyType : {}", companyType);
        if (companyType.getCompanyType() == null) {
            return createCompanyType(companyType);
        }
        CompanyType result = companyTypeRepository.save(companyType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companyType.getCompanyType().toString()))
            .body(result);
    }

    /**
     * GET  /company-types : get all the companyTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companyTypes in body
     */
    @GetMapping("/company-types")
    @Timed
    public ResponseEntity<List<CompanyType>> getAllCompanyTypes(Pageable pageable) {
        log.debug("REST request to get a page of CompanyTypes");
        Page<CompanyType> page = companyTypeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/company-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /company-types/:type : get the "id" companyType.
     *
     * @param type the id of the companyType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companyType, or with status 404 (Not Found)
     */
    @GetMapping("/company-types/{type}")
    @Timed
    public ResponseEntity<CompanyType> getCompanyType(@PathVariable String type) {
        log.debug("REST request to get CompanyType : {}", type);
        CompanyType companyType = companyTypeRepository.findOne(type);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(companyType));
    }

    /**
     * DELETE  /company-types/:type : delete the "id" companyType.
     *
     * @param type the id of the companyType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/company-types/{type}")
    @Timed
    public ResponseEntity<Void> deleteCompanyType(@PathVariable String type) {
        log.debug("REST request to delete CompanyType : {}", type);
        companyTypeRepository.delete(type);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, type)).build();
    }
}
