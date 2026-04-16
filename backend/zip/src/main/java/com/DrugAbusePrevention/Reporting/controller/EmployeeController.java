package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.EmployeeRequest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.service.EmployeeService;
import com.DrugAbusePrevention.Reporting.service.UserService;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private UserService userService;
    @Autowired
    private AppUserServiceRepository appUserServiceRepository;

    @GetMapping("/get-all-employees")
    public ResponseEntity<List<EmployeeRequest>>getAllEmployee(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        AppUser emp = appUserServiceRepository.findByEmail(email).orElseThrow();
        if(emp != null && emp.getRoles().contains("ADMIN")) {

            List<EmployeeRequest> list = employeeService.getAllEmployees();
            if (list != null) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }
    @PutMapping("/verify-employee/{id}")
    public ResponseEntity<Employee> verifyEmployee(@PathVariable String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        AppUser emp = appUserServiceRepository.findByEmail(email).orElseThrow();
        if (emp.getRoles().contains("ADMIN")) {
            try {
                Employee updated = employeeService.verifyEmployee(id);
                return ResponseEntity.ok(updated);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }

    @PutMapping("/make-admin/{id}")
    public ResponseEntity<Employee> makeAdmin(@PathVariable String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        AppUser emp = appUserServiceRepository.findByEmail(email).orElseThrow();
        if (emp.getRoles().contains("ADMIN")) {
            try {
                Employee updated = employeeService.makeAdmin(id);
                return ResponseEntity.ok(updated);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }

}
