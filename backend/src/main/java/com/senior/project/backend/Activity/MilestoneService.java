package com.senior.project.backend.Activity;

import com.senior.project.backend.domain.Milestone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;
    private final Logger logger = LoggerFactory.getLogger(MilestoneService.class);

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
        Flux<Milestone> milestones = milestoneRepository.findAll(); // For each milestone, retrieve its tasks
    }
}
