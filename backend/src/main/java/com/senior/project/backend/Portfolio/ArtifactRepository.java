package com.senior.project.backend.Portfolio;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import com.senior.project.backend.domain.Artifact;

public interface ArtifactRepository extends ReactiveCrudRepository<Artifact, Long> {
    // Additional query methods if needed
 }
