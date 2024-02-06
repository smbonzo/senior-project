package com.senior.project.backend.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

import org.springframework.data.annotation.Id;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Generated
public class Submission {
	
	@Id
    private Long id;
	
	//@OneToOne(fetch = FetchType.EAGER)
    //@JoinColumn
    //private Task task;

	//@OneToOne(fetch = FetchType.EAGER)
    //@JoinColumn
    //private Artifact artifact;

	//@OneToOne(fetch = FetchType.EAGER)
    //@JoinColumn
    //private Student student;

	private Date submissionDate;
	private String comment;
}
