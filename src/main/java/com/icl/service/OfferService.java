package com.icl.service;

import com.icl.domain.Batch;
import com.icl.domain.Criteria;
import com.icl.domain.Offer;
import com.icl.domain.OfferType;
import com.icl.repository.OfferRepository;
import com.icl.repository.UserRepository;
import com.icl.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OfferService {

    private final Logger log = LoggerFactory.getLogger(OfferService.class);

    private final OfferRepository offerRepository;

    private final UserRepository userRepository;

    public OfferService(OfferRepository offerRepository, UserRepository userRepository) {
        this.offerRepository = offerRepository;
        this.userRepository = userRepository;
    }

    public Page<Offer> getAllOffersByBatch(Pageable pageable, Batch batch){
        return offerRepository.findAllByCriteria_Batch(pageable, batch.getBatch());
    }

    public Page<Offer> getAllOffersByOfferType(Pageable pageable, OfferType offerType){
        return offerRepository.findAllByOfferType_OfferType(pageable, offerType.getOfferType());
    }

//    public Page<UserDTO> getGeneralEligibility(Pageable pageable, Criteria criteria){
//        return userRepository.someMethod(pageable, criteria);
//    }

}
