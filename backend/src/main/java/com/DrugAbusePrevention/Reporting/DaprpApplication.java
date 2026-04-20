package com.DrugAbusePrevention.Reporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class DaprpApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaprpApplication.class, args);
    }

}
