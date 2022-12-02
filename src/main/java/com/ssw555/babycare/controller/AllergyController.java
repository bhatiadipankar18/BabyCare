package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.*;
import com.ssw555.babycare.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController

public class AllergyController {

    @Autowired
    private AllergyRepository AllergyRepository;

    @GetMapping("/allergyList/findByChildId")
    public List<Allergy> getAllergyByChildId(int childId){
        List<Allergy> res = AllergyRepository.findByChildId(childId);
        return  res;
    }

    @DeleteMapping("/allergyList/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        AllergyRepository.deleteById(id);
    }

    @PutMapping("/allergyList/update")
    public String update(@RequestBody Allergy Allergy) {

        Allergy result = AllergyRepository.save(Allergy);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/allergyList/add")
    public Allergy save(@RequestBody Allergy allergy) {
        Allergy result = AllergyRepository.save(allergy);

        return result;

    }


}
