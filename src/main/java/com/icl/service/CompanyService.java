package com.icl.service;

import com.icl.domain.*;
import com.icl.repository.CompanyRepository;
import com.icl.repository.OfferRepository;
import com.icl.repository.StatusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final Logger log = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyRepository companyRepository;

    private final StatusRepository statusRepository;

    private final OfferRepository offerRepository;

    public CompanyService(CompanyRepository companyRepository, StatusRepository statusRepository, OfferRepository offerRepository) {
        this.companyRepository = companyRepository;
        this.statusRepository = statusRepository;
        this.offerRepository = offerRepository;
    }

    public Company createCompany(Company company){
        Status status = new Status();
        status.setCOMPANY_STATUS("active");
        statusRepository.save(status);
        company.setStatus(status);
        return companyRepository.save(company);
    }


    public Page<Offer> getAllCompaniesByBatch(Pageable pageable, Batch batch){
        return offerRepository.findAllByCriteria_Batch(pageable, batch.getBatch());
    }

    public Page<Company> getAllCompaniesByType(Pageable pageable, CompanyType companyType){
        return companyRepository.findAllByCompanyType(pageable, companyType);
    }
}
