package com.igestor.apps.api.auth;

import com.igestor.config.security.users.SecurityUserDetails;
import com.igestor.modules.auth.application.LoginUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.igestor.config.security.jwt.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final LoginUseCase loginUseCase;
  private final JwtService jwtService;

  public AuthController(
      LoginUseCase loginUseCase,
      JwtService jwtService) {
    this.loginUseCase = loginUseCase;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    Authentication authentication = loginUseCase.execute(
        request.email(),
        request.password());

    SecurityUserDetails userDetails = (SecurityUserDetails) authentication.getPrincipal();
    String accessToken = jwtService.createAccessToken(authentication);

    return ResponseEntity.ok(new LoginResponse(
        accessToken,
        "Bearer",
        userDetails.user().email().value(),
        userDetails.user().fullName(),
        userDetails.user().role().name()));
  }

  @GetMapping("/me")
  public ResponseEntity<MeResponse> me(@AuthenticationPrincipal SecurityUserDetails userDetails) {
    return ResponseEntity.ok(new MeResponse(
        userDetails.user().id().value(),
        userDetails.user().email().value(),
        userDetails.user().fullName(),
        userDetails.user().role().name()));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout() {
    return ResponseEntity.noContent().build();
  }
}
