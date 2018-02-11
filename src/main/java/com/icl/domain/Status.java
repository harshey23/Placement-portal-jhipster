package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.status")
public class Status {

    private final String USER_STATUS="active";
    private final String COMPANY_STATUS="active";
    private final String OFFER_STATUS="active";
    private final String ROUND_STATUS="active";
    private final String APPLICANT_STATUS="active";
    private final String _STATUS="active";
}
