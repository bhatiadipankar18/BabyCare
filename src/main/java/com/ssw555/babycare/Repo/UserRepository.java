package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.User;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findUserByRole(int  role);

    User findByUsernameAndPassword(String username, String password);

    Optional<User> findUserByUsername(String username);

//
//    @Query(value = "INSERT INTO BabyCare_wxj.user (username, password, role, first_name, last_name) VALUES (?1, ?2, ?3, '', ''",nativeQuery = true)
//    Person findPersonByName(String username,String password,String role );



}






