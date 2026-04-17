package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "app_users")
@Getter
@Setter
public class AppUser {
    @NonNull
    @Id
    private String userId;
    @NonNull
    private String username;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String mobile;
    private List<String> roles;

    public AppUser(String userId,String username, String email, String password, String mobile, List<String> roles) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.roles = roles;
    }
}
