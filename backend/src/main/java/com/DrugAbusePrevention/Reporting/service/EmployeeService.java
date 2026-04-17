package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.dto.EmployeeRequest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import com.DrugAbusePrevention.Reporting.serviceRepository.EmployeeServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class EmployeeService {
    private static final Logger log = LoggerFactory.getLogger(EmployeeService.class);
    @Autowired
    private EmployeeServiceRepository employeeServiceRepository;
    @Autowired
    private AppUserServiceRepository appUserServiceRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncode ;

    @Transactional
    public boolean saveNewEmployee(EmployeeRequest employeeRequest){

        employeeRequest.setPassword(passwordEncode.encode(employeeRequest.getPassword()));

        appUserServiceRepository.save(
                new AppUser(
                        employeeRequest.getUserId(),
                        employeeRequest.getUsername(),
                        employeeRequest.getEmail(),
                        employeeRequest.getPassword(),
                        employeeRequest.getMobile(),
                        employeeRequest.getRoles()));

        employeeServiceRepository.save(new Employee(employeeRequest.getUserId(),
                                        employeeRequest.getVerified()));

        String to = employeeRequest.getEmail();
        String subject = "Registration for portal";
        String body = "Hello, we received your registration for the portal. Once the administration verify it you will receive the email.";
        emailService.sendSaveEmployeeEmail(to,subject,body);
        return true;
    }
    @Transactional
    public boolean saveEmployee(EmployeeRequest employeeRequest){
        appUserServiceRepository.save(
                new AppUser(employeeRequest.getUserId(),
                        employeeRequest.getUsername(),
                        employeeRequest.getEmail(),
                        employeeRequest.getPassword(),
                        employeeRequest.getMobile(),
                        employeeRequest.getRoles()));

        employeeServiceRepository.save(new Employee(employeeRequest.getUserId(),

                employeeRequest.getVerified()));

        String to = employeeRequest.getEmail();
        String subject = "Registration for portal";
        String body = "Hello, we received your registration for the portal. Once the administration verify it you will receive the email.";
        emailService.sendSaveEmployeeEmail(to,subject,body);
        return true;
    }

    public List<EmployeeRequest> getAllEmployees(){
        List<Employee> employees= employeeServiceRepository.findAll();

        return employees.stream().map(emp -> {

            AppUser user = appUserServiceRepository.findById(emp.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return new EmployeeRequest(
                    emp.getUserId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getMobile(),
                    user.getRoles(),
                    emp.getVerified()
            );

        }).toList();
    }

    @Transactional
    public Employee verifyEmployee(String id) {

        Employee emp = employeeServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
       AppUser user = appUserServiceRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));

        boolean newStatus = !Boolean.TRUE.equals(emp.getVerified());
        emp.setVerified(newStatus);
        emp = employeeServiceRepository.save(emp);

        // setting up things to send the verification mail
        String email = user.getEmail();

        String subject = "You verification status with DAPRP.";
        String body = "";
        if(emp.getVerified()){
         body = "Hello, " + user.getUsername() + " /n Congratulations! you are now a verified team member of our mission.";
        }else{
            body = "Hello, " + user.getUsername() + " /n regret to inform you that you will not be a part of our team.";

        }

        emailService.sendStatusOfVerifactionChangemail(email,subject,body);
        return emp;
    }

    @Transactional
    public Employee makeAdmin(String id) {

        Employee emp = employeeServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
        AppUser user = appUserServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        if(emp.getVerified()) {
            boolean newStatus = !Boolean.TRUE.equals(user.getRoles().contains("ADMIN"));
            if(newStatus == false){
                user.getRoles().remove("ADMIN");
            }else{
                user.getRoles().add("ADMIN");
            }
//            emp = employeeServiceRepository.save(emp);
            appUserServiceRepository.save(user);
            String email = user.getEmail();
            String body = "";
            String subject="";
            if (user.getRoles().contains("ADMIN")) {
                 subject = "Congratulations! ADMIN of DAPRP.";
                body = "Hello, " + user.getUsername() + " /n Congratulations! you are now an admin of DAPRP Portal.";
            } else {
                 subject = "From ADMIN of DAPRP.";
                body = "Hello, " + user.getUsername() + " /n regret to inform you that you will not be a part of our admin team.";

            }
            emailService.sendAdminEmail(email,subject,body);
            return emp;
        }

         return emp;
    }
  public EmployeeRequest findByEmployeeName(String employeeName){
        AppUser user = appUserServiceRepository.findByUsername(employeeName).orElseThrow(()-> new RuntimeException("User not found"));
        Employee emp = employeeServiceRepository.findByUserId(user.getUserId()).orElseThrow(() -> new RuntimeException("Employee not found"));

        return new EmployeeRequest(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getMobile(),
                user.getRoles(),
                emp.getVerified()
        );
  }

}


