package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.CollegeSupport;
import com.DrugAbusePrevention.Reporting.serviceRepository.CollegeSupportServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CollegeSupportService {
    @Autowired
    private CollegeSupportServiceRepository collegeSupportServiceRepository;
    public void saveResponse(CollegeSupport collegeSupport){
        collegeSupportServiceRepository.save(collegeSupport);
    }
    public List<CollegeSupport>getAllResponses(){
        return collegeSupportServiceRepository.findAll();
    }

}
