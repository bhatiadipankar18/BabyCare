package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Medicine;
import com.ssw555.babycare.Repo.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class MedicineController {
    @Autowired
    private MedicineRepository medicineRepository;


    @GetMapping("/medicineList/findByChildId")
    public List<Medicine> getMedicineByChildId(int childId){
        List<Medicine> res = medicineRepository.findByChildId(childId);

        return  res;

    }

    @DeleteMapping("/medicineList/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        medicineRepository.deleteById(id);
    }

    @PutMapping("/medicineList/update")
    public String update(@RequestBody Medicine Medicine) {

        Medicine result = medicineRepository.save(Medicine);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/medicineList/add")
    public Medicine save(@RequestBody Medicine medicine) {

        Medicine result = medicineRepository.save(medicine);

        return result;

    }



}
