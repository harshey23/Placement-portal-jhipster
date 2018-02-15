package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CompanyType.
 */
@Document(collection = "company_type")
public class CompanyType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("company_type")
    private String companyType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyType() {
        return companyType;
    }

    public CompanyType companyType(String companyType) {
        this.companyType = companyType;
        return this;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
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
        CompanyType companyType = (CompanyType) o;
        if (companyType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyType{" +
            "id=" + getId() +
            ", companyType='" + getCompanyType() + "'" +
            "}";
    }
}
