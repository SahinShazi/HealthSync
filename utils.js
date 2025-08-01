// HealthSync 2040 - Utility Functions

// Error Handling and Validation Utilities
const HealthSyncUtils = {
    // DOM Element Validation
    isValidElement: function(element) {
        return element && element.nodeType === Node.ELEMENT_NODE;
    },

    // Safe DOM Query
    safeQuerySelector: function(selector, parent = document) {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    },

    safeQuerySelectorAll: function(selector, parent = document) {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return [];
        }
    },

    // Form Validation
    validateEmail: function(email) {
        if (!email || typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    },

    validatePhone: function(phone) {
        if (!phone || typeof phone !== 'string') return false;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    validateDate: function(dateString) {
        if (!dateString) return false;
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    },

    validateAge: function(dateOfBirth, minAge = 0, maxAge = 120) {
        if (!this.validateDate(dateOfBirth)) return false;
        const dob = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        return age >= minAge && age <= maxAge;
    },

    validateFutureDate: function(dateString) {
        if (!this.validateDate(dateString)) return false;
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    },

    // Error Display
    showError: function(element, message) {
        if (!this.isValidElement(element)) return;
        
        this.clearError(element);
        element.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--danger-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease;
        `;
        
        if (element.parentNode) {
            element.parentNode.appendChild(errorDiv);
        }
    },

    clearError: function(element) {
        if (!this.isValidElement(element)) return;
        
        element.classList.remove('error');
        const errorDiv = element.parentNode?.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    },

    clearAllErrors: function(form) {
        if (!this.isValidElement(form)) return;
        
        const errorDivs = form.querySelectorAll('.field-error');
        errorDivs.forEach(div => div.remove());
        
        const errorInputs = form.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    },

    // Success Message
    showSuccess: function(message, duration = 3000) {
        if (!message) return;
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv && successDiv.parentNode) {
                successDiv.remove();
            }
        }, duration);
    },

    // Loading States
    showLoading: function(element, text = 'Loading...') {
        if (!this.isValidElement(element)) return;
        
        element.disabled = true;
        element.dataset.originalText = element.textContent || element.innerHTML;
        element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    },

    hideLoading: function(element) {
        if (!this.isValidElement(element)) return;
        
        element.disabled = false;
        if (element.dataset.originalText) {
            element.innerHTML = element.dataset.originalText;
            delete element.dataset.originalText;
        }
    },

    // Browser Compatibility
    isIntersectionObserverSupported: function() {
        return 'IntersectionObserver' in window;
    },

    isLocalStorageSupported: function() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Data Formatting
    formatNumber: function(num) {
        if (typeof num !== 'number' || isNaN(num)) return '0';
        
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    },

    formatDate: function(date) {
        if (!date) return '';
        
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatTime: function(date) {
        if (!date) return '';
        
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        
        return d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Debounce Function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle Function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Local Storage Utilities
    setStorageItem: function(key, value) {
        if (!this.isLocalStorageSupported()) return false;
        
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
            return false;
        }
    },

    getStorageItem: function(key) {
        if (!this.isLocalStorageSupported()) return null;
        
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn('Failed to read from localStorage:', error);
            return null;
        }
    },

    removeStorageItem: function(key) {
        if (!this.isLocalStorageSupported()) return false;
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn('Failed to remove from localStorage:', error);
            return false;
        }
    },

    // Animation Utilities
    animateElement: function(element, animation, duration = 300) {
        if (!this.isValidElement(element)) return;
        
        element.style.animation = `${animation} ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    },

    // Scroll Utilities
    scrollToElement: function(element, offset = 0) {
        if (!this.isValidElement(element)) return;
        
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Copy to Clipboard
    copyToClipboard: function(text) {
        if (!text) return false;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                this.showSuccess('Copied to clipboard!');
                return true;
            }).catch(() => {
                return this.fallbackCopyToClipboard(text);
            });
        } else {
            return this.fallbackCopyToClipboard(text);
        }
    },

    fallbackCopyToClipboard: function(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showSuccess('Copied to clipboard!');
            return true;
        } catch (error) {
            console.warn('Failed to copy to clipboard:', error);
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    },

    // Health Metrics Validation
    validateHeartRate: function(rate) {
        return typeof rate === 'number' && rate >= 40 && rate <= 200;
    },

    validateBloodOxygen: function(oxygen) {
        return typeof oxygen === 'number' && oxygen >= 70 && oxygen <= 100;
    },

    validateTemperature: function(temp) {
        return typeof temp === 'number' && temp >= 35 && temp <= 42;
    },

    validateBloodPressure: function(systolic, diastolic) {
        return typeof systolic === 'number' && typeof diastolic === 'number' &&
               systolic >= 70 && systolic <= 200 &&
               diastolic >= 40 && diastolic <= 130;
    },

    // API Error Handling
    handleApiError: function(error, userMessage = 'An error occurred. Please try again.') {
        console.error('API Error:', error);
        
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const message = error.response.data?.message || userMessage;
            
            switch (status) {
                case 400:
                    this.showSuccess('Invalid request. Please check your input.', 5000);
                    break;
                case 401:
                    this.showSuccess('Please log in to continue.', 5000);
                    break;
                case 403:
                    this.showSuccess('You don\'t have permission to perform this action.', 5000);
                    break;
                case 404:
                    this.showSuccess('The requested resource was not found.', 5000);
                    break;
                case 500:
                    this.showSuccess('Server error. Please try again later.', 5000);
                    break;
                default:
                    this.showSuccess(message, 5000);
            }
        } else if (error.request) {
            // Network error
            this.showSuccess('Network error. Please check your connection.', 5000);
        } else {
            // Other error
            this.showSuccess(userMessage, 5000);
        }
    }
};

// Export for use in other scripts
window.HealthSyncUtils = HealthSyncUtils;

// Add CSS animations if not already present
if (!document.querySelector('#healthsync-utils-styles')) {
    const style = document.createElement('style');
    style.id = 'healthsync-utils-styles';
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .field-error {
            color: var(--danger-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease;
        }
        
        .error {
            border-color: var(--danger-color) !important;
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
        }
        
        .success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
} 