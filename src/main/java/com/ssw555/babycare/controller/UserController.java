package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController

public class UserController {

    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value = "/user/register",method = RequestMethod.POST)
    public Result hello(@RequestBody Map<String, String> map ){
        //System.out.println(map.get("account") + " "+map.get("password") );
        User user=new User();
        user.setUsername(map.get("account"));
        user.setPassword(map.get("password"));
        User save = userRepository.save(user);
        System.out.println(save);
        return Result.success(null);

    }
}
