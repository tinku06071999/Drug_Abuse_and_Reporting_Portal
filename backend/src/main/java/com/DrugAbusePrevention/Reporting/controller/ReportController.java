package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.EmployeeRequest;
import com.DrugAbusePrevention.Reporting.dto.ReportCountDto;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.Employee;
import com.DrugAbusePrevention.Reporting.entity.Report;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.service.EmployeeService;
import com.DrugAbusePrevention.Reporting.service.ReportService;
import com.DrugAbusePrevention.Reporting.service.UserService;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import com.DrugAbusePrevention.Reporting.serviceRepository.UserServiceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AppUserServiceRepository appUserServiceRepository;

    private AppUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return appUserServiceRepository
                .findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    //getting all reports
    @GetMapping("/get-all-reports")
    public ResponseEntity<List<Report>> getAllReports(){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String employeeName = authentication.getName();
//        EmployeeRequest emp = employeeService.findByEmployeeName(employeeName);
        AppUser emp = getCurrentUser();
        if(emp.getRoles().contains("ADMIN")) {
            List<Report> list = reportService.getAllReports();
            if (list != null) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }
    //getting reports by date
    @GetMapping("/reports-by-date")
    public ResponseEntity<List<ReportCountDto>> getReportsByDate() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////        String employeeName = authentication.getName();
//        String email = authentication.getName();
//        AppUser emp = appUserServiceRepository.findByEmail(email).orElseThrow();
////        EmployeeRequest emp = employeeService.findByEmployeeName(employeeName);
        AppUser emp = getCurrentUser();
        if(emp.getRoles().contains("ADMIN")) {
            List<ReportCountDto> list = reportService.getReportByDate();
            try {
                return new ResponseEntity<>(list, HttpStatus.OK);

            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }

    @GetMapping("/total-resolved-reports")
    public ResponseEntity<List<Report>>getTotalResolvedReports(){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String employeeName = authentication.getName();
//        EmployeeRequest emp = employeeService.findByEmployeeName(employeeName);
        AppUser emp = getCurrentUser();

        if(emp.getRoles().contains("ADMIN")) {
            List<Report> list = reportService.getTotalResolvedReports();
            if (list != null) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }
    @GetMapping("/total-pending-reports")
    public ResponseEntity<List<Report>> getTotalPendingReports(){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String employeeName = authentication.getName();
//        EmployeeRequest emp = employeeService.findByEmployeeName(employeeName);
        AppUser emp = getCurrentUser();

        if(emp.getRoles().contains("ADMIN")) {
            List<Report> list = reportService.getTotalPendingReports();
            if (list != null) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }
    @PutMapping("/update-report-status")
    public ResponseEntity<?> changeReportStatus(@RequestBody Map<String, Object> body) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String employeeName = authentication.getName();
//        EmployeeRequest emp = employeeService.findByEmployeeName(employeeName);
        AppUser emp = getCurrentUser();

        if(emp.getRoles().contains("ADMIN")) {
            try {
                if (body == null || !body.containsKey("id")) {
                    return ResponseEntity.badRequest().body("Missing 'id' in request body");
                }

                Object raw = body.get("id");
                String idString = null;

                if (raw instanceof String s) {
                    idString = s;
                } else if (raw instanceof Map<?, ?> m) {
                    // Support extended JSON if ever sent: { "id": { "$oid": "…" } }
                    Object oid = m.get("$oid");
                    if (oid instanceof String s) idString = s;
                }

                if (idString == null || !ObjectId.isValid(idString)) {
                    return ResponseEntity.badRequest().body("Invalid ObjectId value for 'id': " + String.valueOf(raw));
                }

                ObjectId reportId = new ObjectId(idString);
                Report updated = reportService.changeReportStatus(reportId);
                return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().body(e.getMessage());
            }
        }
        return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
    }
}
