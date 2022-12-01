package com.ssw555.babycare.Repo;
//import com.ssw555.babycare.Entity.Child;
import com.ssw555.babycare.Entity.Medicine;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MedicineRepository extends CrudRepository<Medicine, Integer> {

    List<Medicine> findByChildId(int childId);

}






