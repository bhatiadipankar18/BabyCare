package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsernameAndPassword(String username,String password);

}






