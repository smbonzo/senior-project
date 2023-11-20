package com.senior.project.backend.security.domain;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import com.senior.project.backend.domain.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@ToString
@Builder
@AllArgsConstructor
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID sessionID;

    private User user;
    private Date signInDate;
    private Date expiryDate;
    private Date lastUsed;

    public boolean isExpired() {
        // Date now = Date.from(Instant.now());
        // return now.after(expiryDate) || now.equals(expiryDate);
        return true;
    }

    public boolean isInRefreshRange() {
        Date now = Date.from(Instant.now());
        Date hourBeforeExpiry = Date.from(expiryDate.toInstant().minusSeconds(3600));
        return hourBeforeExpiry.before(now) && expiryDate.after(now);
    }

    public void update() {
        lastUsed = Date.from(Instant.now());
    }
}
