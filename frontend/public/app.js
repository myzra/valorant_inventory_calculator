class ValorantSkinPicker {
    constructor() {
        this.apiService = new ApiService();
        this.selectedSkins = {};
        this.currentCurrency = 'vp';
        this.weapons = [];
        this.weaponSkins = {};
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.loadPreferences();
            this.setupEventListeners();
            this.renderWeapons();
            this.updateTotalCost();
            this.hideLoadingScreen();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load weapons and skins. Please check your connection and try again.');
        }
    }

    async loadData() {
        try {
            const weaponsResponse = await this.apiService.getWeapons();
            if (weaponsResponse.success) {
                this.weapons = weaponsResponse.data;
            } else {
                throw new Error('Failed to fetch weapons');
            }
        } catch (error) {
            console.error('Error loading weapons:', error);
            throw error;
        }
    }

    loadPreferences() {
        const savedSkins = UTILS.storage.get(CONFIG.STORAGE.KEYS.SELECTED_SKINS);
        if (savedSkins) {
            this.selectedSkins = savedSkins;
        }

        const savedCurrency = UTILS.storage.get(CONFIG.STORAGE.KEYS.CURRENCY);
        if (savedCurrency) {
            this.currentCurrency = savedCurrency;
            this.updateCurrencyUI();
        }
    }

    savePreferences() {
        UTILS.storage.set(CONFIG.STORAGE.KEYS.SELECTED_SKINS, this.selectedSkins);
        UTILS.storage.set(CONFIG.STORAGE.KEYS.CURRENCY, this.currentCurrency);
    }

    setupEventListeners() {
        // Currency toggle buttons
        document.querySelectorAll('.currency-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCurrencyChange(e));
        });

        // Modal close events
        const modal = document.getElementById('skinModal');
        const closeBtn = document.getElementById('closeModal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // GitHub link
        const githubLink = document.getElementById('githubLink');
        if (githubLink) {
            githubLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(CONFIG.GITHUB_URL, '_blank');
            });
        }

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.savePreferences();
        });
    }

    renderWeapons() {
        const weaponsGrid = document.getElementById('weaponsGrid');
        weaponsGrid.innerHTML = '';
        
        const groupedWeapons = UTILS.groupBy(this.weapons, 'category');
        
        // Define category order
        const categoryOrder = ['Sidearms', 'SMGs', 'Shotguns', 'Rifles', 'Sniper Rifles', 'Machine Guns', 'Melee'];
        
        categoryOrder.forEach(category => {
            if (groupedWeapons[category]) {
                const categoryElement = UIComponents.createWeaponCategory(category, groupedWeapons[category]);
                weaponsGrid.appendChild(categoryElement);
                
                // Add click listeners to weapon slots
                const weaponSlots = categoryElement.querySelectorAll('.weapon-slot');
                weaponSlots.forEach(slot => {
                    slot.addEventListener('click', (e) => this.handleWeaponClick(e));
                });
            }
        });
        
        // Update weapon slots with selected skins
        this.updateAllWeaponSlots();
    }

    updateAllWeaponSlots() {
        Object.keys(this.selectedSkins).forEach(weaponId => {
            const weaponSlot = document.querySelector(`[data-weapon-id="${weaponId}"]`);
            if (weaponSlot) {
                UIComponents.updateWeaponSlotWithSkin(
                    weaponSlot, 
                    this.selectedSkins[weaponId], 
                    this.currentCurrency
                );
            }
        });
    }

    handleCurrencyChange(event) {
        const newCurrency = event.target.getAttribute('data-currency');
        if (newCurrency && newCurrency !== this.currentCurrency) {
            this.currentCurrency = newCurrency;
            
            // Update active button
            document.querySelectorAll('.currency-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Update UI
            this.updateTotalCost();
            this.updateAllWeaponSlots();
            this.savePreferences();
        }
    }

    async handleWeaponClick(event) {
        const weaponSlot = event.currentTarget;
        const weaponId = parseInt(weaponSlot.dataset.weaponId);
        const weapon = this.weapons.find(w => w.id === weaponId);
        
        if (weapon) {
            await this.openSkinModal(weapon);
        }
    }

    async openSkinModal(weapon) {
        const modal = document.getElementById('skinModal');
        const modalTitle = document.getElementById('modalTitle');
        const skinsGrid = document.getElementById('skinsGrid');

        modalTitle.textContent = `Choose ${weapon.name} Skin`;
        
        // Show loading state
        skinsGrid.innerHTML = '<div class="loading-spinner"></div>';
        
        try {
            // Fetch skins for this weapon if not cached
            if (!this.weaponSkins[weapon.id]) {
                const skinsResponse = await this.apiService.getSkinsForWeapon(weapon.id);
                if (skinsResponse.success) {
                    this.weaponSkins[weapon.id] = skinsResponse.data;
                } else {
                    throw new Error('Failed to fetch skins');
                }
            }
            
            // Clear and populate skins grid
            skinsGrid.innerHTML = '';
            
            const skins = this.weaponSkins[weapon.id];
            skins.forEach(skin => {
                const skinDiv = UIComponents.createSkinOption(skin, this.currentCurrency);
                
                // Mark as selected if it's the current selection
                if (this.selectedSkins[weapon.id] && this.selectedSkins[weapon.id].id === skin.id) {
                    skinDiv.classList.add('selected');
                }
                
                skinDiv.addEventListener('click', () => {
                    this.selectSkin(weapon.id, skin);
                    this.closeModal();
                });
                
                skinsGrid.appendChild(skinDiv);
            });
            
        } catch (error) {
            console.error('Error loading skins:', error);
            skinsGrid.innerHTML = '<div class="error-message">Failed to load skins. Please try again.</div>';
        }
        
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    closeModal() {
        const modal = document.getElementById('skinModal');
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    selectSkin(weaponId, skin) {
        this.selectedSkins[weaponId] = skin;
        
        const weaponSlot = document.querySelector(`[data-weapon-id="${weaponId}"]`);
        if (weaponSlot) {
            UIComponents.updateWeaponSlotWithSkin(weaponSlot, skin, this.currentCurrency);
        }
        
        this.updateTotalCost();
        this.savePreferences();
    }


    updateCurrencyUI() {
        const currencyBtn = document.querySelector(`[data-currency="${this.currentCurrency}"]`);
        if (currencyBtn) {
            document.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('active'));
            currencyBtn.classList.add('active');
        }
    }

    updateTotalCost() {
        let totalCost = 0;
    
        Object.values(this.selectedSkins).forEach(skin => {
            if (skin && skin.price != null) {
                let price = skin.price;
    
                // Wenn price ein Objekt ist, nimm die aktuell gewählte Währung
                if (typeof price === "object") {
                    price = price[this.currentCurrency] ?? 0;
                }
    
                totalCost += Number(price);
            }
        });
    
        const totalCostEl = document.getElementById('totalCost');
        if (totalCostEl) {
            totalCostEl.textContent = `TOTAL COST: ${UTILS.formatPrice(totalCost, this.currentCurrency)}`;
        }
    }
    

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContainer = document.getElementById('mainContainer');
        
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (mainContainer) {
                    mainContainer.style.display = 'block';
                }
            }, 500);
        }
    }

    showError(message) {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="loading-content">
                    <div class="logo">V</div>
                    <div class="error-message" style="margin-top: 20px;">
                        <h3>Error</h3>
                        <p>${message}</p>
                        <button onclick="window.location.reload()" style="margin-top: 15px; padding: 8px 16px; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Retry
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ValorantSkinPicker();
});