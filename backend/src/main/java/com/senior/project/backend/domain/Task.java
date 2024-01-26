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

    @Transient
    private Milestone milestone;
}
