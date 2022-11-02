package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.User;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findByUsernameAndPassword(String username, String password);

    List<User> findByUsername(String username);
}






