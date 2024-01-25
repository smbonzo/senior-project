package com.senior.project.backend.Activity;
import com.senior.project.backend.domain.Milestone;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends ReactiveCrudRepository<Milestone, Long> { 
    
}
