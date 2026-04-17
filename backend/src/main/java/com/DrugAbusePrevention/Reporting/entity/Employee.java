package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "employees")
@Getter
@Setter
public class Employee {
    @Id
    private String userId;
    private Boolean verified = false;
    @DBRef
    private AppUser appUser;
    public Employee(String userId, Boolean verified){
        this.userId = userId;
        this.verified = verified;

    }
}
