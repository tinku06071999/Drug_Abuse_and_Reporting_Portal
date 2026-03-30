package com.DrugAbusePrevention.Reporting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    // send email when an employee submit the registration form
    public void sendSaveEmployeeEmail(String toEmail, String subject, String body) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(toEmail);
        mail.setSubject(subject);
        mail.setText(body);
        javaMailSender.send(mail);
    }

    // send email when admin verify / unverified the employee

    public void sendStatusOfVerifactionChangemail(String toEmail, String subject, String body){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(toEmail);
        mail.setSubject(subject);
        mail.setText(body);
        javaMailSender.send(mail);
    }
    public void sendAdminEmail(String toEmail, String subject, String body){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(toEmail);
        mail.setSubject(subject);
        mail.setText(body);
        javaMailSender.send(mail);
    }

}
