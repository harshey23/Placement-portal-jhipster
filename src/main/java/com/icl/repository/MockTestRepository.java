package com.icl.repository;

import com.icl.domain.MockTest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface MockTestRepository extends MongoRepository<MockTest, String> {

}

