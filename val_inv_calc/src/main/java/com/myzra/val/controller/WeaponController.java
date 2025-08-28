package com.myzra.val.controller;

import com.myzra.val.model.Weapon;
import com.myzra.val.model.Skin;
import com.myzra.val.model.ApiResponse;
import com.myzra.val.service.WeaponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://example.com"}, allowCredentials = "true")
public class WeaponController {

    @Autowired
    private WeaponService weaponService;

    @GetMapping("/weapons")
    public ResponseEntity<ApiResponse<List<Weapon>>> getAllWeapons() {
        try {
            List<Weapon> weapons = weaponService.getAllWeapons();
            return ResponseEntity.ok(new ApiResponse<>(true, weapons, "Weapons retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new ApiResponse<>(false, null, "Error retrieving weapons: " + e.getMessage()));
        }
    }

    @GetMapping("/skins")
    public ResponseEntity<ApiResponse<List<Skin>>> getSkinsForWeapon(@RequestParam("weapon_id") Long weaponId) {
        try {
            List<Skin> skins = weaponService.getSkinsForWeapon(weaponId);
            return ResponseEntity.ok(new ApiResponse<>(true, skins, "Skins retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new ApiResponse<>(false, null, "Error retrieving skins: " + e.getMessage()));
        }
    }

    @GetMapping("/weapons/{id}")
    public ResponseEntity<ApiResponse<Weapon>> getWeaponById(@PathVariable Long id) {
        try {
            Weapon weapon = weaponService.getWeaponById(id);
            if (weapon != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, weapon, "Weapon retrieved successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new ApiResponse<>(false, null, "Error retrieving weapon: " + e.getMessage()));
        }
    }
}