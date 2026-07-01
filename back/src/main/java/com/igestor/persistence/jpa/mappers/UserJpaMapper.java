package com.igestor.persistence.jpa.mappers;

import com.igestor.modules.users.domain.Email;
import com.igestor.modules.users.domain.PasswordHash;
import com.igestor.modules.users.domain.User;
import com.igestor.modules.users.domain.UserId;
import com.igestor.persistence.jpa.entities.UserJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class UserJpaMapper {

    public UserJpaEntity toEntity(User user) {
        return new UserJpaEntity(
                user.id().value(),
                user.email().value(),
                user.passwordHash().value(),
                user.fullName(),
                user.role(),
                user.enabled()
        );
    }

    public User toDomain(UserJpaEntity entity) {
        return new User(
                new UserId(entity.getId()),
                new Email(entity.getEmail()),
                new PasswordHash(entity.getPasswordHash()),
                entity.getFullName(),
                entity.getRole(),
                entity.isEnabled()
        );
    }
}
