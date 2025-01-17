document.addEventListener('DOMContentLoaded', function() {
    // Form Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    // Validation Patterns
    const patterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^\+?[\d\s-]{10,}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
    };
    
    // Error Messages
    const errorMessages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        password: 'Password must be at least 8 characters long and contain letters and numbers',
        passwordMatch: 'Passwords do not match',
        terms: 'You must accept the terms and conditions'
    };
    
    // Toggle Password Visibility
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Validate Single Field
    function validateField(input, pattern) {
        const value = input.value.trim();
        const inputGroup = input.closest('.input-group');
        const errorElement = input.closest('.form-group').querySelector('.error-message');
        
        // Required Check
        if (input.hasAttribute('required') && !value) {
            showError(input, errorMessages.required);
            return false;
        }
        
        // Pattern Check
        if (pattern && value) {
            if (!pattern.test(value)) {
                showError(input, errorMessages[input.name]);
                return false;
            }
        }
        
        // Password Confirmation Check
        if (input.id === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (value !== password) {
                showError(input, errorMessages.passwordMatch);
                return false;
            }
        }
        
        // Terms Check
        if (input.id === 'terms' && !input.checked) {
            showError(input, errorMessages.terms);
            return false;
        }
        
        // Clear Error
        clearError(input);
        return true;
    }
    
    // Show Error
    function showError(input, message) {
        const inputGroup = input.closest('.input-group');
        const errorElement = input.closest('.form-group').querySelector('.error-message');
        
        if (inputGroup) inputGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Clear Error
    function clearError(input) {
        const inputGroup = input.closest('.input-group');
        const errorElement = input.closest('.form-group').querySelector('.error-message');
        
        if (inputGroup) inputGroup.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Handle Form Submit
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let isValid = true;
        
        // Validate all fields
        form.querySelectorAll('input, select').forEach(input => {
            const pattern = patterns[input.name];
            if (!validateField(input, pattern)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                // Here you would normally make an API call to your backend
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                console.log('Form submitted:', data);
                
                // Redirect to dashboard (in real app, this would happen after successful API response)
                window.location.href = '/dashboard.html';
            }, 1500);
        }
    }
    
    // Add form submit handlers
    if (loginForm) {
        loginForm.addEventListener('submit', handleSubmit);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleSubmit);
    }
    
    // Add input validation on blur
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this, patterns[this.name]);
        });
        
        // Clear error on focus
        input.addEventListener('focus', function() {
            clearError(this);
        });
    });
});
