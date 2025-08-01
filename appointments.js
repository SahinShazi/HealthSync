// HealthSync 2040 - Appointments JavaScript

// Initialize Appointments Page
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentForm();
    initializeAIDoctorSelection();
    initializeFormValidation();
    initializeDateValidation();
});

// Initialize Appointment Form
function initializeAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Form submission handler
    form.addEventListener('submit', handleFormSubmission);
}

// Handle Form Submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = new FormData(e.target);
        const appointmentData = Object.fromEntries(formData.entries());
        
        // Show loading state
        showLoadingState();
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingState();
            showSuccessMessage('Appointment booked successfully! You will receive a confirmation email shortly.');
            
            // Reset form
            resetForm();
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 2000);
    }
}

// Validate Form
function validateForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    // Clear previous errors
    clearAllErrors();

    // Check required fields
    requiredFields.forEach(field => {
        if (!field || !field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });

    // Validate email
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Validate phone number
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
            showFieldError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
    }

    // Validate date of birth
    const dobField = document.getElementById('dateOfBirth');
    if (dobField && dobField.value) {
        const dob = new Date(dobField.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 0 || age > 120) {
            showFieldError(dobField, 'Please enter a valid date of birth');
            isValid = false;
        }
    }

    // Validate appointment date
    const appointmentDateField = document.getElementById('preferredDate');
    if (appointmentDateField && appointmentDateField.value) {
        const appointmentDate = new Date(appointmentDateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (appointmentDate < today) {
            showFieldError(appointmentDateField, 'Appointment date cannot be in the past');
            isValid = false;
        }
    }

    // Check if AI doctor is selected
    const selectedDoctor = document.getElementById('selectedDoctor');
    if (!selectedDoctor || !selectedDoctor.value) {
        showGeneralError('Please select an AI doctor');
        isValid = false;
    }

    return isValid;
}

// Initialize AI Doctor Selection
function initializeAIDoctorSelection() {
    const doctorCards = document.querySelectorAll('.ai-doctor-card');
    
    doctorCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            doctorCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Update hidden input
            const doctorId = this.getAttribute('data-doctor');
            const selectedDoctorInput = document.getElementById('selectedDoctor');
            if (selectedDoctorInput) {
                selectedDoctorInput.value = doctorId;
            }
            
            // Update summary
            updateAppointmentSummary();
        });
    });
}

// Update Appointment Summary
function updateAppointmentSummary() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    // Get form values
    const appointmentType = document.getElementById('appointmentType').value;
    const selectedDoctor = document.getElementById('selectedDoctor').value;
    const preferredDate = document.getElementById('preferredDate').value;
    const preferredTime = document.getElementById('preferredTime').value;

    // Update summary display
    const summaryType = document.getElementById('summaryType');
    const summaryDoctor = document.getElementById('summaryDoctor');
    const summaryDateTime = document.getElementById('summaryDateTime');

    if (summaryType) {
        summaryType.textContent = appointmentType || 'Not selected';
    }

    if (summaryDoctor) {
        const doctorNames = {
            'dr-neural': 'Dr. Neural',
            'dr-cardio': 'Dr. Cardio',
            'dr-mind': 'Dr. Mind',
            'dr-nutri': 'Dr. Nutri'
        };
        summaryDoctor.textContent = doctorNames[selectedDoctor] || 'Not selected';
    }

    if (summaryDateTime) {
        if (preferredDate && preferredTime) {
            const date = new Date(preferredDate);
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            const time = preferredTime;
            summaryDateTime.textContent = `${formattedDate} at ${time}`;
        } else {
            summaryDateTime.textContent = 'Not selected';
        }
    }
}

// Initialize Form Validation
function initializeFormValidation() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    // Real-time validation
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
            updateAppointmentSummary();
        });
    });
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

// Initialize Date Validation
function initializeDateValidation() {
    const dateInput = document.getElementById('preferredDate');
    if (!dateInput) return;

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError(this, 'Appointment date cannot be in the past');
        } else {
            clearFieldError(this);
        }
    });
}

// Show Field Error
function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear Field Error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Clear All Errors
function clearAllErrors() {
    const errorFields = document.querySelectorAll('.field-error');
    errorFields.forEach(error => error.remove());
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

// Show General Error
function showGeneralError(message) {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'general-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--danger-color)';
    errorDiv.style.marginBottom = '1rem';
    errorDiv.style.padding = '0.75rem';
    errorDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    errorDiv.style.borderRadius = '10px';
    errorDiv.style.border = '1px solid var(--danger-color)';

    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show Success Message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.background = 'var(--success-color)';
    successDiv.style.color = 'white';
    successDiv.style.padding = '1rem 2rem';
    successDiv.style.borderRadius = '10px';
    successDiv.style.zIndex = '1000';
    successDiv.style.animation = 'slideIn 0.3s ease';

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show Loading State
function showLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    }
}

// Hide Loading State
function hideLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-calendar-check"></i> Book Appointment';
    }
}

// Reset Form
function resetForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    form.reset();
    
    // Clear AI doctor selection
    const doctorCards = document.querySelectorAll('.ai-doctor-card');
    doctorCards.forEach(card => card.classList.remove('selected'));
    
    const selectedDoctorInput = document.getElementById('selectedDoctor');
    if (selectedDoctorInput) {
        selectedDoctorInput.value = '';
    }
    
    // Clear all errors
    clearAllErrors();
    
    // Reset summary
    updateAppointmentSummary();
}

// Global reset function for button
window.resetForm = resetForm;

// Export functions for use in other scripts
window.Appointments = {
    validateForm,
    showSuccessMessage,
    showFieldError,
    clearFieldError,
    resetForm
}; 