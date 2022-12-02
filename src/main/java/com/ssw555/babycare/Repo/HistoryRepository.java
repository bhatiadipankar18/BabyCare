package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.History;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface HistoryRepository extends CrudRepository<History, Integer> {

    List<History> findByChildId(int childId);

}






