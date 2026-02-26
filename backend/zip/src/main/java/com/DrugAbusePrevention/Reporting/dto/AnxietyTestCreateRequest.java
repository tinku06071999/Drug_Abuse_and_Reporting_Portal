package com.DrugAbusePrevention.Reporting.dto;

public record AnxietyTestCreateRequest(
        String userId,   // optional if email provided
        String email,    // optional if userId provided
        Integer score,   // required: 0..63
        String level,    // optional; server recomputes for safety
        String username  // optional; ignored by server (we use DB user)
) {}