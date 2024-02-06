package com.senior.project.backend.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Generated
public class User {
    @Id
    private UUID id;
	
	private String email;
	private String phoneNumber;

	private Date dateCreated;
	private Date lastLogin;
	private String firstName;
	private String lastName;
	private boolean canEmail;
	private boolean canText;
}
