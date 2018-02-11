package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.offer.type")
public class OfferType {

    private String offerType;
}
