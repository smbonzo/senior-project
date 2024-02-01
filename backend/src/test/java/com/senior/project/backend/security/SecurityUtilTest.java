package com.senior.project.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.senior.project.backend.Constants;
import com.senior.project.backend.domain.User;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import reactor.util.context.Context;

public class SecurityUtilTest {
    @Test
    public void getUserHappy() {
        Authentication authentication = 
            new UsernamePasswordAuthenticationToken(Constants.user1, "", Constants.user1.getAuthorities());
        Context context = ReactiveSecurityContextHolder.withAuthentication(authentication);
        Mono<User> res = SecurityUtil.getCurrentUser().contextWrite(context);


        StepVerifier.create(res)
            .expectNext(Constants.user1)
            .expectComplete()
            .verify();
    }

    @Test
    public void getUser() {
        Mono<User> res = SecurityUtil.getCurrentUser().contextWrite(ReactiveSecurityContextHolder.withSecurityContext(Mono.just(new SecurityContextImpl())));


        StepVerifier.create(res)
            .expectError(UsernameNotFoundException.class)
            .verify();
    }
}