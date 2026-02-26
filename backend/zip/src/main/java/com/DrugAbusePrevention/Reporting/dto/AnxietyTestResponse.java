package com.DrugAbusePrevention.Reporting.dto;

public record AnxietyTestResponse(
        String id,
        Integer score,
        String level,
        String dateIso,
        String userId,
        String userName,
        String email
) {}