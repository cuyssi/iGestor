package com.igestor.apps.api.auth;

public record LoginResponse(
        String accessToken,
        String tokenType,
        String email,
        String fullName,
        String role
) {
}
