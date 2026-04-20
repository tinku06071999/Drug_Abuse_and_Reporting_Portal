package com.DrugAbusePrevention.Reporting.dto;

import com.DrugAbusePrevention.Reporting.entity.AppUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Getter
@Setter
public class AnxietyTestRequest {
        private String userId;
        private Integer score;
        private String level;
        private String date;
        private String username;
        private String email;
        @DBRef
        private AppUser appUser;
        public AnxietyTestRequest(String userId, Integer score, String level, String date, String username, String email){
                this.userId = userId;
                this.score = score;
                this.level = level;
                this.date = date;
                this.username = username;
                this.email = email;
        }
}