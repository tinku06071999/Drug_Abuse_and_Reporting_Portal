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
    private PasswordEncoder passwordEncode;

    @Transactional
    public boolean saveNewEmployee(EmployeeRequest employeeRequest) {

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
        String subject = "✅ Registration Successful | DAPRP Portal";

        String body = """
                Hello %s,
                            
                ✅ Your registration on the Drug Abuse Prevention & Reporting Portal (DAPRP) was successful.
                            
                🔒 Your account is currently UNDER VERIFICATION by the Admin team.
                📧 Once verified, you will start receiving official communications and alerts.
                            
                No action is required from your side at this moment.
                            
                Thank you for joining our mission to create a safer campus.
                            
                — DAPRP Admin Team
                """.formatted(employeeRequest.getUsername());
        emailService.sendSaveEmployeeEmail(to, subject, body);
        return true;
    }

    @Transactional
    public boolean saveEmployee(EmployeeRequest employeeRequest) {
        AppUser existingUser = appUserServiceRepository.findById(employeeRequest.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        appUserServiceRepository.save(
                new AppUser(employeeRequest.getUserId(),
                        employeeRequest.getUsername(),
                        employeeRequest.getEmail(),
                        employeeRequest.getPassword(),
                        employeeRequest.getMobile(),
                        employeeRequest.getRoles()));

        Employee emp = employeeServiceRepository.findById(employeeRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        employeeServiceRepository.save(new Employee(employeeRequest.getUserId(), employeeRequest.getVerified()));

        String to = existingUser.getEmail();
        String subject = "✅ Profile Updated Successfully | DAPRP Portal";
        String body =
                """
                        Hello %s,
                                        
                        ✅ Your profile information on the Drug Abuse Prevention & Reporting Portal (DAPRP) has been updated successfully.
                                        
                        🔒 Your verification status remains unchanged.
                        📧 If your account is still under verification, you will receive a confirmation email once the Admin team reviews it.
                                        
                        ⚠️ If you DID NOT make this update, please contact the Admin team immediately.
                                        
                        Thank you for helping us keep your information accurate.
                                        
                        — DAPRP Admin Team
                        """.formatted(existingUser.getUsername());

        emailService.sendSaveEmployeeEmail(to, subject, body);
        return true;
    }

    public List<EmployeeRequest> getAllEmployees() {
        List<Employee> employees = employeeServiceRepository.findAll();

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

        String subject = "";
        String body = "";
        if (emp.getVerified()) {
            subject = "🎉 Account Verified | Setup WhatsApp Alerts (DAPRP)";
            body = """
                    Hello %s,
                                    
                    🎉 Congratulations! Your account has been VERIFIED by the Admin team.
                                    
                    ✅ You are now an active member of the DAPRP response team.
                    🔔 You will receive IMPORTANT incident alerts via WhatsApp.
                                    
                    ==============================
                    📲 WHATSAPP ALERT SETUP
                    ==============================
                                    
                    Option 1️⃣: WhatsApp Opt‑In (Recommended)
                                • Click the link below on your mobile device:
                                    https://wa.me/14155238886?text=join%%20purple-solution
                                • WhatsApp will open with the message pre‑filled
                                • Tap “Send” to complete setup
                                ⚠️ This step is mandatory to receive incident alerts.
                                    
                    Option 2️⃣: Manual Setup
                    • Open WhatsApp
                    • Send the following message to this number:
                      +14155238886
                    • Message text:
                      join purple-solution
                                    
                    ⚠️ Without WhatsApp setup, you may MISS urgent alerts.
                                    
                    If you face any issues, contact the Admin team.
                                    
                    Welcome aboard 🚀
                                    
                    — DAPRP Admin Team
                    """.formatted(user.getUsername());
        } else {
            subject = "⚠️ Account Unverified | DAPRP Portal";
            body = """
                    Hello %s,
                                
                    ⚠️ Your account has been UNVERIFIED by the Admin team.
                                
                    🚫 You will NO LONGER receive WhatsApp alerts or official communications.
                    🔕 Incident notification access has been disabled.
                                
                    If you believe this action was taken by mistake, please contact the Admin team.
                                
                    — DAPRP Admin Team
                    """.formatted(user.getUsername());
        }

        emailService.sendStatusOfVerifactionChangemail(email, subject, body);
        return emp;
    }

    @Transactional
    public Employee makeAdmin(String id) {

        Employee emp = employeeServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
        AppUser user = appUserServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        if (emp.getVerified()) {
            boolean newStatus = !Boolean.TRUE.equals(user.getRoles().contains("ADMIN"));
            if (newStatus == false) {
                user.getRoles().remove("ADMIN");
            } else {
                user.getRoles().add("ADMIN");
            }
//            emp = employeeServiceRepository.save(emp);
            appUserServiceRepository.save(user);
            String email = user.getEmail();
            String body = "";
            String subject = "";
            if (user.getRoles().contains("ADMIN")) {
                subject = "🎯 You Are Now an ADMIN | DAPRP Portal";
                body = """
                        Hello %s,
                                                
                        🎯 Congratulations! You have been granted ADMIN privileges on the DAPRP Portal.
                                                
                        ✅ You can now:
                        • Verify / unverify employees
                        • Review and manage incident reports
                        • Oversee communication workflows
                                                
                        Please use your access responsibly.
                                                
                        — DAPRP Admin Team
                        """.formatted(user.getUsername());
            } else {
                subject = "ℹ️ Admin Role Update | DAPRP Portal";
                body =
                        """
                                Hello %s,
                                                        
                                ℹ️ This is to inform you that your ADMIN privileges have been revoked.
                                                        
                                ✅ Your employee access remains unchanged.
                                🚫 Admin-level controls are no longer available.
                                                        
                                If you have questions, please contact the Admin team.
                                                        
                                — DAPRP Admin Team
                                """.formatted(user.getUsername());

            }
            emailService.sendAdminEmail(email, subject, body);
            return emp;
        }

        return emp;
    }

    public EmployeeRequest findByEmployeeName(String employeeName) {
        AppUser user = appUserServiceRepository.findByUsername(employeeName).orElseThrow(() -> new RuntimeException("User not found"));
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


