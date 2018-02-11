package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.academic")
public class Academic {

    private String id;

    private float sslcPercentage;

    private float puPercentage;

    private float diplomaPercentage;

    private float ugPercentage;

    private String degree;

    private int cet;

    private int comedk;

    private float cgpa;

    private float sgpa1;

    private float sgpa2;

    private float sgpa3;

    private float sgpa4;

    private float sgpa5;

    private float sgpa6;

    private float sgpa7;

    private float sgpa8;

    private float sgpa9;

    private float sgpa10;
}
