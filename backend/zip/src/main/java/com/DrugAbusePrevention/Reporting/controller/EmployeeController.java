package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.service.EmployeeService;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @PostMapping("/save_employee")
    public ResponseEntity<Boolean>saveEmployee(@RequestBody Employee employee){
        try{
            employeeService.saveEmployee(employee);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get_all_employees")
    public ResponseEntity<List<Employee>>getAllEmployee(){
        List<Employee> list = employeeService.getAllEmployees();
        if(list != null){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/verify_employee/{id}")
    public ResponseEntity<Employee> verifyEmployee(@PathVariable String id) {
            try {
                Employee updated = employeeService.verifyEmployee(id);
                return ResponseEntity.ok(updated);
            }
            catch (IllegalArgumentException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
}
