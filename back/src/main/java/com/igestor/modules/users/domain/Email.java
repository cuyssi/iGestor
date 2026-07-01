package com.igestor.modules.users.domain;

public record Email(String value) {

    public Email {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (!value.contains("@")) {
            throw new IllegalArgumentException("Email must be valid");
        }

        value = value.trim().toLowerCase();
    }
}
