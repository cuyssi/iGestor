package com.igestor.apps.api.auth;

public record LoginResponse(
        String email,
        String fullName,
        String role
) {
}
