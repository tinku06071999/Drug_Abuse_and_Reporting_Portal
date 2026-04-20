package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.LoginRequest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.jwt.JwtUtil;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AppUserServiceRepository appUserServiceRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, AppUserServiceRepository appUserServiceRepository){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.appUserServiceRepository = appUserServiceRepository;
    }
    @PostMapping("/login")
    public ResponseEntity<?>login(@RequestBody LoginRequest request){
        System.out.println("AUTH LOGIN HIT");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        AppUser user = appUserServiceRepository.findByEmail(request.getEmail()).orElseThrow();

        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(token);

    }

}
