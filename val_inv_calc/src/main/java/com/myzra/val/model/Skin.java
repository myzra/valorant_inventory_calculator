package com.myzra.val.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "skins")
public class Skin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "weapon_id", nullable = false)
    private Long weaponId;

    @Column(name = "skin_name", nullable = false, length = 100)
    private String skinName;

    @Column(name = "skin_collection", length = 100)
    private String skinCollection;

    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "price")
    private Integer price;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "weapon_id", insertable = false, updatable = false)
    @JsonIgnore
    private Weapon weapon;

    // Constructors
    public Skin() {}

    public Skin(Long weaponId, String skinName, String skinCollection, String category, Integer price, String imageUrl) {
        this.weaponId = weaponId;
        this.skinName = skinName;
        this.skinCollection = skinCollection;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWeaponId() {
        return weaponId;
    }

    public void setWeaponId(Long weaponId) {
        this.weaponId = weaponId;
    }

    public String getSkinName() {
        return skinName;
    }

    public void setSkinName(String skinName) {
        this.skinName = skinName;
    }

    public String getSkinCollection() {
        return skinCollection;
    }

    public void setSkinCollection(String skinCollection) {
        this.skinCollection = skinCollection;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public void setWeapon(Weapon weapon) {
        this.weapon = weapon;
    }
}