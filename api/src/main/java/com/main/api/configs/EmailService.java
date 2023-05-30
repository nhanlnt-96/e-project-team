package com.main.api.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import org.springframework.mail.javamail.MimeMessageHelper;

@Component
public class EmailService {
    @Value("${spring.mail.username}")
    private String FROM_EMAIL;
    final private JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender emailSender) {
        this.mailSender = emailSender;
    }

    public void sendSimpleMessage(
            String to, String subject, String text, boolean isHtml) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setSubject(subject);
        helper.setFrom(FROM_EMAIL);
        helper.setTo(to);

        helper.setText(text, isHtml);

        mailSender.send(message);
    }
}
