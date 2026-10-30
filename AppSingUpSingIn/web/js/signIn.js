
import { Costumer } from './user.js';

class SingIn {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.login-btn');
        this.successMessage = document.getElementById('successMessage');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());

        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));

        this.passwordToggle.addEventListener('click', () => this.togglePassword());
    }

    handleSubmit(e) {

    }

    validateEmail() {

    }

    validatePassword() {

    }

    clearError(field) {

    }

    togglePassword() {
        
    }
        
}

document.addEventListener('DOMContentLoaded', () => {
    new SingIn();
});
