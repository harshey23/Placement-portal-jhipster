package com.icl.domain;

import org.springframework.data.annotation.Id;

import java.util.Objects;

public class CourseType {

    @Id
    private String courseType;

    public String getCourseType() {
        return courseType;
    }

    public CourseType courseType(String courseType) {
        this.courseType = courseType;
        return this;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
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
        CourseType courseType = (CourseType) o;
        if (courseType.getCourseType() == null || getCourseType() == null) {
            return false;
        }
        return Objects.equals(getCourseType(), courseType.getCourseType());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getCourseType());
    }

    @Override
    public String toString() {
        return "CourseType{" +
            "courseType='" + getCourseType() + "'" +
            "}";
    }
}
