package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.course.type")
public class CourseType {

    private String courseType;
}
