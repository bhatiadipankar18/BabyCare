package com.ssw555.babycare.Repo;

import com.ssw555.babycare.Entity.Vaccine;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface VaccineRepository extends CrudRepository<Vaccine, Integer>{

    List<Vaccine> findByChildId(int childId);
}
