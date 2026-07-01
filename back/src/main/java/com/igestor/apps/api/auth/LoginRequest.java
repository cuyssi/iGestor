package com.igestor.apps.api.auth;

public record LoginRequest(
        String email,
        String password
) {
}
