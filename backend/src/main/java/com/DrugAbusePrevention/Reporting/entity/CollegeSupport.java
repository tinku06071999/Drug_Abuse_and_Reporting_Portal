package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student_support")
@Getter
@Setter
public class CollegeSupport {
    @Id
    private ObjectId id;

    @NonNull
    private String name;

    @NonNull
    private String email;

    @NonNull
    private String phone;

    @NonNull
    private String rollNumber;

    @NonNull
    private String message;
}
