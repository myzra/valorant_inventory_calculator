const UTILS = {
    formatPrice(price, currency = 'vp') {
        const symbol = CONFIG.CURRENCY.SYMBOLS[currency];
        let value = price;
        
        // Convert VP to other currencies
        if (currency === 'usd' && price > 0) {
            value = price * CONFIG.CURRENCY.EXCHANGE_RATES.vp_to_usd;
        } else if (currency === 'eur' && price > 0) {
            value = price * CONFIG.CURRENCY.EXCHANGE_RATES.vp_to_eur;
        }
        
        switch(currency) {
            case 'vp':
                return `${value} ${symbol}`;
            case 'usd':
            case 'eur':
                return `${symbol}${Number(value).toFixed(2)}`;
            default:
                return `${value} VP`;
        }
    },

    storage: {
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return null;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error writing to localStorage:', error);
                return false;
            }
        }
    },

    groupBy(array, key) {
        return array.reduce((groups, item) => {
            const group = item[key];
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(item);
            return groups;
        }, {});
    },

    showError(message, container = document.body) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="window.location.reload()" style="margin-top: 15px; padding: 8px 16px; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                Retry
            </button>
        `;
        container.appendChild(errorDiv);
    }
};