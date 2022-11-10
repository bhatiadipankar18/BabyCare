package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController

public class UserController {

    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value = "/user/register",method = RequestMethod.POST)
    public Result register(@RequestBody User user ){

        Optional<User> one = userRepository.findUserByUsername(user.getUsername());
        if (one.isPresent ()) {
            //todo bad username
            return Result.fail(0,"invalid username");
        }

        User save = userRepository.save(user);
        return Result.success("register success");

    }


    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    public Result login(@RequestBody Map<String, String> map ){
        User user = userRepository.findByUsernameAndPassword(map.get("username"),map.get("password"));
        Map<String, Object> data = new HashMap<>();
        if (user==null) {
            return Result.fail(-1,null);
        }else{
            data.put("userId",user.getId());
            data.put("userRole",user.getRole());
            data.put("token","tokentoken");
            return Result.success("login sucess",data);
        }
    }
}
