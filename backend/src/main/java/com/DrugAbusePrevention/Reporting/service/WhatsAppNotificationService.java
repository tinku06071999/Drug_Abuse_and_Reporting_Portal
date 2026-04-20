package com.DrugAbusePrevention.Reporting.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

@Component
public class WhatsAppNotificationService {

    @Value("${twilio.whatsappFrom}")
    private String from;

    @Async
    public void sendWhatsappMessage(String to, String body){
        String toWhatsApp = "whatsapp:" + to;
        Message.creator(
                new PhoneNumber(toWhatsApp),
                new PhoneNumber(from),
                body
        ).create();
    }
}
