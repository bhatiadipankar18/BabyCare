package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Vaccine;
import com.ssw555.babycare.Repo.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class VaccineController {


    @Autowired
    private VaccineRepository vaccineRepository;


    @GetMapping("/vaccineList/findByChildId")
    public List<Vaccine> getVaccineByChildId(int childId){
        List<Vaccine> res = vaccineRepository.findByChildId(childId);

        return res;

    }

    @DeleteMapping("/vaccineList/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        vaccineRepository.deleteById(id);
    }

    @PutMapping("/vaccineList/update")
    public String update(@RequestBody Vaccine vaccine) {

        Vaccine result = vaccineRepository.save(vaccine);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/vaccineList/add")
    public Vaccine save(@RequestBody Vaccine vaccine) {

        Vaccine result = vaccineRepository.save(vaccine);

        return result;

    }

}
