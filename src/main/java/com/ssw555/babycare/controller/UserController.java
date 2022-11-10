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
    public Result<Object> register(@RequestBody User user ){

        Optional<User> one = userRepository.findUserByUsername(user.getUsername());
        if (one.isPresent ()) {
            return new Result<>(0, "invalid username", null);
        }

        User save = userRepository.save(user);
        return new Result<>(200, "success", null);

    }


    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    public Result<Object> login(@RequestBody  User user ){
        User one = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (one==null) {
            return new Result<>(0,"check username or password",null);
        }
        Map<String, Object> data = new HashMap<>();

        data.put("userId",one.getId());
        data.put("userRole",one.getRole());
        data.put("token","tokentoken");
        return new Result<>(200,"login success",data);

    }
}
