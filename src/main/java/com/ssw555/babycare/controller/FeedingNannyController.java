package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.FeedingNanny;
import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.Repo.FeedingNannyRepository;
import com.ssw555.babycare.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class FeedingNannyController {

    @Autowired
    private FeedingNannyRepository feedingNannyRepository;
    
    @GetMapping("/feedingNanny/findAll")
    public List<FeedingNanny> getAllFeedings( ){
        return  feedingNannyRepository.findAll();

    }

    @DeleteMapping("/feedingNanny/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        feedingNannyRepository.deleteById(id);
    }

    @PutMapping("/feedingNanny/update")
    public String update(@RequestBody FeedingNanny feedingNanny) {

        FeedingNanny result = feedingNannyRepository.save(feedingNanny);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/feedingNanny/add")
    public FeedingNanny save(@RequestBody FeedingNanny feedingNanny) {

        FeedingNanny result = feedingNannyRepository.save(feedingNanny);

        return result;

    }



}
