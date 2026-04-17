package com.DrugAbusePrevention.Reporting.dto;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.util.List;

@Getter
@Setter
public class EmployeeRequest {

    private String userId;
    private String username;
    private String email;
    private String password;
    private String mobile;
    private List<String>roles;
    private Boolean verified = false;

    public EmployeeRequest(String userId,String username, String email, String password, String mobile,List<String> roles, Boolean verified) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.roles = roles;
        this.verified = verified;
    }
}