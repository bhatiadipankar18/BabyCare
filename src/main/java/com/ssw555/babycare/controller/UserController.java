package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/user/register",method = RequestMethod.POST)
    public Result register(@RequestBody Map<String, String> map ) {
        if (this.userRepository.findByUsername(map.get("email")).isEmpty()) {
            User user = new User();
            user.setUsername(map.get("email"));
            user.setFirstName(map.get("firstName"));
            user.setLastName(map.get("lastName"));
            user.setPassword(map.get("password"));
            user.setUserType(map.get("userType"));
            this.userRepository.save(user);

            return Result.success(null);
        }

        return Result.fail(1, "User with username already exists. Please create another username.");
    }


    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    public Result login(@RequestBody Map<String, String> map ){
        List<User> save = userRepository.findByUsername(map.get("email"));

        if (save.isEmpty()) {
            return Result.fail(2, "User does not exists. Please register.");
        }

        //Check if password is same
        if (!save.get(0).getPassword().equals(map.get("password"))) {
            return Result.fail(3, "Password does not match. Please try again.");
        }
        return Result.success(save.get(0));

    }
}
