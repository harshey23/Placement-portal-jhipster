package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Offer.
 */
@Document(collection = "pl.offer")
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("package_offered")
    private Integer packageOffered;

    @Field("description")
    private String description;

    @Field("date_of_visit")
    private LocalDate dateOfVisit;

    @Field("last_date")
    private LocalDate lastDate;

    @Field("place")
    private String place;

    @DBRef
    private Company company;

    @DBRef
    private OfferType offerType;

    @DBRef
    private Criteria criteria;

    @DBRef
    private Status status;

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

    public String getDescription() {
        return description;
    }

    public Offer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public LocalDate getLastDate() {
        return lastDate;
    }

    public Offer lastDate(LocalDate lastDate) {
        this.lastDate = lastDate;
        return this;
    }

    public void setLastDate(LocalDate lastDate) {
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public OfferType getOfferType() {
        return offerType;
    }

    public void setOfferType(OfferType offerType) {
        this.offerType = offerType;
    }

    public Criteria getCriteria() {
        return criteria;
    }

    public void setCriteria(Criteria criteria) {
        this.criteria = criteria;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
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
            ", description='" + getDescription() + "'" +
            ", dateOfVisit='" + getDateOfVisit() + "'" +
            ", lastDate='" + getLastDate() + "'" +
            ", place='" + getPlace() + "'" +
            "}";
    }
}
