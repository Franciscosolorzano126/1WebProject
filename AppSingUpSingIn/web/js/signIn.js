
import { User } from './user.js';

class SingIn {

    constructor() {
        this.form = document.getElementById('loginForm');

        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');

        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.login-btn');

        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.successMessage = document.getElementById('successMessage');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());

        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));

        this.passwordToggle.addEventListener('click', () => this.togglePassword());
    }

    validateEmail() {
        const email = this.emailInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showError('email', 'El correo electrónico es obligatorio.');
            return false;
        }

        if (!emailRegex.test(email)) {
            this.showError('email', 'Introduce un correo válido.');
            return false;
        }

        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;

        if (!password) {
            this.showError('password', 'La contraseña es obligatoria.');
            return false;
        }

        if (password.length < 6) {
            this.showError('password', 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }

        return true;
    }

    showError(field, message) {

        const errorElement = field === 'email'
            ? this.emailError
            : this.passwordError;

        const inputElement = field === 'email'
            ? this.emailInput
            : this.passwordInput;

        inputElement.classList.add('error');

        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearError(field) {

        const errorElement = field === 'email'
            ? this.emailError
            : this.passwordError;

        const inputElement = field === 'email'
            ? this.emailInput
            : this.passwordInput;

        inputElement.classList.remove('error');

        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    togglePassword() {

        const isPassword = this.passwordInput.type === 'password';

        this.passwordInput.type = isPassword ? 'text' : 'password';

        this.passwordToggle.classList.toggle('active');

        const icon = this.passwordToggle.querySelector('i');

        if (icon) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    }

    async handleSubmit(e) {

        e.preventDefault();

        this.clearError('email');
        this.clearError('password');

        this.successMessage.style.display = 'none';

        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        try {

            this.submitButton.disabled = true;
            this.submitButton.textContent = 'LOGGING IN...';

            // PETICIÓN AL SERVIDOR GLASSFISH

            const response = await fetch(
                'http://localhost:8080/AppSignUpSignIn/webresources/model.user',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Error del servidor: ' + response.status);
            }

            // RECIBIR JSON

            const usersJSON = await response.json();

            console.log('JSON recibido:', usersJSON);

            if (!Array.isArray(usersJSON)) {
                throw new Error('El servidor no devuelve una lista JSON.');
            }

            // CONVERTIR JSON A OBJETOS USER

            const users = usersJSON.map(json => User.fromJSON(json));

            // BUSCAR USUARIO

            const user = users.find(u => {

                return (
                    String(u.email || '').trim().toLowerCase() === email.toLowerCase() &&
                    String(u.password || '').trim() === password
                );

            });

            console.log('Usuario encontrado:', user);

            if (!user) {
                throw new Error('Invalid email or password.');
            }

            // LOGIN CORRECTO

            this.successMessage.textContent = '¡Inicio de sesión exitoso!';
            this.successMessage.style.display = 'block';

            // GUARDAR USUARIO

            sessionStorage.setItem('loggedUser', JSON.stringify({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }));

            // REDIRECCIÓN

            setTimeout(() => {
                window.location.href = './welcome.html';
            }, 1000);

        } catch (error) {

            console.error('Error en el login:', error);

            this.showError('email', error.message);

            this.submitButton.disabled = false;
            this.submitButton.textContent = 'LOGIN';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SingIn();
});
