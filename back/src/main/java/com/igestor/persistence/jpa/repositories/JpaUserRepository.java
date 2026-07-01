package com.igestor.persistence.jpa.repositories;

import com.igestor.modules.users.domain.Email;
import com.igestor.modules.users.domain.User;
import com.igestor.modules.users.domain.UserRepository;
import com.igestor.persistence.jpa.mappers.UserJpaMapper;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class JpaUserRepository implements UserRepository {

    private final SpringDataUserJpaRepository repository;
    private final UserJpaMapper mapper;

    public JpaUserRepository(
            SpringDataUserJpaRepository repository,
            UserJpaMapper mapper
    ) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public User save(User user) {
        return mapper.toDomain(repository.save(mapper.toEntity(user)));
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return repository.findByEmail(email.value())
                .map(mapper::toDomain);
    }

    @Override
    public boolean existsByEmail(Email email) {
        return repository.existsByEmail(email.value());
    }
}
