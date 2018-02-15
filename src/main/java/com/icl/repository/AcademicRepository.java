package com.icl.repository;

import com.icl.domain.Academic;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Academic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcademicRepository extends MongoRepository<Academic, String> {

}
