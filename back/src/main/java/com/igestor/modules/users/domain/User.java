package com.igestor.modules.users.domain;

public class User {

    private final UserId id;
    private final Email email;
    private final PasswordHash passwordHash;
    private final String fullName;
    private final UserRole role;
    private final boolean enabled;

    public User(
            UserId id,
            Email email,
            PasswordHash passwordHash,
            String fullName,
            UserRole role,
            boolean enabled
    ) {
        if (id == null) {
            throw new IllegalArgumentException("User id is required");
        }

        if (email == null) {
            throw new IllegalArgumentException("Email is required");
        }

        if (passwordHash == null) {
            throw new IllegalArgumentException("Password hash is required");
        }

        if (fullName == null || fullName.isBlank()) {
            throw new IllegalArgumentException("Full name is required");
        }

        if (role == null) {
            throw new IllegalArgumentException("User role is required");
        }

        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName.trim();
        this.role = role;
        this.enabled = enabled;
    }

    public static User createAdmin(
            Email email,
            PasswordHash passwordHash,
            String fullName
    ) {
        return new User(
                UserId.newId(),
                email,
                passwordHash,
                fullName,
                UserRole.ADMIN,
                true
        );
    }

    public UserId id() {
        return id;
    }

    public Email email() {
        return email;
    }

    public PasswordHash passwordHash() {
        return passwordHash;
    }

    public String fullName() {
        return fullName;
    }

    public UserRole role() {
        return role;
    }

    public boolean enabled() {
        return enabled;
    }
}
