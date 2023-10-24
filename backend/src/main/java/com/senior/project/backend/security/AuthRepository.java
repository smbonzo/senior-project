package com.senior.project.backend.security;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.senior.project.backend.security.domain.LoginResponse;
import com.senior.project.backend.security.domain.TempUser;

import reactor.core.publisher.Mono;

@Component
public class AuthRepository {
    private static final Map<String, TempUser> DATA = new HashMap<String, TempUser>();
    private static final List<TempUser> USERS = new LinkedList<>();

    public static final TempUser tempUser1;
    public static final TempUser tempUser2;

    static {
        tempUser1 = new TempUser("Test User", "testuser@test.com", "faculty");
        tempUser2 = new TempUser("Test User 2", "testuser@test.com", "user");

        USERS.add(tempUser1);
        USERS.add(tempUser2);
    }

    public TempUser findUserByEmail(String email) {
        for (TempUser user : USERS) {
            if (user.email.equals(email)) return user;
        }
        return null;
    }

    public Mono<LoginResponse> addToken(String token) { // Token should be verified by now
        String email = "testuser@test.com"; // Get from token
        TempUser user = findUserByEmail(email);
        DATA.put(token, user);
        return Mono.just(new LoginResponse(token, user));
    }
}