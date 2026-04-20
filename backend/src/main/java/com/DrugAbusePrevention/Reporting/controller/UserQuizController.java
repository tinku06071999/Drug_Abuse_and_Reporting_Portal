package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.UserRequest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.UserQuiz;
import com.DrugAbusePrevention.Reporting.service.UserQuizService;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-quiz")
public class UserQuizController {
    @Autowired
    private UserQuizService userQuizService;
    @Autowired
    private AppUserServiceRepository appUserServiceRepository;

    @Transactional
    @PostMapping("/save-quiz")
    public ResponseEntity<?>saveUserQuiz(@RequestBody UserQuiz userQuiz){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null){
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
        String email = authentication.getName();
        AppUser user = appUserServiceRepository.findByEmail(email).orElseThrow();
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userQuizService.saveQuiz(userQuiz,user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/get-quiz-result")
    public ResponseEntity<?>getQuizResult(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null){
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
        String email = authentication.getName();

        AppUser user = appUserServiceRepository.findByEmail(email).orElseThrow();
        if(user==null){
            return new ResponseEntity<>("User not found",HttpStatus.BAD_REQUEST);
        }

        List<UserQuiz> result = userQuizService.getQuizResult(user.getUserId());
        if(result == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
