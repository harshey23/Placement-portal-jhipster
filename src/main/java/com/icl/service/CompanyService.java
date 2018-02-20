package com.icl.service;

import com.icl.domain.Batch;
import com.icl.domain.Company;
import com.icl.domain.CompanyType;
import com.icl.domain.Offer;
import com.icl.repository.CompanyRepository;
import com.icl.repository.OfferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final Logger log = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyRepository companyRepository;

    private final OfferRepository offerRepository;

    public CompanyService(CompanyRepository companyRepository, OfferRepository offerRepository) {
        this.companyRepository = companyRepository;
        this.offerRepository = offerRepository;
    }


    public Page<Offer> getAllCompaniesByBatch(Pageable pageable, Batch batch){
        return offerRepository.findAllByCriteria_Batch(pageable, batch.getBatch());
    }

    public Page<Company> getAllCompaniesByType(Pageable pageable, CompanyType companyType){
        return companyRepository.findAllByCompanyType(pageable, companyType);
    }
}
