package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Offer.
 */
@Document(collection = "offer")
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("package_offered")
    private Integer packageOffered;

    @Field("discreption")
    private String discreption;

    @Field("date_of_visit")
    private LocalDate dateOfVisit;

    @Field("last_date")
    private Instant lastDate;

    @Field("place")
    private String place;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Offer title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPackageOffered() {
        return packageOffered;
    }

    public Offer packageOffered(Integer packageOffered) {
        this.packageOffered = packageOffered;
        return this;
    }

    public void setPackageOffered(Integer packageOffered) {
        this.packageOffered = packageOffered;
    }

    public String getDiscreption() {
        return discreption;
    }

    public Offer discreption(String discreption) {
        this.discreption = discreption;
        return this;
    }

    public void setDiscreption(String discreption) {
        this.discreption = discreption;
    }

    public LocalDate getDateOfVisit() {
        return dateOfVisit;
    }

    public Offer dateOfVisit(LocalDate dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
        return this;
    }

    public void setDateOfVisit(LocalDate dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    public Instant getLastDate() {
        return lastDate;
    }

    public Offer lastDate(Instant lastDate) {
        this.lastDate = lastDate;
        return this;
    }

    public void setLastDate(Instant lastDate) {
        this.lastDate = lastDate;
    }

    public String getPlace() {
        return place;
    }

    public Offer place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
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
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", packageOffered=" + getPackageOffered() +
            ", discreption='" + getDiscreption() + "'" +
            ", dateOfVisit='" + getDateOfVisit() + "'" +
            ", lastDate='" + getLastDate() + "'" +
            ", place='" + getPlace() + "'" +
            "}";
    }
}
