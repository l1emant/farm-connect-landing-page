document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    if (!form) return;
    
    // Form Validation
    const validateForm = () => {
        let isValid = true;
        const fields = form.querySelectorAll('.form-control');
        
        fields.forEach(field => {
            field.classList.remove('error');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();

            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.id === 'password' && field.value.length < 8) {
                showError(field, 'Password must be at least 8 characters long');
                isValid = false;
            } else if (field.id === 'confirmPassword' && field.value !== form.querySelector('#password').value) {
                showError(field, 'Passwords do not match');
                isValid = false;
            }
        });

        return isValid;
    };

    // Show Error Message
    const showError = (field, message) => {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    };

    // Email Validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitBtn = form.querySelector('.form-btn');
        submitBtn.classList.add('loading');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success - redirect to index
            window.location.href = './index.html';
        } catch (error) {
            console.error('Registration failed:', error);
            showError(form.querySelector('#email'), 'Registration failed. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    // Real-time validation
    form.querySelectorAll('.form-control').forEach(field => {
        field.addEventListener('input', () => {
            field.classList.remove('error');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });

    // Password visibility toggle
    const togglePassword = (field) => {
        const type = field.getAttribute('type');
        field.setAttribute('type', type === 'password' ? 'text' : 'password');
    };

    document.querySelectorAll('input[type="password"]').forEach(field => {
        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fas fa-eye password-toggle';
        toggleIcon.style.position = 'absolute';
        toggleIcon.style.right = '1rem';
        toggleIcon.style.cursor = 'pointer';
        toggleIcon.style.opacity = '0.5';
        field.parentElement.appendChild(toggleIcon);

        toggleIcon.addEventListener('click', () => {
            togglePassword(field);
            toggleIcon.className = `fas fa-eye${field.type === 'password' ? '' : '-slash'} password-toggle`;
        });
    });
});
