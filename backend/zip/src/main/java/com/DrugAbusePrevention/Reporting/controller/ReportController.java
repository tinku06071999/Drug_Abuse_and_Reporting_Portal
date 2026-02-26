package com.DrugAbusePrevention.Reporting.controller;

import com.DrugAbusePrevention.Reporting.dto.ReportCountDto;
import com.DrugAbusePrevention.Reporting.entity.Report;
import com.DrugAbusePrevention.Reporting.service.ReportService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/savereport")
    public ResponseEntity<Boolean> saveReport(@RequestBody Report report){
        try{
            reportService.saveReport(report);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    //getting all reports
    @GetMapping("/get_all_reports")
    public ResponseEntity<List<Report>> getAllReports(){
        List<Report> list = reportService.getAllReports();
        if(list != null){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //getting reports by date
    @GetMapping("/reports_by_date")
    public ResponseEntity<List<ReportCountDto>> getReportsByDate() {
        List<ReportCountDto> list = reportService.getReportByDate();
        try{
            return new ResponseEntity<>(list, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/total_resolved_reports")
    public ResponseEntity<List<Report>>getTotalResolvedReports(){
        List<Report>list = reportService.getTotalResolvedReports();
        if(list != null){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/total_pending_reports")
    public ResponseEntity<List<Report>> getTotalPendingReports(){
        List<Report>list = reportService.getTotalPendingReports();
        if(list != null){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update_report_status")
    public ResponseEntity<?> changeReportStatus(@RequestBody Map<String, Object> body) {
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
}
