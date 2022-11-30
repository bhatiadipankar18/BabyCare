package com.ssw555.babycare.controller;
import com.ssw555.babycare.Entity.Child;
import com.ssw555.babycare.Repo.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// import java.text.DateFormat;
// import java.text.ParseException;
// import java.text.SimpleDateFormat;
// import java.time.LocalDate;
// import java.time.Period;
// import java.util.Calendar;
// import java.util.Date;
import java.util.List;

@RestController

public class ChildController {

    @Autowired
    private ChildRepository ChildRepository;
    @GetMapping("/child/findAll")
    public List<Child> getAllChild( ){
        return  ChildRepository.findAll();
    }

    @DeleteMapping("/child/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        ChildRepository.deleteById(id);
    }

    @PutMapping("/child/update")
    public String update(@RequestBody Child child) {

        Child result = ChildRepository.save(child);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/child/add")
    public Child save(@RequestBody Child child) {

        //String birthDate =child.getBirthdate();
        //int curYear=2022;
       // SimpleDateFormat birth=new SimpleDateFormat("yyyy-MM-dd");
         //  int age=Period.between(
             //      LocalDate.of(date1.getYear(), date1.getMonth(), date1.getDate()),
             //      LocalDate.now()
        //    ).getYears();
      /*  try {
            DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            Date date1=formatter.parse(child.getBirthdate());
            int d1 = Integer.parseInt(formatter.format(date1));
            int d2 = Integer.parseInt(formatter.format( LocalDate.now()));
            int age = (d2-d1)/10000;

             System.out.println("age = " + age);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }*/
        //child.getBirthdate();
        Child result = ChildRepository.save(child);

        return result;

    }



}
