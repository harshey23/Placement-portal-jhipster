package com.icl.domain;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Document(collection = "pl.company")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String name;

    @Field("website")
    private String website;

    @Field("description")
    private String description;

    @Field("person_1")
    private String person1;

    @Field("contact_1")
    private String contact1;

    @Field("email_1")
    private String email1;

    @Field("person_2")
    private String person2;

    @Field("contact_2")
    private String contact2;

    @Field("email_2")
    private String email2;

    @DBRef
    private CompanyType companyType;

    @DBRef
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebsite() {
        return website;
    }

    public Company website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDescription() {
        return description;
    }

    public Company discreption(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPerson1() {
        return person1;
    }

    public Company person1(String person1) {
        this.person1 = person1;
        return this;
    }

    public void setPerson1(String person1) {
        this.person1 = person1;
    }

    public String getContact1() {
        return contact1;
    }

    public Company contact1(String contact1) {
        this.contact1 = contact1;
        return this;
    }

    public void setContact1(String contact1) {
        this.contact1 = contact1;
    }

    public String getEmail1() {
        return email1;
    }

    public Company email1(String email1) {
        this.email1 = email1;
        return this;
    }

    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    public String getPerson2() {
        return person2;
    }

    public Company person2(String person2) {
        this.person2 = person2;
        return this;
    }

    public void setPerson2(String person2) {
        this.person2 = person2;
    }

    public String getContact2() {
        return contact2;
    }

    public Company contact2(String contact2) {
        this.contact2 = contact2;
        return this;
    }

    public void setContact2(String contact2) {
        this.contact2 = contact2;
    }

    public String getEmail2() {
        return email2;
    }

    public Company email2(String email2) {
        this.email2 = email2;
        return this;
    }

    public void setEmail2(String email2) {
        this.email2 = email2;
    }

    public CompanyType getCompanyType() {
        return companyType;
    }

    public void setCompanyType(CompanyType companyType) {
        this.companyType = companyType;
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
        Company company = (Company) o;
        if (company.getName() == null || getName() == null) {
            return false;
        }
        return Objects.equals(getName(), company.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getName());
    }

    @Override
    public String toString() {
        return "Company{" +
            ", name='" + getName() + "'" +
            ", website='" + getWebsite() + "'" +
            ", descreption='" + getDescription() + "'" +
            ", person1='" + getPerson1() + "'" +
            ", contact1='" + getContact1() + "'" +
            ", email1='" + getEmail1() + "'" +
            ", person2='" + getPerson2() + "'" +
            ", contact2='" + getContact2() + "'" +
            ", email2='" + getEmail2() + "'" +
            "}";
    }
}
