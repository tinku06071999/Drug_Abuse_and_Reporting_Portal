package com.DrugAbusePrevention.Reporting.serviceRepository;

import com.DrugAbusePrevention.Reporting.entity.Employee;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeServiceRepository extends MongoRepository<Employee, String> {
}
