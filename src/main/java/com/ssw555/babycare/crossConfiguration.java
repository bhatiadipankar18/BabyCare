package com.ssw555.babycare;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class crossConfiguration implements WebMvcConfigurer {

    //配置跨域问题
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .exposedHeaders("USER_LOGIN_TOKEN")
                .allowedOriginPatterns("*") //path allowed
                .allowedMethods("*") //method name allowed
                .allowCredentials(true)
                .maxAge(3600);
    }

    /*
  "code": 100,
  "message": "When allowCredentials is true, allowedOrigins cannot contain the special value \"*\"
  since that cannot be set on the \"Access-Control-Allow-Origin\" response header.
  To allow credentials to a set of origins, list them explicitly or consider using \"allowedOriginPatterns\" instead."
    * */
}
