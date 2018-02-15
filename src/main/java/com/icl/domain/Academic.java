package com.icl.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Academic.
 */
@Document(collection = "academic")
public class Academic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("x_board")
    private String xBoard;

    @Field("x_percentage")
    private String xPercentage;

    @Field("x_year_of_pass")
    private String xYearOfPass;

    @Field("xii_board")
    private String xiiBoard;

    @Field("xii_percentage")
    private String xiiPercentage;

    @Field("xii_year_of_pass")
    private String xiiYearOfPass;

    @Field("dip_percentage")
    private String dipPercentage;

    @Field("dip_year_of_pass")
    private String dipYearOfPass;

    @Field("cet_rank")
    private Integer cetRank;

    @Field("comedk_rank")
    private Integer comedkRank;

    @Field("i_sem")
    private Float iSem;

    @Field("ii_sem")
    private Float iiSem;

    @Field("iii_sem")
    private Float iiiSem;

    @Field("iv_sem")
    private Float ivSem;

    @Field("v_sem")
    private Float vSem;

    @Field("vi_sem")
    private Float viSem;

    @Field("vii_sem")
    private Float viiSem;

    @Field("viii_sem")
    private Float viiiSem;

    @Field("ix_sem")
    private Float ixSem;

    @Field("x_sem")
    private Float xSem;

    @Field("cgpa")
    private Float cgpa;

    @Field("discontinued")
    private Boolean discontinued;

    @Field("year_back")
    private Boolean yearBack;

    @Field("current_back_log")
    private Integer currentBackLog;

    @Field("history_back_log")
    private Integer historyBackLog;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getxBoard() {
        return xBoard;
    }

    public Academic xBoard(String xBoard) {
        this.xBoard = xBoard;
        return this;
    }

    public void setxBoard(String xBoard) {
        this.xBoard = xBoard;
    }

    public String getxPercentage() {
        return xPercentage;
    }

    public Academic xPercentage(String xPercentage) {
        this.xPercentage = xPercentage;
        return this;
    }

    public void setxPercentage(String xPercentage) {
        this.xPercentage = xPercentage;
    }

    public String getxYearOfPass() {
        return xYearOfPass;
    }

    public Academic xYearOfPass(String xYearOfPass) {
        this.xYearOfPass = xYearOfPass;
        return this;
    }

    public void setxYearOfPass(String xYearOfPass) {
        this.xYearOfPass = xYearOfPass;
    }

    public String getXiiBoard() {
        return xiiBoard;
    }

    public Academic xiiBoard(String xiiBoard) {
        this.xiiBoard = xiiBoard;
        return this;
    }

    public void setXiiBoard(String xiiBoard) {
        this.xiiBoard = xiiBoard;
    }

    public String getXiiPercentage() {
        return xiiPercentage;
    }

    public Academic xiiPercentage(String xiiPercentage) {
        this.xiiPercentage = xiiPercentage;
        return this;
    }

    public void setXiiPercentage(String xiiPercentage) {
        this.xiiPercentage = xiiPercentage;
    }

    public String getXiiYearOfPass() {
        return xiiYearOfPass;
    }

    public Academic xiiYearOfPass(String xiiYearOfPass) {
        this.xiiYearOfPass = xiiYearOfPass;
        return this;
    }

    public void setXiiYearOfPass(String xiiYearOfPass) {
        this.xiiYearOfPass = xiiYearOfPass;
    }

    public String getDipPercentage() {
        return dipPercentage;
    }

    public Academic dipPercentage(String dipPercentage) {
        this.dipPercentage = dipPercentage;
        return this;
    }

    public void setDipPercentage(String dipPercentage) {
        this.dipPercentage = dipPercentage;
    }

    public String getDipYearOfPass() {
        return dipYearOfPass;
    }

    public Academic dipYearOfPass(String dipYearOfPass) {
        this.dipYearOfPass = dipYearOfPass;
        return this;
    }

    public void setDipYearOfPass(String dipYearOfPass) {
        this.dipYearOfPass = dipYearOfPass;
    }

    public Integer getCetRank() {
        return cetRank;
    }

    public Academic cetRank(Integer cetRank) {
        this.cetRank = cetRank;
        return this;
    }

    public void setCetRank(Integer cetRank) {
        this.cetRank = cetRank;
    }

    public Integer getComedkRank() {
        return comedkRank;
    }

    public Academic comedkRank(Integer comedkRank) {
        this.comedkRank = comedkRank;
        return this;
    }

    public void setComedkRank(Integer comedkRank) {
        this.comedkRank = comedkRank;
    }

    public Float getiSem() {
        return iSem;
    }

    public Academic iSem(Float iSem) {
        this.iSem = iSem;
        return this;
    }

    public void setiSem(Float iSem) {
        this.iSem = iSem;
    }

    public Float getIiSem() {
        return iiSem;
    }

    public Academic iiSem(Float iiSem) {
        this.iiSem = iiSem;
        return this;
    }

    public void setIiSem(Float iiSem) {
        this.iiSem = iiSem;
    }

    public Float getIiiSem() {
        return iiiSem;
    }

    public Academic iiiSem(Float iiiSem) {
        this.iiiSem = iiiSem;
        return this;
    }

    public void setIiiSem(Float iiiSem) {
        this.iiiSem = iiiSem;
    }

    public Float getIvSem() {
        return ivSem;
    }

    public Academic ivSem(Float ivSem) {
        this.ivSem = ivSem;
        return this;
    }

    public void setIvSem(Float ivSem) {
        this.ivSem = ivSem;
    }

    public Float getvSem() {
        return vSem;
    }

    public Academic vSem(Float vSem) {
        this.vSem = vSem;
        return this;
    }

    public void setvSem(Float vSem) {
        this.vSem = vSem;
    }

    public Float getViSem() {
        return viSem;
    }

    public Academic viSem(Float viSem) {
        this.viSem = viSem;
        return this;
    }

    public void setViSem(Float viSem) {
        this.viSem = viSem;
    }

    public Float getViiSem() {
        return viiSem;
    }

    public Academic viiSem(Float viiSem) {
        this.viiSem = viiSem;
        return this;
    }

    public void setViiSem(Float viiSem) {
        this.viiSem = viiSem;
    }

    public Float getViiiSem() {
        return viiiSem;
    }

    public Academic viiiSem(Float viiiSem) {
        this.viiiSem = viiiSem;
        return this;
    }

    public void setViiiSem(Float viiiSem) {
        this.viiiSem = viiiSem;
    }

    public Float getIxSem() {
        return ixSem;
    }

    public Academic ixSem(Float ixSem) {
        this.ixSem = ixSem;
        return this;
    }

    public void setIxSem(Float ixSem) {
        this.ixSem = ixSem;
    }

    public Float getxSem() {
        return xSem;
    }

    public Academic xSem(Float xSem) {
        this.xSem = xSem;
        return this;
    }

    public void setxSem(Float xSem) {
        this.xSem = xSem;
    }

    public Float getCgpa() {
        return cgpa;
    }

    public Academic cgpa(Float cgpa) {
        this.cgpa = cgpa;
        return this;
    }

    public void setCgpa(Float cgpa) {
        this.cgpa = cgpa;
    }

    public Boolean isDiscontinued() {
        return discontinued;
    }

    public Academic discontinued(Boolean discontinued) {
        this.discontinued = discontinued;
        return this;
    }

    public void setDiscontinued(Boolean discontinued) {
        this.discontinued = discontinued;
    }

    public Boolean isYearBack() {
        return yearBack;
    }

    public Academic yearBack(Boolean yearBack) {
        this.yearBack = yearBack;
        return this;
    }

    public void setYearBack(Boolean yearBack) {
        this.yearBack = yearBack;
    }

    public Integer getCurrentBackLog() {
        return currentBackLog;
    }

    public Academic currentBackLog(Integer currentBackLog) {
        this.currentBackLog = currentBackLog;
        return this;
    }

    public void setCurrentBackLog(Integer currentBackLog) {
        this.currentBackLog = currentBackLog;
    }

    public Integer getHistoryBackLog() {
        return historyBackLog;
    }

    public Academic historyBackLog(Integer historyBackLog) {
        this.historyBackLog = historyBackLog;
        return this;
    }

    public void setHistoryBackLog(Integer historyBackLog) {
        this.historyBackLog = historyBackLog;
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
        Academic academic = (Academic) o;
        if (academic.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), academic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Academic{" +
            "id=" + getId() +
            ", xBoard='" + getxBoard() + "'" +
            ", xPercentage='" + getxPercentage() + "'" +
            ", xYearOfPass='" + getxYearOfPass() + "'" +
            ", xiiBoard='" + getXiiBoard() + "'" +
            ", xiiPercentage='" + getXiiPercentage() + "'" +
            ", xiiYearOfPass='" + getXiiYearOfPass() + "'" +
            ", dipPercentage='" + getDipPercentage() + "'" +
            ", dipYearOfPass='" + getDipYearOfPass() + "'" +
            ", cetRank=" + getCetRank() +
            ", comedkRank=" + getComedkRank() +
            ", iSem=" + getiSem() +
            ", iiSem=" + getIiSem() +
            ", iiiSem=" + getIiiSem() +
            ", ivSem=" + getIvSem() +
            ", vSem=" + getvSem() +
            ", viSem=" + getViSem() +
            ", viiSem=" + getViiSem() +
            ", viiiSem=" + getViiiSem() +
            ", ixSem=" + getIxSem() +
            ", xSem=" + getxSem() +
            ", cgpa=" + getCgpa() +
            ", discontinued='" + isDiscontinued() + "'" +
            ", yearBack='" + isYearBack() + "'" +
            ", currentBackLog=" + getCurrentBackLog() +
            ", historyBackLog=" + getHistoryBackLog() +
            "}";
    }
}
