package com.DrugAbusePrevention.Reporting.serviceRepository;

import com.DrugAbusePrevention.Reporting.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserServiceRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);
}
