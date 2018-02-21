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

    public String getUSER_STATUS() {
        return USER_STATUS;
    }

    public String getCOMPANY_STATUS() {
        return COMPANY_STATUS;
    }

    public String getOFFER_STATUS() {
        return OFFER_STATUS;
    }

    public String getROUND_STATUS() {
        return ROUND_STATUS;
    }

    public String getAPPLICANT_STATUS() {
        return APPLICANT_STATUS;
    }

    public String get_STATUS() {
        return _STATUS;
    }
}
