package com.icl.repository;

import com.icl.domain.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface StatusRepository extends MongoRepository<Status, String> {
}
