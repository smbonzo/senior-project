package com.senior.project.backend.Activity;

import com.senior.project.backend.domain.Milestone;
import com.senior.project.backend.domain.Task;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    public MilestoneService(
        MilestoneRepository milestoneRepository,
        TaskRepository taskRepository    
    ) {
        this.milestoneRepository = milestoneRepository;
        this.taskRepository = taskRepository;
    }

    public Flux<Milestone> all() {
        return milestoneRepository.findAll();
    }

    public Flux<Milestone> allWithTasks() {
        // Note: We cannot do joins with this, as the database will be blocked if we attempt to do so
        // Instead the task list is a transitory property that we fetch once from the database,
        // and is then filtered to the tasks belonging to the specific milestone. This way
        // the database only needs to be called once

        Flux<List<Task>> tasks = taskRepository.findAll()
            .collectList()
            .cache()
            .repeat();
        
        return Flux.zip(milestoneRepository.findAll(), tasks, (milestone, taskList) -> {
            milestone.setTasks(taskList.stream()
                .filter((t) -> t.getMilestoneID() == milestone.getId())
                .toList()
            );
            return milestone;
        });
    }
}
