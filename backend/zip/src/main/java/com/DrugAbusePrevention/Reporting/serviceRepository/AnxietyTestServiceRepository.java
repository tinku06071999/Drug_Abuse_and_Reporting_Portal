package com.DrugAbusePrevention.Reporting.serviceRepository;

import com.DrugAbusePrevention.Reporting.entity.AnxietyTest;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnxietyTestServiceRepository extends MongoRepository<AnxietyTest, ObjectId> {
}
