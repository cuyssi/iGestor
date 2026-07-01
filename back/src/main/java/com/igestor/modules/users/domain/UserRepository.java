package com.igestor.modules.users.domain;

import java.util.Optional;

public interface UserRepository {

    User save(User user);

    Optional<User> findByEmail(Email email);

    boolean existsByEmail(Email email);
}
