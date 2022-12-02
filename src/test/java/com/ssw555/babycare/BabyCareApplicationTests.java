package com.ssw555.babycare;

import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.JWT.JWTUtils;
import com.ssw555.babycare.Repo.UserRepository;
import com.ssw555.babycare.controller.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class BabyCareApplicationTests {

    @Autowired
    private UserController userController;

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    @Test
    void contextLoads() {
    }

    @BeforeEach
    public void setUp(){
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
    }


    @Test
    void testCreateToken(){
        String token = JWTUtils.createToken("1");
    }


    @Test
    void testDuplicatedUserName(){
        User user1=new User();
        user1.setUsername("parent1");
        userController.register(user1, request);
        User user2=new User();
        user2.setUsername("parent1");
        Result<Object> res = userController.register(user2, request);
        assertEquals(res.getMsg(), "invalid username");
    }

    @Test
    void testLogin(){
        User user1=new User();
        user1.setUsername("parent1");
        user1.setPassword("123456");
        Result<Object> res = userController.login(user1, response);
        assertEquals(res.getMsg(), "login success");

    }

    @Test
    void testSMS(){
        User user1=new User();
        user1.setUsername("parent1");
        Result<Object> res = userController.getCaptcha("+15519986338");
        assertEquals(res.getMsg(), "bad phone number");

    }


//    @Test
//    void testDuplicatedUserName(){
//        User user1=new User();
//        user1.setUsername("parent1");
//        userController.register(user1, request);
//        User user2=new User();
//        user2.setUsername("parent1");
//        Result<Object> res = userController.register(user2, request);
//        assertEquals(res.getMsg(), "invalid username");
//
//    }
//
//    @Test
//    void testDuplicatedUserName(){
//        User user1=new User();
//        user1.setUsername("parent1");
//        userController.register(user1, request);
//        User user2=new User();
//        user2.setUsername("parent1");
//        Result<Object> res = userController.register(user2, request);
//        assertEquals(res.getMsg(), "invalid username");
//
//    }

}
