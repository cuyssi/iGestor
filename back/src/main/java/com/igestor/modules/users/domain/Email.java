package com.igestor.modules.users.domain;

public record Email(String value) {

  public Email {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException("Email is required");
    }

    value = value.trim().toLowerCase();

    int at = value.indexOf('@');
    if (at <= 0 || at != value.lastIndexOf('@') || at == value.length() - 1) {
      throw new IllegalArgumentException("Email must be valid");
    }
  }
}
