package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Batch.
 */
@Document(collection = "batch")
public class Batch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("batch")
    private String batch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBatch() {
        return batch;
    }

    public Batch batch(String batch) {
        this.batch = batch;
        return this;
    }

    public void setBatch(String batch) {
        this.batch = batch;
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
        Batch batch = (Batch) o;
        if (batch.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), batch.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Batch{" +
            "id=" + getId() +
            ", batch='" + getBatch() + "'" +
            "}";
    }
}
