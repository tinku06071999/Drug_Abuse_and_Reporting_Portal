package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.dto.ReportCountDto;
import com.DrugAbusePrevention.Reporting.entity.Report;
import com.DrugAbusePrevention.Reporting.serviceRepository.ReportServiceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ReportService {
    @Autowired
    private ReportServiceRepository reportServiceRepository;

    public void saveReport(Report report){
//        report.setDate(Date.now());
        reportServiceRepository.save(report);
    }
    public List<Report>getAllReports(){
        return reportServiceRepository.findAll();
    }

// get reports by date
    public List<ReportCountDto> getReportByDate() {
        ZoneId zone = ZoneId.systemDefault();

        Map<LocalDate, Long> grouped = getAllReports().stream()
                .filter(r -> r.getDate() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getDate().toInstant().atZone(zone).toLocalDate(),
                        Collectors.counting()
                ));

        return grouped.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())              // sort by LocalDate asc
                .map(e -> new ReportCountDto(e.getKey().toString(), e.getValue()))
                .toList();
    }
// get No of pending reports
    public List<Report> getTotalPendingReports(){
        List<Report>allReports = getAllReports();
        return allReports.stream().filter(x -> x.getResolved().equals(false)).toList();
    }
//get No resolved reports
    public List<Report> getTotalResolvedReports(){
        List<Report>allReports = getAllReports();
        return allReports.stream().filter(x -> x.getResolved().equals(true)).toList();
    }
// update the status of report to resolved or pending
    public Report changeReportStatus(ObjectId id) {
        return reportServiceRepository.findById(id)
                .map(r -> {
                    boolean current = Boolean.TRUE.equals(r.getResolved());
                    r.setResolved(!current);
                    return reportServiceRepository.save(r);
                })
                .orElse(null);
    }


}
