package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Getter
@Setter
public class User {
    @Id
    private String userId;
    private String department;
    @DBRef
    private AppUser appUser;

    public User(String userid, String department){
        this.userId = userId;
        this.department = department;
    }
}
