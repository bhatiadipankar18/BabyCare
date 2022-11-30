package com.ssw555.babycare.Repo;
import com.ssw555.babycare.Entity.Feeding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedingRepository extends JpaRepository<Feeding, Integer> {
    List<Feeding> findByChildId(int childId);
}






