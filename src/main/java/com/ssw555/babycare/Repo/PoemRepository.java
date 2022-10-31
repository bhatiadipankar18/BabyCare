package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.Child;
import com.ssw555.babycare.Entity.ParentChild;
import com.ssw555.babycare.Entity.Poem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface PoemRepository extends CrudRepository<Poem, Integer> {

    List<Poem> findByChildId(int childId);

}






