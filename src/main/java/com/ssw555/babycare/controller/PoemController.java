package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.*;
import com.ssw555.babycare.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

public class PoemController {

    @Autowired
    private ParentChildRepository parentChildRepository;


    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private PoemRepository poemRepository;


    @GetMapping("/poemList/findByChildId")
    public List<Poem> getPoemByChildId(int childId){
        List<Poem> res = poemRepository.findByChildId(childId);

        return  res;

    }
    @GetMapping("/getChildrenByParentId")
    public List<Map> getAllParentChild(int parentId){
        List<ParentChild> byParentId = parentChildRepository.findByParentId(parentId);
        List<Map> res=new ArrayList<>();
        for (ParentChild parentChild : byParentId) {
            Integer childId = parentChild.getChildId();
            Child child = childRepository.findById(childId).orElse(null);
            HashMap<String,String> map=new HashMap();
            map.put("childId", String.valueOf(parentChild.getChildId()));
            map.put("childName",child.getChildName() );
            res.add(map);

        }
        return  res;

    }

//    @GetMapping("/getChildrenByParentId")
//    public List<Map> getAllParentChild(int parentId){
//        List<ParentChild> byParentId = parentChildRepository.findByParentId(parentId);
//        List<Map> res=new ArrayList<>();
//        for (ParentChild parentChild : byParentId) {
//            Integer childId = parentChild.getChildId();
//            Child child = childRepository.findById(childId).orElse(null);
//            HashMap<String,String> map=new HashMap();
//            map.put("childId", String.valueOf(parentChild.getChildId()));
//            map.put("childName",child.getChildName() );
//            res.add(map);
//
//        }
//        return  res;
//
//    }

    @DeleteMapping("/poemList/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        poemRepository.deleteById(id);
    }

    @PutMapping("/poemList/update")
    public String update(@RequestBody Poem Poem) {

        Poem result = poemRepository.save(Poem);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/poemList/add")
    public Poem save(@RequestBody Poem poem) {

        Poem result = poemRepository.save(poem);

        return result;

    }



}
