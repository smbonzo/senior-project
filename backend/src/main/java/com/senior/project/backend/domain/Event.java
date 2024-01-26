package com.senior.project.backend.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

import org.springframework.data.annotation.Id;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Generated
public class Event {
    @Id
    private Long id;
    private Boolean isRequired;
    private String name;
    private String description;
    private Date date;

}
