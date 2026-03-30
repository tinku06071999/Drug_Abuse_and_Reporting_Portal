package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.serviceRepository.EmployeeServiceRepository;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeService {
    private static final Logger log = LoggerFactory.getLogger(EmployeeService.class);
    @Autowired
    private EmployeeServiceRepository employeeServiceRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private static final PasswordEncoder passwordEncode = new BCryptPasswordEncoder();

    public boolean saveNewEmployee(Employee employee){
        employee.setEmployeePassword(passwordEncode.encode(employee.getEmployeePassword()));
        employeeServiceRepository.save(employee);
        String to = employee.getEmployeeEmail();
        String subject = "Registration for portal";
        String body = "Hello, we received your registration for the portal. Once the administration verify it you will receive the email.";
        emailService.sendSaveEmployeeEmail(to,subject,body);
        return true;
    }
    public boolean saveEmployee(Employee employee){
        employeeServiceRepository.save(employee);
        String to = employee.getEmployeeEmail();
        String subject = "Registration for portal";
        String body = "Hello, we received your registration for the portal. Once the administration verify it you will receive the email.";
        emailService.sendSaveEmployeeEmail(to,subject,body);
        return true;
    }
    public List<Employee> getAllEmployees(){
        return employeeServiceRepository.findAll();
    }

    public Employee verifyEmployee(String id) {

        Employee emp = employeeServiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + id));

        boolean newStatus = !Boolean.TRUE.equals(emp.getVerified());
        emp.setVerified(newStatus);
        emp = employeeServiceRepository.save(emp);

        // setting up things to send the verification mail
        String email = emp.getEmployeeEmail();
        String subject = "You verification status with DAPRP.";
        String body = "";
        if(emp.getVerified()){
         body = "Hello, " + emp.getEmployeeName() + " /n Congratulations! you are now a verified team member of our mission.";
        }else{
            body = "Hello, " + emp.getEmployeeName() + " /n regret to inform you that you will not be a part of our team.";

        }

        emailService.sendStatusOfVerifactionChangemail(email,subject,body);
        return emp;
    }
    public Employee makeAdmin(String id) {

        Employee emp = employeeServiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + id));
        boolean newStatus = !emp.getRoles().contains("ADMIN");
        emp.setRoles(List.of("ADMIN"));
        emp = employeeServiceRepository.save(emp);

        // setting up things to send the verification mail
        String email = emp.getEmployeeEmail();
        String subject = "Congratulations! ADMIN of DAPRP.";
        String body = "";
        if(emp.getRoles().contains("ADMIN")){
            body = "Hello, " + emp.getEmployeeName() + " /n Congratulations! you are now an admin of DAPRP Portal.";
        }else{
            body = "Hello, " + emp.getEmployeeName() + " /n regret to inform you that you will not be a part of our admin team.";

        }

        emailService.sendAdminEmail(email,subject,body);
        return emp;
    }
  public Employee findByEmployeeName(String employeeName){
        return employeeServiceRepository.findByEmployeeName(employeeName).orElse(null);
  }

}


