package com.senior.project.backend.Activity;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.senior.project.backend.domain.Task;

public interface TaskRepository extends ReactiveCrudRepository<Task, Long> { }
