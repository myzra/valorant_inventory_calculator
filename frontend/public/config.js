const CONFIG = {
    API: {
        BASE_URL: 'http://localhost:8000/api', // springboot app URL
        ENDPOINTS: {
            WEAPONS: '/weapons',
            SKINS: '/skins'
        }
    },
    CURRENCY: {
        SYMBOLS: {
            vp: 'VP',
            usd: '$',
            eur: '€'
        },
        EXCHANGE_RATES: {
            // VP to other currencies (approximate)
            vp_to_usd: 0.01,
            vp_to_eur: 0.0095
        }
    },
    STORAGE: {
        KEYS: {
            SELECTED_SKINS: 'valorant_selected_skins',
            CURRENCY: 'valorant_currency'
        }
    },
    // Development settings
    USE_MOCK_DATA_ON_ERROR: true,

    // Image settings
    IMAGE: {
        DEFAULT_WEAPON_PATH: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/weapons/',
        DEFAULT_SKIN_PATH: 'https://buaqzzerwtfuhcgmedef.supabase.co/storage/v1/object/public/valorant-skins/skins/',
        PLACEHOLDER: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0zNSAzNUw2NSA2NU0zNSA2NUw2NSAzNSIgc3Ryb2tlPSIjNEE0QTRBIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'
    },

    // Application settings
    APP: {
        LOADING_DELAY: 500, // Minimum loading time in milliseconds
        ANIMATION_DURATION: 300, // Modal animation duration
        MAX_RETRIES: 3 // Maximum API retry attempts
    },

    GITHUB_URL: 'https://github.com/myzra/valorant_inventory_calculator'
};