package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Mytry.
 */
@Document(collection = "mytry")
public class Mytry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("s")
    private String s;

    @Field("i")
    private Integer i;

    @Field("l")
    private Long l;

    @Field("f")
    private Float f;

    @Field("d")
    private Double d;

    @Field("bd")
    private BigDecimal bd;

    @Field("ld")
    private LocalDate ld;

    @Field("inst")
    private Instant inst;

    @Field("zdt")
    private ZonedDateTime zdt;

    @Field("b")
    private Boolean b;

    @Field("bl")
    private byte[] bl;

    @Field("bl_content_type")
    private String blContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getS() {
        return s;
    }

    public Mytry s(String s) {
        this.s = s;
        return this;
    }

    public void setS(String s) {
        this.s = s;
    }

    public Integer getI() {
        return i;
    }

    public Mytry i(Integer i) {
        this.i = i;
        return this;
    }

    public void setI(Integer i) {
        this.i = i;
    }

    public Long getL() {
        return l;
    }

    public Mytry l(Long l) {
        this.l = l;
        return this;
    }

    public void setL(Long l) {
        this.l = l;
    }

    public Float getF() {
        return f;
    }

    public Mytry f(Float f) {
        this.f = f;
        return this;
    }

    public void setF(Float f) {
        this.f = f;
    }

    public Double getD() {
        return d;
    }

    public Mytry d(Double d) {
        this.d = d;
        return this;
    }

    public void setD(Double d) {
        this.d = d;
    }

    public BigDecimal getBd() {
        return bd;
    }

    public Mytry bd(BigDecimal bd) {
        this.bd = bd;
        return this;
    }

    public void setBd(BigDecimal bd) {
        this.bd = bd;
    }

    public LocalDate getLd() {
        return ld;
    }

    public Mytry ld(LocalDate ld) {
        this.ld = ld;
        return this;
    }

    public void setLd(LocalDate ld) {
        this.ld = ld;
    }

    public Instant getInst() {
        return inst;
    }

    public Mytry inst(Instant inst) {
        this.inst = inst;
        return this;
    }

    public void setInst(Instant inst) {
        this.inst = inst;
    }

    public ZonedDateTime getZdt() {
        return zdt;
    }

    public Mytry zdt(ZonedDateTime zdt) {
        this.zdt = zdt;
        return this;
    }

    public void setZdt(ZonedDateTime zdt) {
        this.zdt = zdt;
    }

    public Boolean isB() {
        return b;
    }

    public Mytry b(Boolean b) {
        this.b = b;
        return this;
    }

    public void setB(Boolean b) {
        this.b = b;
    }

    public byte[] getBl() {
        return bl;
    }

    public Mytry bl(byte[] bl) {
        this.bl = bl;
        return this;
    }

    public void setBl(byte[] bl) {
        this.bl = bl;
    }

    public String getBlContentType() {
        return blContentType;
    }

    public Mytry blContentType(String blContentType) {
        this.blContentType = blContentType;
        return this;
    }

    public void setBlContentType(String blContentType) {
        this.blContentType = blContentType;
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
        Mytry mytry = (Mytry) o;
        if (mytry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mytry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mytry{" +
            "id=" + getId() +
            ", s='" + getS() + "'" +
            ", i=" + getI() +
            ", l=" + getL() +
            ", f=" + getF() +
            ", d=" + getD() +
            ", bd=" + getBd() +
            ", ld='" + getLd() + "'" +
            ", inst='" + getInst() + "'" +
            ", zdt='" + getZdt() + "'" +
            ", b='" + isB() + "'" +
            ", bl='" + getBl() + "'" +
            ", blContentType='" + getBlContentType() + "'" +
            "}";
    }
}
