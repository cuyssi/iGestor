package com.igestor.devtools.users;

import com.igestor.modules.users.application.CreateInitialAdminUserUseCase;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class UserDevSeeder implements ApplicationRunner {

    private final CreateInitialAdminUserUseCase createInitialAdminUserUseCase;

    public UserDevSeeder(CreateInitialAdminUserUseCase createInitialAdminUserUseCase) {
        this.createInitialAdminUserUseCase = createInitialAdminUserUseCase;
    }

    @Override
    public void run(ApplicationArguments args) {
        createInitialAdminUserUseCase.execute(
                "admin@igestor.local",
                "$2a$10$yLjxw1oA7F7vqB8h3rddQumVnVo8I6zYcr9mR7cdD.Kh0jrg0Yv2a",
                "Admin iGestor"
        );
    }
}
