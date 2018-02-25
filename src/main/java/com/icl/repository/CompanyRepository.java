package com.icl.repository;

import com.icl.domain.Company;
import com.icl.domain.CompanyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {

    Page<Company> findAllByCompanyType(Pageable pageable, CompanyType companyType);
}
