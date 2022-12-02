package com.ssw555.babycare.Repo;

import com.ssw555.babycare.Entity.Allergy;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface AllergyRepository extends CrudRepository<Allergy, Integer> {

    List<Allergy> findByChildId(int childId);

}






