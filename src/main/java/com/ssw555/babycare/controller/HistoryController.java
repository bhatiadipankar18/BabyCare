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

    @GetMapping("/HistoryList/findByChildId")
    public List<History> getHistoryByChildId(int childId){
       List<History> res = historyRepository.findByChildId(childId);
        return  res;
    }

    @PostMapping("/HistoryList/add")
    public History save(@RequestBody History history) {
        try {
            History result = historyRepository.save(history);

            return result;

        }
        catch(Exception e) {
            String msg = e.getMessage();
            return null;
        }
    }
}
