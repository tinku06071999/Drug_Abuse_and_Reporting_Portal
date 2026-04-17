package com.DrugAbusePrevention.Reporting.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.databind.annotation.JsonSerialize;
//import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "reports")
@Getter
@Setter
public class Report {
    @Id
    @JsonIgnore                               // ADD THIS
    private ObjectId id;

    private String title;
    private String placeOfIncident;
    private Date date;
    private String description;
    private Boolean resolved = false;
    private enum seriuosness {
        HIGH, MEDIUM, LOW
    }

    // 2) expose a derived property named "_id" as a hex string
    @JsonProperty("_id")
    public String get_id() {
        return id != null ? id.toHexString() : null;
    }

    // (optional) setter to accept _id from client if ever needed
    @JsonProperty("_id")
    public void set_id(String hex) {
        this.id = (hex != null && ObjectId.isValid(hex)) ? new ObjectId(hex) : null;
    }

}