package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.course")
public class Course {

    private String course;

    private String code;

    private int duration;
}
