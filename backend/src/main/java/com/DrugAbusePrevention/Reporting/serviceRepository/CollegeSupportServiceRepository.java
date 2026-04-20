package com.DrugAbusePrevention.Reporting.serviceRepository;

import com.DrugAbusePrevention.Reporting.entity.CollegeSupport;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CollegeSupportServiceRepository extends MongoRepository<CollegeSupport, ObjectId> {
}
