package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "com.icl.placement.offer")
public class Offer {

    private String id;

    private String designation;

    private String description;

    private int offerPacakage;

    private Instant dateOfVisit;

    @DBRef
    private Company company;

    @DBRef
    private OfferType offerType;

    @DBRef
    private Criteria criteria;

//    @DBRef
//    private OfferType offerType;

//    @DBRef
//    private Criteria criteria;
}
