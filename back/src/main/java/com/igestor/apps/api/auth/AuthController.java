package com.igestor.apps.api.auth;

import com.igestor.config.security.users.SecurityUserDetails;
import com.igestor.modules.auth.application.LoginUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final LoginUseCase loginUseCase;

  public AuthController(LoginUseCase loginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    SecurityUserDetails userDetails = loginUseCase.execute(
        request.email(),
        request.password());

    return ResponseEntity.ok(new LoginResponse(
        userDetails.user().email().value(),
        userDetails.user().fullName(),
        userDetails.user().role().name()));
  }
}
