package com.senior.project.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public RouterFunction<ServerResponse> routes(PostHandler postHandler) {
        return route(GET("/posts"), postHandler::all)
                .andRoute(POST("/posts"), postHandler::create)
                .andRoute(GET("/posts/{id}"), postHandler::get);
//                .andRoute(PUT("/posts/{id}"), postHandler::update)
//                .andRoute(DELETE("/posts/{id}"), postHandler::delete);
    }

}