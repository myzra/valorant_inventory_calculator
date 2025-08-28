package com.myzra.val.service;

import com.myzra.val.model.Weapon;
import com.myzra.val.model.Skin;
import com.myzra.val.repository.WeaponRepository;
import com.myzra.val.repository.SkinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WeaponService {

    @Autowired
    private WeaponRepository weaponRepository;

    @Autowired
    private SkinRepository skinRepository;

    public List<Weapon> getAllWeapons() {
        return weaponRepository.findAllByOrderByCategory();
    }

    public Weapon getWeaponById(Long id) {
        Optional<Weapon> weapon = weaponRepository.findById(id);
        return weapon.orElse(null);
    }

    public List<Skin> getSkinsForWeapon(Long weaponId) {
        return skinRepository.findByWeaponIdOrderBySkinName(weaponId);
    }

    public List<Skin> getAllSkins() {
        return skinRepository.findAll();
    }

    // Additional methods for admin functionality (if needed)
    public Weapon saveWeapon(Weapon weapon) {
        return weaponRepository.save(weapon);
    }

    public Skin saveSkin(Skin skin) {
        return skinRepository.save(skin);
    }

    public void deleteWeapon(Long id) {
        weaponRepository.deleteById(id);
    }

    public void deleteSkin(Long id) {
        skinRepository.deleteById(id);
    }
}