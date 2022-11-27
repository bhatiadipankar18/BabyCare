package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Feeding;
import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.JWT.JWTUtils;
import com.ssw555.babycare.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
//@CrossOrigin(origins = "http://localhost:3000",exposedHeaders= String[] {"1","s"})
public class UserController {

    @Autowired
    private UserRepository userRepository;



    @GetMapping("/user/findAllNanny")
    public List<User> findAllNanny(){
        List<User> res = userRepository.findUserByRole(2);
        return  res;

    }

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
    public Result<Object> login(@RequestBody  User user , HttpServletResponse response){
        User one = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (one==null) {
            return new Result<>(0,"check username or password",null);
        }
        Map<String, Object> data = new HashMap<>();

        data.put("userId",one.getId());
        data.put("username",one.getUsername());
        data.put("userRole",one.getRole());
        data.put("token","tokentoken");
        String token = JWTUtils.createToken(one.getId().toString());
        System.out.println(token);
        response.setHeader(JWTUtils.USER_LOGIN_TOKEN, token);
//        response.set
        //todo 前端这里加token
        return new Result<>(200,"login success",data);

    }
}
