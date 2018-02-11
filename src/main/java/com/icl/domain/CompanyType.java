package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.company.type")
public class CompanyType {

    private String companyType;
}
