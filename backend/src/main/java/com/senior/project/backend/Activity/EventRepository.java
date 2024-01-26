package com.senior.project.backend.Activity;
import com.senior.project.backend.domain.Event;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends ReactiveCrudRepository<Event, Long> {
    // additional query methods if needed
}
