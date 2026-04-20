package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document("user-quiz")
@Getter
@Setter
public class UserQuiz {
    @Id
    private String userId;
    private Integer meditationMinutes;
    private Integer exerciseMinutes;
    private Integer sleepHours;
    private String sober;
    private LocalDateTime date;
    @DBRef
    AppUser appUser;
}
