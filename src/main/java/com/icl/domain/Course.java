package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Course.
 */
@Document(collection = "course")
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String course;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getCourse() {
        return course;
    }

    public Course course(String course) {
        this.course = course;
        return this;
    }

    public void setCourse(String course) {
        this.course = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Course course = (Course) o;
        if (course.getCourse() == null || getCourse() == null) {
            return false;
        }
        return Objects.equals(getCourse(), course.getCourse());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getCourse());
    }

    @Override
    public String toString() {
        return "Course{" +
            "course='" + getCourse() + "'" +
            "}";
    }
}
