package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Fee.
 */
public class Fee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("receipt_number")
    private Integer receiptNumber;

    @Field("amount")
    private Integer amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getReceiptNumber() {
        return receiptNumber;
    }

    public Fee receiptNumber(Integer receiptNumber) {
        this.receiptNumber = receiptNumber;
        return this;
    }

    public void setReceiptNumber(Integer receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public Integer getAmount() {
        return amount;
    }

    public Fee amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
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
        Fee fee = (Fee) o;
        if (fee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fee{" +
            "id=" + getId() +
            ", receiptNumber=" + getReceiptNumber() +
            ", amount=" + getAmount() +
            "}";
    }
}
