package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.ParentChild;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ParentChildRepository extends CrudRepository<ParentChild, Integer> {

    List<ParentChild> findByParentId(int parentId);

//
//    @Query(value = "select * from person  where name = ?1",nativeQuery = true)
//
//    List<ParentChild> findByParentId(int parentId);

}






