package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.serviceRepository.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class EmployeeDetailsServiceIml implements UserDetailsService {

    @Autowired
    private UserServiceRepository userServiceRepository;
    @Autowired
    private EmployeeService employeeService;

    @Override
    public UserDetails loadUserByUsername(String employeeName) throws UsernameNotFoundException {
        Employee emp = employeeService.findByEmployeeName(employeeName);
        if(emp != null){
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(emp.getEmployeeName())
                    .password(emp.getEmployeePassword())
                    .roles(emp.getRoles().toArray(new String[0]))
                    .build();
            return userDetails;
        }
        throw new UsernameNotFoundException("User not found with username: "+ employeeName);
    }

}
