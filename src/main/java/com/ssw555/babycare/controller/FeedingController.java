package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Feeding;
import com.ssw555.babycare.Repo.FeedingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/feeding/findById/{id}")
    public Optional<Feeding> findById(@PathVariable("id") Integer id) {
        return feedingRepository.findById(id);
    }

    @PostMapping("/feeding/addOrUpdate")
    public Feeding save(@RequestBody Feeding feeding) {
        return feedingRepository.save(feeding);
    }

}
