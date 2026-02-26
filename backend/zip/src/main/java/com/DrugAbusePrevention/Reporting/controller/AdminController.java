package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.entity.Admin;
import com.DrugAbusePrevention.Reporting.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create_admin")
    public boolean createAdmin(@RequestBody Admin admin){
        adminService.createAdmin(admin);
        return true;
    }
}
