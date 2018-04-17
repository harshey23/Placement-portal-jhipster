package com.icl.service.dto;

import com.icl.domain.Company;
import com.icl.domain.Course;
import com.icl.domain.OfferType;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class OfferDTO {

    private String id;

    private OfferType offerType;

    private boolean internshipMandatory;

    private boolean convertToJob;

    private boolean campus;

    private String company;

    private Integer packageOffered;

    private String discreption;

    private LocalDate dateOfVisit;

    private LocalDate lastDate;

    private String batch;

    private String courseType;

    private String courses;

    private String cgpa;

    private float sslcCutOff;

    private float puCutOff;

    private float diplomaCutOff;

    private float ugCutOff;

    private float cgpaCutOff;

    private float sgpaCutOff;

    private int cetCoutoff;

    private int historyBacklogs;

    private int currentBacklogs;

    private boolean yearBack;

    private boolean educationBreak;

    private Set<String> category;

    private Set<String> gender;

    private Set<String> companiesToBeExcluded;

    private Set<String> categoryAllowed;

    private int multipleOfferAllowed;

    private float packageUpperBound;

    private float packageLowerBound;

    public OfferDTO() {
        // Empty constructor needed for Jackson.
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setCourses(String courses) {
        this.courses = courses;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }

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

    public boolean isInternshipMandatory() {
        return internshipMandatory;
    }

    public void setInternshipMandatory(boolean internshipMandatory) {
        this.internshipMandatory = internshipMandatory;
    }

    public boolean isConvertToJob() {
        return convertToJob;
    }

    public void setConvertToJob(boolean convertToJob) {
        this.convertToJob = convertToJob;
    }

    public boolean isCampus() {
        return campus;
    }

    public void setCampus(boolean campus) {
        this.campus = campus;
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

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public float getSslcCutOff() {
        return sslcCutOff;
    }

    public void setSslcCutOff(float sslcCutOff) {
        this.sslcCutOff = sslcCutOff;
    }

    public float getPuCutOff() {
        return puCutOff;
    }

    public void setPuCutOff(float puCutOff) {
        this.puCutOff = puCutOff;
    }

    public float getDiplomaCutOff() {
        return diplomaCutOff;
    }

    public void setDiplomaCutOff(float diplomaCutOff) {
        this.diplomaCutOff = diplomaCutOff;
    }

    public float getUgCutOff() {
        return ugCutOff;
    }

    public void setUgCutOff(float ugCutOff) {
        this.ugCutOff = ugCutOff;
    }

    public float getCgpaCutOff() {
        return cgpaCutOff;
    }

    public void setCgpaCutOff(float cgpaCutOff) {
        this.cgpaCutOff = cgpaCutOff;
    }

    public float getSgpaCutOff() {
        return sgpaCutOff;
    }

    public void setSgpaCutOff(float sgpaCutOff) {
        this.sgpaCutOff = sgpaCutOff;
    }

    public int getCetCoutoff() {
        return cetCoutoff;
    }

    public void setCetCoutoff(int cetCoutoff) {
        this.cetCoutoff = cetCoutoff;
    }

    public int getHistoryBacklogs() {
        return historyBacklogs;
    }

    public void setHistoryBacklogs(int historyBacklogs) {
        this.historyBacklogs = historyBacklogs;
    }

    public int getCurrentBacklogs() {
        return currentBacklogs;
    }

    public void setCurrentBacklogs(int currentBacklogs) {
        this.currentBacklogs = currentBacklogs;
    }

    public boolean isYearBack() {
        return yearBack;
    }

    public void setYearBack(boolean yearBack) {
        this.yearBack = yearBack;
    }

    public boolean isEducationBreak() {
        return educationBreak;
    }

    public void setEducationBreak(boolean educationBreak) {
        this.educationBreak = educationBreak;
    }

    public Set<String> getCategory() {
        return category;
    }

    public void setCategory(Set<String> category) {
        this.category = category;
    }

    public Set<String> getGender() {
        return gender;
    }

    public void setGender(Set<String> gender) {
        this.gender = gender;
    }

    public Set<String> getCompaniesToBeExcluded() {
        return companiesToBeExcluded;
    }

    public void setCompaniesToBeExcluded(Set<String> companiesToBeExcluded) {
        this.companiesToBeExcluded = companiesToBeExcluded;
    }

    public Set<String> getCategoryAllowed() {
        return categoryAllowed;
    }

    public void setCategoryAllowed(Set<String> categoryAllowed) {
        this.categoryAllowed = categoryAllowed;
    }

    public int getMultipleOfferAllowed() {
        return multipleOfferAllowed;
    }

    public void setMultipleOfferAllowed(int multipleOfferAllowed) {
        this.multipleOfferAllowed = multipleOfferAllowed;
    }

    public float getPackageUpperBound() {
        return packageUpperBound;
    }

    public void setPackageUpperBound(float packageUpperBound) {
        this.packageUpperBound = packageUpperBound;
    }

    public float getPackageLowerBound() {
        return packageLowerBound;
    }

    public void setPackageLowerBound(float packageLowerBound) {
        this.packageLowerBound = packageLowerBound;
    }

    @Override
    public String toString() {
        return "OfferDTO{" +
            "id='" + id + '\'' +
            ", offerType=" + offerType +
            ", internshipMandatory=" + internshipMandatory +
            ", convertToJob=" + convertToJob +
            ", campus=" + campus +
            ", company='" + company + '\'' +
            ", packageOffered=" + packageOffered +
            ", discreption='" + discreption + '\'' +
            ", dateOfVisit=" + dateOfVisit +
            ", lastDate=" + lastDate +
            ", batch='" + batch + '\'' +
            ", courseType='" + courseType + '\'' +
            ", courses='" + courses + '\'' +
            ", cgpa='" + cgpa + '\'' +
            ", sslcCutOff=" + sslcCutOff +
            ", puCutOff=" + puCutOff +
            ", diplomaCutOff=" + diplomaCutOff +
            ", ugCutOff=" + ugCutOff +
            ", cgpaCutOff=" + cgpaCutOff +
            ", sgpaCutOff=" + sgpaCutOff +
            ", cetCoutoff=" + cetCoutoff +
            ", historyBacklogs=" + historyBacklogs +
            ", currentBacklogs=" + currentBacklogs +
            ", yearBack=" + yearBack +
            ", educationBreak=" + educationBreak +
            ", category=" + category +
            ", gender=" + gender +
            ", companiesToBeExcluded=" + companiesToBeExcluded +
            ", categoryAllowed=" + categoryAllowed +
            ", multipleOfferAllowed=" + multipleOfferAllowed +
            ", packageUpperBound=" + packageUpperBound +
            ", packageLowerBound=" + packageLowerBound +
            '}';
    }
}
