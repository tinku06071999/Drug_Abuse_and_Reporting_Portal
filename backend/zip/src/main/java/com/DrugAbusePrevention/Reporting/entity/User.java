package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;

@Document(collection = "users")
@Getter
@Setter
public class User {
    private ObjectId id;
    private String name;
    private String email;
    private String password;
}
