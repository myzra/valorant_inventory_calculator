class ApiService {
    constructor() {
        this.baseUrl = CONFIG.API.BASE_URL;
    }

    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Main API calls - these will be used by your app
    async getWeapons() {
        try {
            const response = await this.request(CONFIG.API.ENDPOINTS.WEAPONS);
            
            // Transform the data to match your frontend expectations
            if (response.success && response.data) {
                return {
                    success: true,
                    data: response.data.map(weapon => ({
                        id: weapon.id,
                        name: weapon.name,
                        category: weapon.category,
                        image_url: weapon.imageUrl // Note: Spring Boot uses camelCase
                    }))
                };
            } else {
                throw new Error(response.message || 'Failed to fetch weapons');
            }
        } catch (error) {
            console.error('Error fetching weapons:', error);
            
            // Fallback to mock data if API fails (for development)
            if (CONFIG.USE_MOCK_DATA_ON_ERROR) {
                return this.getMockWeapons();
            }
            
            throw error;
        }
    }

    async getSkinsForWeapon(weaponId) {
        try {
            const response = await this.request(`${CONFIG.API.ENDPOINTS.SKINS}?weapon_id=${weaponId}`);
            
            // Transform the data to match your frontend expectations
            if (response.success && response.data) {
                return {
                    success: true,
                    data: response.data.map(skin => ({
                        id: skin.id,
                        weapon_id: skin.weaponId, // Transform camelCase to snake_case
                        skin_name: skin.skinName,
                        skin_collection: skin.skinCollection,
                        category: skin.category,
                        price: skin.price,
                        image_url: skin.imageUrl
                    }))
                };
            } else {
                throw new Error(response.message || 'Failed to fetch skins');
            }
        } catch (error) {
            console.error('Error fetching skins for weapon:', weaponId, error);
            
            // Fallback to mock data if API fails (for development)
            if (CONFIG.USE_MOCK_DATA_ON_ERROR) {
                return this.getMockSkinsForWeapon(weaponId);
            }
            
            throw error;
        }
    }

    // Get a single weapon by ID
    async getWeaponById(weaponId) {
        try {
            const response = await this.request(`${CONFIG.API.ENDPOINTS.WEAPONS}/${weaponId}`);
            
            if (response.success && response.data) {
                return {
                    success: true,
                    data: {
                        id: response.data.id,
                        name: response.data.name,
                        category: response.data.category,
                        image_url: response.data.imageUrl
                    }
                };
            } else {
                throw new Error(response.message || 'Failed to fetch weapon');
            }
        } catch (error) {
            console.error('Error fetching weapon:', weaponId, error);
            throw error;
        }
    }

    // Mock data methods (fallback for development)
    async getMockWeapons() {
        console.warn('Using mock data for weapons');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            data: [
                { id: 1, name: 'Classic', category: 'Sidearms', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/classic_default.png' },
                { id: 2, name: 'Shorty', category: 'Sidearms', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/shorty_default.png' },
                { id: 3, name: 'Frenzy', category: 'Sidearms', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/frenzy_default.png' },
                { id: 4, name: 'Ghost', category: 'Sidearms', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/ghost_default.png' },
                { id: 5, name: 'Sheriff', category: 'Sidearms', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/sheriff_default.png' },
                { id: 6, name: 'Stinger', category: 'SMGs', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/stinger_default.png' },
                { id: 7, name: 'Spectre', category: 'SMGs', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/spectre_default.png' },
                { id: 8, name: 'Bucky', category: 'Shotguns', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/bucky_default.png' },
                { id: 9, name: 'Judge', category: 'Shotguns', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/judge_default.png' },
                { id: 10, name: 'Bulldog', category: 'Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/bulldog_default.png' },
                { id: 11, name: 'Guardian', category: 'Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/guardian_default.png' },
                { id: 12, name: 'Phantom', category: 'Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/phantom_default.png' },
                { id: 13, name: 'Vandal', category: 'Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/vandal_default.png' },
                { id: 14, name: 'Marshal', category: 'Sniper Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/marshal_default.png' },
                { id: 15, name: 'Outlaw', category: 'Sniper Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/outlaw_default.png' },
                { id: 16, name: 'Operator', category: 'Sniper Rifles', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/operator_default.png' },
                { id: 17, name: 'Ares', category: 'Machine Guns', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/ares_default.png' },
                { id: 18, name: 'Odin', category: 'Machine Guns', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/odin_default.png' },
                { id: 19, name: 'Melee', category: 'Melee', image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/melee_default.png' }
            ]
        };
    }

    async getMockSkinsForWeapon(weaponId) {
        console.warn('Using mock data for skins');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockSkins = {
            1: [ // Classic
                { 
                    id: 1, 
                    weapon_id: 1, 
                    skin_name: 'Default', 
                    skin_collection: 'Base', 
                    category: 'Default', 
                    price: 0, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/classic_default.png' 
                },
                { 
                    id: 2, 
                    weapon_id: 1, 
                    skin_name: 'Prime Classic', 
                    skin_collection: 'Prime', 
                    category: 'Premium', 
                    price: 1775, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/classic_prime.png' 
                },
                { 
                    id: 3, 
                    weapon_id: 1, 
                    skin_name: 'Recon Classic', 
                    skin_collection: 'Recon', 
                    category: 'Select', 
                    price: 1075, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/classic_recon.png' 
                }
            ],
            12: [ // Phantom
                { 
                    id: 4, 
                    weapon_id: 12, 
                    skin_name: 'Default', 
                    skin_collection: 'Base', 
                    category: 'Default', 
                    price: 0, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/phantom_default.png' 
                },
                { 
                    id: 5, 
                    weapon_id: 12, 
                    skin_name: 'Oni Phantom', 
                    skin_collection: 'Oni', 
                    category: 'Premium', 
                    price: 1775, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/phantom_oni.png' 
                },
                { 
                    id: 6, 
                    weapon_id: 12, 
                    skin_name: 'Prime Phantom', 
                    skin_collection: 'Prime', 
                    category: 'Premium', 
                    price: 1775, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/phantom_prime.png' 
                },
                { 
                    id: 7, 
                    weapon_id: 12, 
                    skin_name: 'Spectrum Phantom', 
                    skin_collection: 'Spectrum', 
                    category: 'Ultra', 
                    price: 2175, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/phantom_spectrum.png' 
                }
            ],
            13: [ // Vandal
                { 
                    id: 8, 
                    weapon_id: 13, 
                    skin_name: 'Default', 
                    skin_collection: 'Base', 
                    category: 'Default', 
                    price: 0, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/vandal_default.png' 
                },
                { 
                    id: 9, 
                    weapon_id: 13, 
                    skin_name: 'Reaver Vandal', 
                    skin_collection: 'Reaver', 
                    category: 'Premium', 
                    price: 1775, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/vandal_reaver.png' 
                },
                { 
                    id: 10, 
                    weapon_id: 13, 
                    skin_name: 'Elderflame Vandal', 
                    skin_collection: 'Elderflame', 
                    category: 'Ultra', 
                    price: 2475, 
                    image_url: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/vandal_elderflame.png' 
                }
            ]
        };

        return {
            success: true,
            data: mockSkins[weaponId] || [
                { 
                    id: 0, 
                    weapon_id: weaponId, 
                    skin_name: 'Default', 
                    skin_collection: 'Base', 
                    category: 'Default', 
                    price: 0, 
                    image_url: null 
                }
            ]
        };
    }

    // Utility method to check API health
    async checkApiHealth() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch (error) {
            console.warn('API health check failed:', error);
            return false;
        }
    }
}