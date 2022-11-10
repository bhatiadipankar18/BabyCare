package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Child;
import com.ssw555.babycare.Entity.Poem;
import com.ssw555.babycare.Repo.ChildRepository;
import com.ssw555.babycare.Repo.PoemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class ChildController {




    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private PoemRepository poemRepository;



    @GetMapping("/getChildrenByParentId")
    public List<Child> getChildByParentId(int parentId){
        return childRepository.findChildByParentId(parentId);
    }


    @GetMapping("/getChildrenByNannyId")
    public List<Child> getChildrenByNannyId(int parentId){
        return childRepository.findChildByNannyId(parentId);
    }





}
