package com.senior.project.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.senior.project.backend.Activity.MilestoneDTO;
import lombok.*;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Generated
public class Milestone {
    @Id
    private Long id;

    private String name;
    
    @JsonIgnoreProperties("milestone")
    @Transient
    private List<Task> tasks = null;

    private YearLevel yearLevel;

    public MilestoneDTO toDTO() {
        return new MilestoneDTO(this.id, this.name, this.yearLevel);
    }
}


