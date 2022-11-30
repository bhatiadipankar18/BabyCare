package com.ssw555.babycare.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
//import java.time.DateTimeException;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class History {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "ID")
    private String ID;

    private Integer updated_by;
    private Date updated_on;
    private String age;
    private String milk;
    private String food;
    private String operation;

}
