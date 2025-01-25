// Create a shared validation module
export const validateForm = (form) => {
    const errors = {};
    
    // Phone validation
    const phoneField = form.querySelector('[type="tel"]');
    if (phoneField && !isValidPhone(phoneField.value)) {
        errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Password validation
    const passwordField = form.querySelector('[type="password"]');
    if (passwordField && !isValidPassword(passwordField.value)) {
        errors.password = 'Password must be at least 8 characters with numbers and letters';
    }
    
    return errors;
};

const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
};

const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}; 