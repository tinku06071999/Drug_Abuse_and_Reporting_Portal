package com.DrugAbusePrevention.Reporting.controller;


import com.DrugAbusePrevention.Reporting.dto.JwtResponse;
import com.DrugAbusePrevention.Reporting.dto.LoginRequest;
import com.DrugAbusePrevention.Reporting.dto.UserRequest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.jwt.JwtUtil;
import com.DrugAbusePrevention.Reporting.service.UserService;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AppUserServiceRepository appUserServiceRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/ping")
    public String ping() {
        return "users controller working";
    }

    @GetMapping("/get-user-details")
    public ResponseEntity<UserRequest> getUserDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        AppUser appUser = appUserServiceRepository.findByEmail(email).orElseThrow();
        UserRequest user = userService.findByUsername(appUser.getUsername());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("get-user-name")
    public ResponseEntity<?> getUserName(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        AppUser user = appUserServiceRepository.findByEmail(email).orElseThrow();
        if(user != null){
            String name = user.getUsername();
            return new ResponseEntity<>(name,HttpStatus.OK);
        }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("user-reports")
    public ResponseEntity<?> getReports(){
        return new ResponseEntity<>("NO reports", HttpStatus.OK);
    }

}
