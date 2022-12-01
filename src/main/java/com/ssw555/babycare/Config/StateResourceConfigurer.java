package com.ssw555.babycare.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.util.ClassUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/*
 如果将要访问的静态资源放在项目的类路径下面即配置为"classpath:/BookPicture/"那么当该路径下的资      源发生变化时是不立即生效的，即只有重启后才能访问到变化的资源；
 解决办法将静态资源放在非项目类路径下即可 "file:F:/bookpicture/");即下面这句
  registry.addResourceHandler("/bookpicture/**").addResourceLocations("file:C:/bookpicture/"); 
*/
@Configuration
public class StateResourceConfigurer implements WebMvcConfigurer {
    /**
     * 配置访问静态资源
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
//        String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
        String path = System.getProperty("user.dir");

        registry.addResourceHandler("/music/**").addResourceLocations("file:"+path+"/music/");
    }
}