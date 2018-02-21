package com.icl.repository;

import com.icl.domain.Course;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends MongoRepository<Course, String> {

}
