package com.senior.project.backend.util;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Enum for endpoints in the system and if they are accessible
 */
public enum Endpoints {
    // Domain
    EVENTS(true, "events"),
    DASHBOARD_EVENTS(true,"dashboard_events"),
    MILSTONES(true,"milestones"),
    TASKS(true,"tasks"),
    RESUME(true, "portfolio", "resume"),

    // Security
    SIGNIN(true, "auth", "signin"),
    REFRESH(true, "auth", "refresh"),
    FAILURE(true, "auth", "fail"),

    // Test -- ONLY USE FOR UNIT TESTS --
    TEST_NEEDS_AUTH(true, "test", "yes"),
    TEST_NO_AUTH(false, "test", "no"),
    TEST_PATH_PARAM(false, "test", "{param}", "test");

    private List<String> segments;
    private boolean needsAuthentication;

    private Endpoints(boolean needsAuthentication, String... segments) {
        this.segments = Arrays.asList(segments);
        this.needsAuthentication = needsAuthentication;
    }

    //
    // Getters
    //

    public String uri() {
        StringBuilder sb = new StringBuilder();
        segments.stream().forEach((s) -> sb.append(s));
        return sb.toString();
    }

    public boolean getNeedsAuthentication() {
        return needsAuthentication;
    }

    //
    // Static
    //

    // The map of the path to the endpoint
    public static Map<String, Endpoints> stringToEndpoint = new HashMap<>() {{
        for (Endpoints e : Endpoints.values()) {
            put(e.uri(), e);
        }
    }};

    /**
     * Converts a string to the endpoint
     */
    public static Endpoints toEndpoint(String path) {
        return stringToEndpoint.get(path);
    }
}
