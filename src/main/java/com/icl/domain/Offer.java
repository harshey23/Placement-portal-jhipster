package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
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

    @DBRef
    private OfferType offerType;

    private boolean internshipMandatory;

    private boolean convertToJob;

    private boolean campus;

    @DBRef
    private Company company;

    @Field("package_offered")
    private Integer packageOffered;

    @Field("discreption")
    private String discreption;

    @Field("date_of_visit")
    private LocalDate dateOfVisit;

    @Field("last_date")
    private LocalDate lastDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public OfferType getOfferType() {
        return offerType;
    }

    public void setOfferType(OfferType offerType) {
        this.offerType = offerType;
    }

    public boolean getInternshipMandatory() {
        return internshipMandatory;
    }

    public void setInternshipMandatory(boolean internshipMandatory) {
        this.internshipMandatory = internshipMandatory;
    }

    public boolean getConvertToJob() {
        return convertToJob;
    }

    public void setConvertToJob(boolean convertToJob) {
        this.convertToJob = convertToJob;
    }

    public boolean getCampus() {
        return campus;
    }

    public void setCampus(boolean campus) {
        this.campus = campus;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Integer getPackageOffered() {
        return packageOffered;
    }

    public void setPackageOffered(Integer packageOffered) {
        this.packageOffered = packageOffered;
    }

    public String getDiscreption() {
        return discreption;
    }

    public void setDiscreption(String discreption) {
        this.discreption = discreption;
    }

    public LocalDate getDateOfVisit() {
        return dateOfVisit;
    }

    public void setDateOfVisit(LocalDate dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    public LocalDate getLastDate() {
        return lastDate;
    }

    public void setLastDate(LocalDate lastDate) {
        this.lastDate = lastDate;
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
            "id='" + id + '\'' +
            ", offerType=" + offerType +
            ", internshipMandatory=" + internshipMandatory +
            ", convertToJob=" + convertToJob +
            ", campus=" + campus +
            ", company=" + company +
            ", packageOffered=" + packageOffered +
            ", discreption='" + discreption + '\'' +
            ", dateOfVisit=" + dateOfVisit +
            ", lastDate=" + lastDate +
            '}';
    }
}
