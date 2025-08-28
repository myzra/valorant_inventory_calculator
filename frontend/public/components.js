class UIComponents {
    static createWeaponCategory(category, weapons) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'weapon-category';
        
        const title = document.createElement('h3');
        title.textContent = category;
        categoryDiv.appendChild(title);
        
        const weaponGrid = document.createElement('div');
        weaponGrid.className = 'weapon-grid';
        
        weapons.forEach(weapon => {
            const weaponSlot = this.createWeaponSlot(weapon);
            weaponGrid.appendChild(weaponSlot);
        });
        
        categoryDiv.appendChild(weaponGrid);
        return categoryDiv;
    }

    static createWeaponSlot(weapon) {
        const weaponSlot = document.createElement('div');
        weaponSlot.className = 'weapon-slot';
        weaponSlot.dataset.weaponId = weapon.id;
        weaponSlot.dataset.weaponName = weapon.name.toLowerCase().replace(/\s+/g, '-');
        
        // Create Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'weapon-image-container';

        const weaponImage = document.createElement('img');
        weaponImage.className = 'weapon-image';
        weaponImage.src = weapon.image_url || this.getPlaceholderImage();
        weaponImage.alt = weapon.name;
        weaponImage.loading = 'lazy';

        // Add error handling for broken images
        weaponImage.onerror = () => {
            weaponImage.src = this.getPlaceholderImage();
        };

        imageContainer.appendChild(weaponImage);

        const weaponName = document.createElement('div');
        weaponName.className = 'weapon-name';
        weaponName.textContent = weapon.name;
        
        weaponSlot.appendChild(imageContainer);
        weaponSlot.appendChild(weaponName);
        return weaponSlot;
    }

    static createSkinOption(skin, currentCurrency) {
        const skinDiv = document.createElement('div');
        skinDiv.className = 'skin-option';
        skinDiv.dataset.skinId = skin.id;

        // Create image container for skin
        const imageContainer = document.createElement('div');
        imageContainer.className = 'skin-image-container';

        const skinImage = document.createElement('img');
        skinImage.className = 'skin-image';
        skinImage.src = skin.image_url || this.getPlaceholderImage();
        skinImage.alt = skin.skin_name;
        skinImage.loading = 'lazy';

        // Add error handling for broken images
        skinImage.onerror = () => {
            skinImage.src = this.getPlaceholderImage();
        };

        imageContainer.appendChild(skinImage);
        
        const skinInfo = document.createElement('div');
        skinInfo.className = 'skin-info';

        const skinName = document.createElement('div');
        skinName.className = 'skin-option-name';
        skinName.textContent = skin.skin_name;
        
        const skinPrice = document.createElement('div');
        skinPrice.className = 'skin-option-price';
        skinPrice.textContent = UTILS.formatPrice(skin.price, currentCurrency);
        
        const skinCollection = document.createElement('div');
        skinCollection.className = 'skin-option-collection';
        skinCollection.textContent = skin.skin_collection;
        
        const skinCategory = document.createElement('div');
        skinCategory.className = 'skin-option-category';
        skinCategory.textContent = skin.category;
        
        skinInfo.appendChild(skinName);
        skinInfo.appendChild(skinPrice);
        skinInfo.appendChild(skinCollection);
        skinInfo.appendChild(skinCategory);
        
        skinDiv.appendChild(imageContainer);
        skinDiv.appendChild(skinInfo);

        return skinDiv;
    }

    static updateWeaponSlotWithSkin(weaponSlot, skin, currentCurrency) {
        // Remove existing skin info
        const existingSkinName = weaponSlot.querySelector('.skin-name');
        const existingSkinPrice = weaponSlot.querySelector('.skin-price');
        if (existingSkinName) existingSkinName.remove();
        if (existingSkinPrice) existingSkinPrice.remove();
        
        // Update the weapon image
        const weaponImage = weaponSlot.querySelector('.weapon-image');

        if (skin && skin.skin_name !== 'Default') {
            weaponSlot.classList.add('selected');
            
            // Update image to show skin
            if (weaponImage && skin.image_url) {
                weaponImage.src = skin.image_url;
                weaponImage.alt = skin.skin_name;
            }

            const skinName = document.createElement('div');
            skinName.className = 'skin-name';
            skinName.textContent = skin.skin_name;
            
            const skinPrice = document.createElement('div');
            skinPrice.className = 'skin-price';
            skinPrice.textContent = UTILS.formatPrice(skin.price, currentCurrency);
            
            weaponSlot.appendChild(skinName);
            weaponSlot.appendChild(skinPrice);
        } else {
            weaponSlot.classList.remove('selected');

            // Reset image to default weapon image
            if (weaponImage) {
                const weaponId = weaponSlot.dataset.weaponId;
                const weaponName = weaponSlot.dataset.weaponName;

                // Try to get the default weapon image from the weapons data
                if (window.app && window.app.weapons) {
                    const weapon = window.app.weapons.find(w => w.id == weaponId);
                    if (weapon && weapon.image_url) {
                        weaponImage.src = weapon.image_url;
                        weaponImage.alt = weapon.name;
                    }
                }
            }
        }
    }

    static getPlaceholderImage() {
        // Return a placeholder image or data URL for when images fail to load
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0zNSAzNUw2NSA2NU0zNSA2NUw2NSAzNSIgc3Ryb2tlPSIjNEE0QTRBIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+';
    }
}