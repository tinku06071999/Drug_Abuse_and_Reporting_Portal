package com.DrugAbusePrevention.Reporting.serviceRepository;

import com.DrugAbusePrevention.Reporting.entity.UserQuiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserQuizServiceRepository extends MongoRepository<UserQuiz, String> {
    UserQuiz findByUserId(String userId);
}
