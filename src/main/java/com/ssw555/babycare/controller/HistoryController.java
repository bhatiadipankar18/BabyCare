package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.History;
import com.ssw555.babycare.Repo.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HistoryController {

    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping("/history/findAll")
    public List<History> getAllHistories( ){
        return  historyRepository.findAll();

    }





}
