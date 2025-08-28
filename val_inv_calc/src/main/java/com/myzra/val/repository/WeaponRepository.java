package com.myzra.val.repository;

import com.myzra.val.model.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeaponRepository extends JpaRepository<Weapon, Long> {
    
    List<Weapon> findAllByOrderByCategory();
    
    List<Weapon> findByCategory(String category);
    
    @Query("SELECT w FROM Weapon w ORDER BY " +
           "CASE w.category " +
           "WHEN 'Sidearms' THEN 1 " +
           "WHEN 'SMGs' THEN 2 " +
           "WHEN 'Shotguns' THEN 3 " +
           "WHEN 'Rifles' THEN 4 " +
           "WHEN 'Sniper Rifles' THEN 5 " +
           "WHEN 'Machine Guns' THEN 6 " +
           "WHEN 'Melee' THEN 7 " +
           "ELSE 8 END, w.name")
    List<Weapon> findAllOrderedByCustomCategory();
}