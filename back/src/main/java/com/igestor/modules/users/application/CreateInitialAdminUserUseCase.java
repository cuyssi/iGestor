package com.igestor.modules.users.application;

import com.igestor.modules.users.domain.Email;
import com.igestor.modules.users.domain.PasswordHash;
import com.igestor.modules.users.domain.User;
import com.igestor.modules.users.domain.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CreateInitialAdminUserUseCase {

    private final UserRepository userRepository;

    public CreateInitialAdminUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void execute(
            String email,
            String passwordHash,
            String fullName
    ) {
        Email adminEmail = new Email(email);

        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User admin = User.createAdmin(
                adminEmail,
                new PasswordHash(passwordHash),
                fullName
        );

        userRepository.save(admin);
    }
}
