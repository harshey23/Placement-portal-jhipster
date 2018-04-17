package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

/**
 * A Offer.
 */
@Document(collection = "pl.offer")
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("company")
    private String company;

    @Field("course")
    private String course;

    @Field("cgpa")
    private String cgpa;

    @Field("dateOfVisit")
    private Date dateOfVisit;

    @Field("lastDate")
    private Date lastDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }

    public Date getDateOfVisit() {
        return dateOfVisit;
    }

    public void setDateOfVisit(Date dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    public Date getLastDate() {
        return lastDate;
    }

    public void setLastDate(Date lastDate) {
        this.lastDate = lastDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Offer offer = (Offer) o;
        if (offer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id='" + id + '\'' +
            ", company='" + company + '\'' +
            ", course='" + course + '\'' +
            ", cgpa='" + cgpa + '\'' +
            ", dateOfVisit=" + dateOfVisit +
            ", lastDate=" + lastDate +
            '}';
    }
}
