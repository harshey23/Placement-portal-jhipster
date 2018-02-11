package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.constraints.NotNull;

@Document(collection = "pl.applicant")
public class Applicant {

    private String id;

    @NotNull
    @DBRef
    private Offer offer;

    @DBRef
    private User user;

    @DBRef
    private Account account;

    @DBRef
    private Status status;
}
