package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.dto.AnxietyTestRequest;
import com.DrugAbusePrevention.Reporting.entity.AnxietyTest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.serviceRepository.AnxietyTestServiceRepository;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class AnxietyTestService {

    @Autowired
    private final AnxietyTestServiceRepository anxietyTestServiceRepository;
    @Autowired
    private final AppUserServiceRepository appUserServiceRepository;


   public AnxietyTestService(AnxietyTestServiceRepository anxietyRepo, AppUserServiceRepository appUserServiceRepository) {
        this.anxietyTestServiceRepository = anxietyRepo;
        this.appUserServiceRepository = appUserServiceRepository;
    }

    public List<AnxietyTest> getUserAllResult(String userId){

       List<AnxietyTest> anxietyTestList = anxietyTestServiceRepository.findAll().stream().filter(x -> x.getAppUser().getUserId().equals(userId)).toList();
       return  anxietyTestList;
   }
    public AnxietyTestRequest save(AnxietyTest anxietyTest, String email) {

        if (anxietyTest.getScore()== null || anxietyTest.getScore() < 0 || anxietyTest.getScore() > 63) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Score must be between 0 and 63");
        }

        AppUser user = appUserServiceRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        String level = computeLevel(anxietyTest.getScore());
        // Create entity
        AnxietyTest test = new AnxietyTest();
//        test.setUserId(user.getUserId());
        test.setScore(anxietyTest.getScore());
        test.setLevel(level);
        test.setDate(new Date());
        test.setAppUser(user);

        // Save
        AnxietyTest saved = anxietyTestServiceRepository.save(test);
        appUserServiceRepository.save(user);
        // Response DTO
        return new AnxietyTestRequest(
                saved.getUserId(),
                saved.getScore(),
                saved.getLevel(),
                iso(saved.getDate()),
                user.getUsername(),
                user.getEmail()
        );
    }

    private static String computeLevel(int score) {
        if (score >= 36) return "Potentially concerning levels of anxiety";
        if (score >= 22) return "Moderate anxiety";
        return "Low anxiety";
    }

    private static String iso(Date d) {
        return DateTimeFormatter.ISO_INSTANT.format(Instant.ofEpochMilli(d.getTime()).atOffset(ZoneOffset.UTC));
    }
    public AnxietyTest findBYId(String userId){

         AnxietyTest anxietyTest= anxietyTestServiceRepository.findById(userId).orElseThrow();
         return anxietyTest;
    }
}