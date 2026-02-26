package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.serviceRepository.EmployeeServiceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeService {
    @Autowired
    private EmployeeServiceRepository employeeServiceRepository;

    private EmailService emailService;

    public boolean saveEmployee(Employee employee){
        employeeServiceRepository.save(employee);
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

//        // send email
//        if (newStatus) {
//            emailService.sendEmail(
//                    emp.getEmail(),
//                    "Your Employee Account is Verified",
//                    "Hello " + emp.getName() + ",\n\nYour employee account has been VERIFIED by Admin.\nYou now have access to the system."
//            );
//        } else {
//            emailService.sendEmail(
//                    emp.getEmail(),
//                    "Your Employee Account is Unverified",
//                    "Hello " + emp.getName() + ",\n\nYour employee account has been UNVERIFIED by Admin.\nPlease contact support if this was a mistake."
//            );
//        }
        return emp;
    }
}


