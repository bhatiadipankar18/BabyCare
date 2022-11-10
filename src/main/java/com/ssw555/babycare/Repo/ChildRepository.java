package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ChildRepository extends CrudRepository<Child, Integer> {

//    List<Child> findChildByParentId();
//
//    List<Child> findChildByNannyId();
}






