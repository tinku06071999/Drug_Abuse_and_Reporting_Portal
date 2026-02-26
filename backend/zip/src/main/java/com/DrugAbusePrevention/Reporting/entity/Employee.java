package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employees")
@Getter
@Setter
public class Employee {
    @Id
    private String employeeId;

    @NonNull
    private String name;

    @NonNull
    private String todayLocation;
    @NonNull
    private String post;
    @NonNull
    private String mobile;
    @NonNull
    private String email;
    private Boolean verified = false;
}
