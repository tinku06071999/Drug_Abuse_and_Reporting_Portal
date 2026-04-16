package com.DrugAbusePrevention.Reporting.entity;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "anxiety_test")
@Getter
@Setter
public class AnxietyTest {
    @Id
    private ObjectId id;
    private Integer score;
    private String level;
    private Date date;
    @DBRef
    private AppUser appUser;
}