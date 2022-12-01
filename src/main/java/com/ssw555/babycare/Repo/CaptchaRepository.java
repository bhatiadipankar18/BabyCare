package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.Captcha;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface CaptchaRepository extends CrudRepository<Captcha, Integer> {

    List<Captcha> findCaptchaByPhone(String phone);


}






