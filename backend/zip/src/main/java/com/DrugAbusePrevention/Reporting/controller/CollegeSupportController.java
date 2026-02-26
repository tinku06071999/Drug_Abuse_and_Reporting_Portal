package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.entity.CollegeSupport;
import com.DrugAbusePrevention.Reporting.service.CollegeSupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/college_support")
public class CollegeSupportController {
    @Autowired
    private CollegeSupportService collegeSupportService;
    @PostMapping("/save_response")
    public ResponseEntity saveResponse(@RequestBody CollegeSupport collegeSupport){
        try {
            collegeSupportService.saveResponse(collegeSupport);
            return new ResponseEntity(collegeSupport, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get_all_responses")
    public ResponseEntity<List<CollegeSupport>> getAllResponses(){
        List<CollegeSupport> list = collegeSupportService.getAllResponses();
        if(list != null){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
       else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
