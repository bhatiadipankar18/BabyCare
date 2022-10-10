package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Feeding;
import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.Repo.FeedingRepository;
import com.ssw555.babycare.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class FeedingController {

    @Autowired
    private FeedingRepository feedingRepository;
    @GetMapping("/feeding/findAll")
    public List<Feeding> getAllFeedings( ){
        return  feedingRepository.findAll();

    }

    @DeleteMapping("/feeding/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        feedingRepository.deleteById(id);
    }

    @PutMapping("/feeding/update")
    public String update(@RequestBody Feeding feeding) {

        Feeding result = feedingRepository.save(feeding);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/feeding/add")
    public Feeding save(@RequestBody Feeding feeding) {

        Feeding result = feedingRepository.save(feeding);

        return result;

    }



}
