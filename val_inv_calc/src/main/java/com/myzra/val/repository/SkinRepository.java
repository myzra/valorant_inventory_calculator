package com.myzra.val.repository;

import com.myzra.val.model.Skin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkinRepository extends JpaRepository<Skin, Long> {
    
    List<Skin> findByWeaponId(Long weaponId);
    
    List<Skin> findByWeaponIdOrderBySkinName(Long weaponId);
    
    @Query("SELECT s FROM Skin s WHERE s.weaponId = :weaponId ORDER BY " +
           "CASE s.category " +
           "WHEN 'Default' THEN 1 " +
           "WHEN 'Select' THEN 2 " +
           "WHEN 'Deluxe' THEN 3 " +
           "WHEN 'Premium' THEN 4 " +
           "WHEN 'Ultra' THEN 5 " +
           "WHEN 'Exclusive' THEN 6 " +
           "ELSE 7 END, s.price")
    List<Skin> findByWeaponIdOrderedByCategory(@Param("weaponId") Long weaponId);
    
    List<Skin> findBySkinCollection(String skinCollection);
    
    List<Skin> findByCategory(String category);
    
    @Query("SELECT s FROM Skin s WHERE s.weaponId = :weaponId AND s.skinName = 'Default'")
    Skin findDefaultSkinByWeaponId(@Param("weaponId") Long weaponId);
}