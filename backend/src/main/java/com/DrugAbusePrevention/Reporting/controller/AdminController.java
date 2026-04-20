package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.EmployeeRequest;
import com.DrugAbusePrevention.Reporting.dto.JwtResponse;
import com.DrugAbusePrevention.Reporting.dto.LoginRequest;
import com.DrugAbusePrevention.Reporting.entity.Admin;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.jwt.JwtUtil;
import com.DrugAbusePrevention.Reporting.service.AdminService;
import com.DrugAbusePrevention.Reporting.service.EmployeeService;
import com.DrugAbusePrevention.Reporting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String employeeName = authentication.getName();
        EmployeeRequest emp = employeeService.findByEmployeeName(employeeName);
        if(emp.getRoles().contains("ADMIN")) {
            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            adminService.createAdmin(admin);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }

}

