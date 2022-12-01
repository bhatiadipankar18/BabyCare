package com.ssw555.babycare.controller;

import com.ssw555.babycare.Entity.Captcha;
import com.ssw555.babycare.Entity.Feeding;
import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.JWT.JWTUtils;
import com.ssw555.babycare.Repo.CaptchaRepository;
import com.ssw555.babycare.Repo.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;


@RestController
//@CrossOrigin(origins = "http://localhost:3000",exposedHeaders= String[] {"1","s"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CaptchaRepository captchaRepository;





    @GetMapping("/user/getCaptcha")
    public Result<Object> getCaptcha(String phone){
//        phone="+15519986338";

        List<Captcha> captchaByPhone = captchaRepository.findCaptchaByPhone(phone);
        if (captchaByPhone.size()!=0) {
            return new Result<>(0, "bad phone number", null);
        }


        Twilio.init("AC9e7113c3577f68f84f5177a0642d396d","e2bfba6cb572d0eb88f9fbd43724096f");
        String code = String.valueOf(new Random().nextInt(899999) + 100000);
        Message.creator(new PhoneNumber(phone),
                new PhoneNumber("+16507898126"), code).create();


        Captcha one=new Captcha();
        one.setPhone(phone);
        one.setCode(code);
        captchaRepository.save(one);
//
        return new Result<>(200, "success", null);

    }

    @GetMapping("/user/findAllNanny")
    public List<User> findAllNanny(){
        List<User> res = userRepository.findUserByRole(2);
        return  res;

    }

    @RequestMapping(value = "/user/register",method = RequestMethod.POST)
    public Result<Object> register(@RequestBody User user , HttpServletRequest request){
        Optional<User> one = userRepository.findUserByUsername(user.getUsername());
        if (one.isPresent ()) {
            return new Result<>(0, "invalid username", null);
        }


        List<Captcha> captchaByPhone = captchaRepository.findCaptchaByPhone(user.getPhone());
        if (!captchaByPhone.get(0).getCode().equals(user.getCode())) {
            return new Result<>(0, "bad captcha", null);
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
