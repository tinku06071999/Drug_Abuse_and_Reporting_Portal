package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
@Getter
@Setter
public class Admin {

    @Id
    private ObjectId id;
    @NonNull
    private String email;
    @NonNull
    private String password;
}
