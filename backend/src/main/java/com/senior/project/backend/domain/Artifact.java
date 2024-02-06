package com.senior.project.backend.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.Id;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Generated
public class Artifact {
    @Id
    private Long id;

    private String name;
    private String fileLocation;
}
