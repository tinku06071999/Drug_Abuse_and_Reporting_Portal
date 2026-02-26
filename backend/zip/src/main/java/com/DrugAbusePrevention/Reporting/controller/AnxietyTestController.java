package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.AnxietyTestCreateRequest;
import com.DrugAbusePrevention.Reporting.dto.AnxietyTestResponse;
import com.DrugAbusePrevention.Reporting.service.AnxietyTestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/anxiety-tests")
@CrossOrigin // adjust or restrict origins as needed
public class AnxietyTestController {

    private final AnxietyTestService service;

    public AnxietyTestController(AnxietyTestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AnxietyTestResponse> create(@RequestBody AnxietyTestCreateRequest req) {
        AnxietyTestResponse res = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}