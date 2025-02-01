// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';  // Your backend server URL

// Form Validation and Submission Handler
document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const phoneNumber = loginForm.querySelector('input[type="tel"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: phoneNumber, // Using phone number as username
                        password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Store the token
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('username', phoneNumber);
                    // Redirect to dashboard
                    window.location.href = '/index.html';
                } else {
                    alert(data.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }

    // Handle Registration Form
    const registerForm = document.querySelector('.login-form');  // Note: The class is login-form even in register.html
    if (registerForm && window.location.pathname.includes('register')) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = registerForm.querySelector('input[type="text"]').value;
            const phoneNumber = registerForm.querySelector('input[type="tel"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            const userType = registerForm.querySelector('select').value;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: phoneNumber, // Using phone number as username
                        email: `${phoneNumber}@farmconnect.com`, // Creating a placeholder email
                        password,
                        role: userType
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please login.');
                    window.location.href = '/login.html';
                } else {
                    alert(data.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    }
});
