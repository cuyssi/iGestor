package com.igestor.apps.api.auth;

import java.util.UUID;

public record MeResponse(
        UUID id,
        String email,
        String fullName,
        String role
) {
}
