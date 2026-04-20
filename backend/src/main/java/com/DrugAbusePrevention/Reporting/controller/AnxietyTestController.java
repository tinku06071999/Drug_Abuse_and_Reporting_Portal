package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.AnxietyTestRequest;
import com.DrugAbusePrevention.Reporting.entity.AnxietyTest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.service.AnxietyTestService;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anxiety-tests")
public class AnxietyTestController {

    @Autowired
    private AnxietyTestService anxietyTestService;

    @Autowired
    AppUserServiceRepository appUserServiceRepository;

    @Transactional
    @PostMapping("save-test-report")
    public ResponseEntity<?> saveTestReport(@RequestBody AnxietyTest anxietyTest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        authentication.getDetails();
        try{
            anxietyTestService.save(anxietyTest,email);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get-all-results")
    public ResponseEntity<List<AnxietyTest>> getUserAllResults(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null){
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
        String email = authentication.getName();
        AppUser user = appUserServiceRepository.findByEmail(email).orElseThrow();
        if(user == null){
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<AnxietyTest> userResult = anxietyTestService.getUserAllResult(user.getUserId());

        return new ResponseEntity<>(userResult,HttpStatus.OK);

    }
}