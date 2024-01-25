package com.senior.project.backend.users;

import java.util.UUID;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

/**
 * Repostory that interacts the the `user` table in the database
 * 
 * @author Jim Logan - jrl9984@rit.edu
 */
public interface UserRepository extends ReactiveCrudRepository<User, UUID> { }
