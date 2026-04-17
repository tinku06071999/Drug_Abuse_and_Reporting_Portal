//package com.DrugAbusePrevention.Reporting.service;
//
//
//import com.DrugAbusePrevention.Reporting.entity.Employee;
//import com.DrugAbusePrevention.Reporting.serviceRepository.EmployeeServiceRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//@Component
//public class EmployeeDetailsServiceImpl implements UserDetailsService {
//
//    @Autowired
//    private EmployeeServiceRepository employeeServiceRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username){
//        Employee emp = employeeServiceRepository.findByEmployeeName(username).orElseThrow(() -> new UsernameNotFoundException("Employee not found"));
//        return
//                org.springframework.security.core.userdetails.User.builder()
//                        .username(emp.getEmployeeName())
//                        .password(emp.getEmployeePassword())
//                        .roles(emp.getRoles().toArray(new String[0]))
//                        .build();
//    }
//
//
//
//}
