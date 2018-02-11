package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "com.icl.placement.announcement")
public class Announcement {

    private String id;

    private String title;

    private String body;
}
