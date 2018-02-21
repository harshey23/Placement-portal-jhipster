package com.icl.domain;

import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

public class Criteria {

    private float sslcCutOff;

    private float puCutOff;

    private float diplomaCutOff;

    private float ugCutOff;

    private float cgpaCutOff;

    private int historyBacklogs;

    private int currentBacklogs;

    private float packageUpperBound;

    private float packageLowerBound;

    private boolean isInternshipMandatory;

    private boolean performanceJob;

    private boolean onCampus;

    private boolean yearBack;

    private boolean educationBreak;

    private String gender;

    private int multipleOfferAllowed;

    private String batch;

    private String courseType;

    private List<String> companiesToBeExcluded;

    private List<String> categoryAllowed;

    private int age;

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

    public boolean isInternshipMandatory() {
        return isInternshipMandatory;
    }

    public void setInternshipMandatory(boolean internshipMandatory) {
        isInternshipMandatory = internshipMandatory;
    }

    public boolean isPerformanceJob() {
        return performanceJob;
    }

    public void setPerformanceJob(boolean performanceJob) {
        this.performanceJob = performanceJob;
    }

    public boolean isOnCampus() {
        return onCampus;
    }

    public void setOnCampus(boolean onCampus) {
        this.onCampus = onCampus;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getMultipleOfferAllowed() {
        return multipleOfferAllowed;
    }

    public void setMultipleOfferAllowed(int multipleOfferAllowed) {
        this.multipleOfferAllowed = multipleOfferAllowed;
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

    public List<String> getCompaniesToBeExcluded() {
        return companiesToBeExcluded;
    }

    public void setCompaniesToBeExcluded(List<String> companiesToBeExcluded) {
        this.companiesToBeExcluded = companiesToBeExcluded;
    }

    public List<String> getCategoryAllowed() {
        return categoryAllowed;
    }

    public void setCategoryAllowed(List<String> categoryAllowed) {
        this.categoryAllowed = categoryAllowed;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
