package com.senior.project.backend.Activity;

import com.senior.project.backend.domain.Task;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) { this.taskRepository = taskRepository;}
    public Flux<Task> all() {
        return taskRepository.findAll();
    }
}
