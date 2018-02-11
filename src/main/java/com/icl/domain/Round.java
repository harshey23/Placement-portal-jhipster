package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.round")
public class Round {

    private String id;

    private String name;

    private int roundNumber;

    @DBRef
    private RoundType roundType;

    @DBRef
    private Offer offer;
}
