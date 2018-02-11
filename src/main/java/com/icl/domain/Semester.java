package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.semester")
public class Semester {

    private String semester;
}
