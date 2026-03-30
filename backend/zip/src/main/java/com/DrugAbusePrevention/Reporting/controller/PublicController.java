package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.entity.CollegeSupport;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.entity.Report;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.service.CollegeSupportService;
import com.DrugAbusePrevention.Reporting.service.EmployeeService;
import com.DrugAbusePrevention.Reporting.service.ReportService;
import com.DrugAbusePrevention.Reporting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private UserService userService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private CollegeSupportService collegeSupportService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //signup user
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signUp(@RequestBody User user){
        try{
            userService.signup(user);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    // saving the report
    @PostMapping("/save-report")
    public ResponseEntity<Boolean> saveReport(@RequestBody Report report){
        try{
            reportService.saveReport(report);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //creating employee
    @PostMapping("/save-employee")
    public ResponseEntity<Boolean>saveEmployee(@RequestBody Employee employee){
        try{
            employee.setRoles(employee.getRoles());
            employeeService.saveNewEmployee(employee);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    //college support

    @PostMapping("/save-response")
    public ResponseEntity saveResponse(@RequestBody CollegeSupport collegeSupport){
        try {
            collegeSupportService.saveResponse(collegeSupport);
            return new ResponseEntity(collegeSupport, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
