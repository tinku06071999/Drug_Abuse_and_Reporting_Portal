package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "employees")
@Getter
@Setter
public class Employee {
    @Id
    private String employeeId;
    @NonNull
    private String employeeName;
    @NonNull
    private String employeePassword;
    @NonNull
    private String employeeEmail;
    @NonNull
    private String employeeTodayLocation;
    @NonNull
    private String employeeMobile;
    private List<String> roles;
    private Boolean verified = false;
}
