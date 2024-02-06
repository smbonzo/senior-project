package com.senior.project.backend.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Generated
public class Task {
    @Id
    private Long id;
    private String name;
    private String description;
    private Boolean isRequired;
    private YearLevel yearLevel;
    private String taskType;
    private String artifactName;

    @Transient
    private Milestone milestone;

    //@OneToOne(fetch = FetchType.EAGER)
    //@JoinColumn
    //private Event event;
}
