package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Arrays;

@Document(collection = "pl.mocktest")
public class MockTest {


    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private String name;

    private Questions[] questions;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Questions[] getQuestions() {
        return questions;
    }

    public void setQuestions(Questions[] questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "MockTest{" +
            "id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", questions=" + Arrays.toString(questions) +
            '}';
    }
}
