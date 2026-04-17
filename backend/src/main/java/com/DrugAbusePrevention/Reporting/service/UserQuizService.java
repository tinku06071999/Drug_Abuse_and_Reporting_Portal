package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.UserQuiz;
import com.DrugAbusePrevention.Reporting.serviceRepository.UserQuizServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Component
public class UserQuizService {

    @Autowired
    private UserQuizServiceRepository userQuizServiceRepository;

    public void saveQuiz(UserQuiz userQuiz, AppUser user){
        userQuiz.setDate(LocalDateTime.now());
        userQuiz.setAppUser(user);
        userQuizServiceRepository.save(userQuiz);
    }
    public List<UserQuiz> getQuizResult(String userId){
       return userQuizServiceRepository.findAll().stream().filter(x -> x.getAppUser().getUserId().equals(userId)).toList();
    }
}
