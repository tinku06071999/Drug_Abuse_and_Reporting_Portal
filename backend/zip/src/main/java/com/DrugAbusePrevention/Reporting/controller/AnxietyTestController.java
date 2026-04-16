package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.AnxietyTestCreateRequest;
import com.DrugAbusePrevention.Reporting.dto.AnxietyTestResponse;
import com.DrugAbusePrevention.Reporting.service.AnxietyTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/anxiety-tests")
public class AnxietyTestController {

    @Autowired
    private AnxietyTestService anxietyTestService;

    @PostMapping("save-test-report")
    public ResponseEntity<AnxietyTestResponse> saveTestReport(@RequestBody AnxietyTestCreateRequest req) {

        AnxietyTestResponse res = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}