package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CompanyType.
 */
@Document(collection = "pl.company_type")
public class CompanyType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String companyType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

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
        if (companyType.getCompanyType() == null || getCompanyType() == null) {
            return false;
        }
        return Objects.equals(getCompanyType(), companyType.getCompanyType());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getCompanyType());
    }

    @Override
    public String toString() {
        return "CompanyType{" +
            "companyType='" + getCompanyType() + "'" +
            "}";
    }
}
