package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.Admin;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.serviceRepository.AdminServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdminService {

    @Autowired
    private AdminServiceRepository adminServiceRepository;

    public boolean createAdmin(Admin admin){
        adminServiceRepository.save(admin);
        return true;
    }

}
