package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "pl.status")
public class Status implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private String COMPANY_STATUS;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCOMPANY_STATUS() {
        return COMPANY_STATUS;
    }

    public void setCOMPANY_STATUS(String COMPANY_STATUS) {
        this.COMPANY_STATUS = COMPANY_STATUS;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Status status = (Status) o;

        if (id != null ? !id.equals(status.id) : status.id != null) return false;
        return COMPANY_STATUS != null ? COMPANY_STATUS.equals(status.COMPANY_STATUS) : status.COMPANY_STATUS == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (COMPANY_STATUS != null ? COMPANY_STATUS.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Status{" +
            "id='" + id + '\'' +
            ", COMPANY_STATUS='" + COMPANY_STATUS + '\'' +
            '}';
    }
}
