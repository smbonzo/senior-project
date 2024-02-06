package com.senior.project.backend.Activity;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.senior.project.backend.domain.Task;

import reactor.core.publisher.Flux;

public interface TaskRepository extends ReactiveCrudRepository<Task, Long> {
    @Query("SELECT * FROM task WHERE milestone_id = :milestone_id")
    Flux<Task> findByMilestoneID(@Param("milestone_id") long id); 
 }
