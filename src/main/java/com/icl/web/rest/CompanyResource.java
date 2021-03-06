package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Batch;
import com.icl.domain.Company;

import com.icl.domain.CompanyType;
import com.icl.domain.Offer;
import com.icl.repository.CompanyRepository;
import com.icl.service.CompanyService;
//import com.icl.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing Company.
 */
@RestController
@RequestMapping("/api")
public class CompanyResource {

    private final Logger log = LoggerFactory.getLogger(CompanyResource.class);

    private static final String ENTITY_NAME = "company";

    private final CompanyService companyService;

    private final CompanyRepository companyRepository;

    public CompanyResource(CompanyRepository companyRepository, CompanyService companyService) {
        this.companyRepository = companyRepository;
        this.companyService = companyService;
    }

    /**
     * POST  /companies : Create a new company.
     *
     * @param company the company to create
     * @return the ResponseEntity with status 201 (Created) and with body the new company, or with status 400 (Bad Request) if the company has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/companies")
    @Timed
    public ResponseEntity<Company> createCompany(@RequestBody Company company) throws URISyntaxException {
        log.debug("REST request to save Company : {}", company);
        Company result = companyService.createCompany(company);
        return ResponseEntity.created(new URI("/api/companies/" + result.getName()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getName()))
            .body(result);
    }

    /**
     * PUT  /companies : Updates an existing company.
     *
     * @param company the company to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated company,
     * or with status 400 (Bad Request) if the company is not valid,
     * or with status 500 (Internal Server Error) if the company couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/companies")
    @Timed
    public ResponseEntity<Company> updateCompany(@RequestBody Company company) throws URISyntaxException {
        log.debug("REST request to update Company : {}", company);
        if (company.getName() == null) {
            return createCompany(company);
        }
        Company result = companyRepository.save(company);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, company.getName().toString()))
            .body(result);
    }

    /**
     * GET  /companies : get all the companies.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companies in body
     */
    @GetMapping("/companies")
    @Timed
    public ResponseEntity<List<Company>> getAllCompanies(Pageable pageable) {
        log.debug("REST request to get a page of Companies");
        Page<Company> page = companyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/companies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /companies/:id : get the "id" company.
     *
     * @param id the id of the company to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the company, or with status 404 (Not Found)
     */
    @GetMapping("/companies/{id}")
    @Timed
    public ResponseEntity<Company> getName(@PathVariable String id) {
        log.debug("REST request to get Company : {}", id);
        Company company = companyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(company));
    }

    /**
     * DELETE  /companies/:id : delete the "id" company.
     *
     * @param id the id of the company to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/companies/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompany(@PathVariable String id) {
        log.debug("REST request to delete Company : {}", id);
        companyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }


//    /**
//     * GET  /companies : get all the companies.
//     *
//     * @param pageable the pagination information
//     * @return the ResponseEntity with status 200 (OK) and the list of companies in body
//     */
//    @GetMapping("/companies/batch/{batch}")
//    @Timed
//    public ResponseEntity<List<Offer>> getAllCompaniesByBatch(Pageable pageable, @RequestBody Batch batch) {
//        final Page<Offer> page = companyService.getAllCompaniesByBatch(pageable, batch);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/companies/batch");
//        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
//    }

    /**
     * GET  /companies : get all the companies.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companies in body
     */
    @GetMapping("/companies/type/{type}")
    @Timed
    public ResponseEntity<List<Company>> getAllCompaniesByType(Pageable pageable, @RequestBody CompanyType companyType) {
        final Page<Company> page = companyService.getAllCompaniesByType(pageable, companyType);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/companies/batch");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
