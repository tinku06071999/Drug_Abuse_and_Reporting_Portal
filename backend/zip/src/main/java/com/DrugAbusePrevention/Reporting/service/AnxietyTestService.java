package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.dto.AnxietyTestCreateRequest;
import com.DrugAbusePrevention.Reporting.dto.AnxietyTestResponse;
import com.DrugAbusePrevention.Reporting.entity.AnxietyTest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.serviceRepository.AnxietyTestServiceRepository;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import com.DrugAbusePrevention.Reporting.serviceRepository.UserServiceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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

    public AnxietyTestResponse create(AnxietyTestCreateRequest req) {

        if (req.score() == null || req.score() < 0 || req.score() > 63) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Score must be between 0 and 63");
        }

        // Find user by userId (preferred) or by email
        AppUser user = null;
        if (req.userId() != null && !req.userId().isBlank()) {
            if (!ObjectId.isValid(req.userId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid userId (ObjectId expected)");
            }
            user = appUserServiceRepository.findById(req.userId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found by userId"));
        } else if (req.email() != null && !req.email().isBlank()) {
            user = appUserServiceRepository.findByEmail(req.email())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found by email"));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide either userId or email");
        }

        // Compute level on server (don’t trust client)
        String level = computeLevel(req.score());

        // Create entity
        AnxietyTest test = new AnxietyTest();
        test.setScore(req.score());
        test.setLevel(level);
        test.setDate(new Date());
        test.setAppUser(user);

        // Save
        AnxietyTest saved = anxietyTestServiceRepository.save(test);

        // Response DTO
        return new AnxietyTestResponse(
                saved.getId().toHexString(),
                saved.getScore(),
                saved.getLevel(),
                iso(saved.getDate()),
                user.getUserId() != null ? user.getUserId() : null,
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
}