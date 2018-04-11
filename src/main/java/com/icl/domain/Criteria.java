package com.icl.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Criteria {

    private String batch;

    private String courseType;

    private Set<Course> courses = new HashSet<>();

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

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
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
        return "Criteria{" +
            "batch='" + batch + '\'' +
            ", courseType='" + courseType + '\'' +
            ", courses=" + courses +
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


