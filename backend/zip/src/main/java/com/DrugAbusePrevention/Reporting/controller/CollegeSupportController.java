package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.entity.CollegeSupport;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.service.CollegeSupportService;
import com.DrugAbusePrevention.Reporting.service.EmployeeService;
import com.DrugAbusePrevention.Reporting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/college-support")
public class CollegeSupportController {
    @Autowired
    private CollegeSupportService collegeSupportService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/get-all-responses")
    public ResponseEntity<List<CollegeSupport>> getAllResponses(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String employeeName = authentication.getName();
        List<String>roles = employeeService.findByEmployeeName(employeeName).getRoles();
        if(roles.contains("ADMIN")) {
            List<CollegeSupport> list = collegeSupportService.getAllResponses();
            if (list != null) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            }
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }
}
