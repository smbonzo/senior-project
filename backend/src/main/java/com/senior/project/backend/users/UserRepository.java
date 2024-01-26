package com.senior.project.backend.users;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.senior.project.backend.domain.User;

import reactor.core.publisher.Mono;

/**
 * Repostory that interacts the the `user` table in the database
 * 
 * @author Jim Logan - jrl9984@rit.edu
 */
public interface UserRepository extends ReactiveCrudRepository<User, UUID> { 
    @Query("SELECT * FROM user AS u WHERE u.email = :email")
    public Mono<User> findUserByEmail(@Param("email") String email);
}
