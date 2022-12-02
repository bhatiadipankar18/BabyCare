package com.ssw555.babycare;

import com.ssw555.babycare.Entity.Child;
import com.ssw555.babycare.Entity.Result;
import com.ssw555.babycare.Entity.User;
import com.ssw555.babycare.JWT.JWTUtils;
import com.ssw555.babycare.Repo.UserRepository;
import com.ssw555.babycare.controller.ChildController;
import com.ssw555.babycare.controller.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class BabyCareApplicationTests {

    @Autowired
    private UserController userController;

    @Autowired
    private ChildController childController;

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


    @Test
    void testGetChildByParent(){

        List<Child> childByParentIdBefore = childController.getChildByParentId(1);
        int sizeBefore=childByParentIdBefore.size();
        Child child1=new Child();
        child1.setParentId(1);
        Child child2=new Child();
        child2.setParentId(1);
        childController.save(child1);
        childController.save(child2);
        List<Child> childByParentIdAfter = childController.getChildByParentId(1);
        int sizeAfter=childByParentIdAfter.size();
        assertEquals(sizeAfter-sizeBefore, 2);

    }


}
