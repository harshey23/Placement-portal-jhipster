package com.icl.repository;

import com.icl.domain.*;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.Instant;
import java.util.Set;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneByEmailIgnoreCase(String email);

    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    Optional<User> findOneByLogin(String login);

    Page<User> findAllByLoginNot(Pageable pageable, String login);

    Page<User> findAllByAuthorities(Pageable pageable, Set<Authority> authority);

    Page<User> findAllByBatch(Pageable pageable, Batch batch);

    Page<User> findAllByBatchAndCourse(Pageable pageable, Batch batch, Course course);

//    Page<User> findAllByBatchAndCompany(Pageable pageable, Batch batch, Company company);

}
