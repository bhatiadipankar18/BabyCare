package com.ssw555.babycare;

import com.ssw555.babycare.JWT.JWTUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BabyCareApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testCreateToken(){
        String token = JWTUtils.createToken("1");
    }


    @Test
    void testCreateDuplicatedUserName(){
        String token = JWTUtils.createToken("1");
    }

}
