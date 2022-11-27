package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Child;
import com.ssw555.babycare.Entity.Feeding;
import com.ssw555.babycare.Entity.Poem;
import com.ssw555.babycare.Repo.ChildRepository;
import com.ssw555.babycare.Repo.PoemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController

public class ChildController {




    @Autowired
    private ChildRepository childRepository;





    @GetMapping("/getChildrenByParentId")
    public List<Child> getChildByParentId( int parentId){
        return childRepository.findChildByParentId(parentId);
    }


    @GetMapping("/getChildrenByNannyId")
    public List<Child> getChildrenByNannyId(int parentId){
        return childRepository.findChildByNannyId(parentId);
    }


    @DeleteMapping("/child/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        childRepository.deleteById(id);
    }

    @PutMapping("/child/update")
    public String update(@RequestBody Child child) {

        Child result = childRepository.save(child);
        if(result != null) {
            return "success";
        } else {
            return "error";
        }

    }

    @PostMapping("/child/add")
    public Child save(@RequestBody Child child) {

        Child result = childRepository.save(child);

        return result;

    }




}
