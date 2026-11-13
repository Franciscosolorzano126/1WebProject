
// VERSION 1.5

import { User } from './user.js';

class SingIn {

    constructor() {

        this.form = document.getElementById('loginForm');

        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');

        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordEyeIcon = document.getElementById('passwordEyeIcon');

        this.submitButton = this.form.querySelector('.login-btn');

        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.successMessage = document.getElementById('successMessage');

        // EVENTOS DEL FORMULARIO
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // VALIDACIONES
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());

        // LIMPIAR ERRORES
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));

        // MOSTRAR / OCULTAR CONTRASEÑA
        this.passwordToggle.addEventListener('click', () => this.togglePassword());

    }

    // =====================================================
    // VALIDAR EMAIL
    // =====================================================

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

    // =====================================================
    // VALIDAR CONTRASEÑA
    // =====================================================

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

    // =====================================================
    // MOSTRAR ERRORES
    // =====================================================

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

    // =====================================================
    // LIMPIAR ERRORES
    // =====================================================

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

    // =====================================================
    // MOSTRAR / OCULTAR CONTRASEÑA
    // =====================================================

    togglePassword() {
        const isPassword = this.passwordInput.type === 'password';

        // CAMBIAR TIPO DEL INPUT
        this.passwordInput.type = isPassword ? 'text' : 'password';

        // CAMBIAR IMAGEN SVG
        this.passwordEyeIcon.src = isPassword
            ? '/AppSignUpSignIn/images/abierto.svg'
            : '/AppSignUpSignIn/images/tachado.svg';

        // ACTUALIZAR ACCESIBILIDAD
        const actionText = isPassword
            ? 'Ocultar contraseña'
            : 'Mostrar contraseña';

        this.passwordToggle.setAttribute('aria-label', actionText);
        this.passwordToggle.setAttribute('title', actionText);
        this.passwordToggle.setAttribute('aria-pressed', String(isPassword));

        // ACTUALIZAR ESTADO VISUAL
        this.passwordToggle.classList.toggle('active', isPassword);
    }

    // =====================================================
    // INICIAR SESIÓN
    // =====================================================
    async handleSubmit(e) {
        e.preventDefault();

        this.clearError('email');
        this.clearError('password');
        this.successMessage.style.display = 'none';

        // VALIDAR CAMPOS
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

      // const controller = new AbortController();

        let timeoutId;

        try {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'LOGGING IN...';

            // TEMPORIZADOR DE 6 SEGUNDOS
           /* timeoutId = setTimeout(() => {
                controller.abort();
            }, 6000);
             * 
            */

            // PETICIÓN AL SERVIDOR GLASSFISH
            const response = await fetch(
                'http://localhost:8080/AppSignUpSignIn/webresources/model.user',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                   // signal: controller.signal
                }
            );

            // COMPROBAR ESTADO HTTP
            if (!response.ok) {

                if (response.status >= 500) {

                    throw new Error(
                        'Error interno del servidor (HTTP ' +
                        response.status +
                        '). Intentalo más tarde'
                    );

                } else if (response.status === 404) {

                    throw new Error(
                        'Recurso no encontrado con el servidor (Error 404). Intentalo más tarde'
                    );

                } else {

                    throw new Error(
                        'Error del servidor: HTTP ' + response.status
                    );

                }

            }

            // RECIBIR JSON
            let usersJSON;

            try {

                usersJSON = await response.json();

            } catch (jsonError) {

                throw new Error(
                    'Error al leer los datos JSON del servidor. Comprueba la respuesta de GlassFish.'
                );

            }

            console.log('JSON recibido:', usersJSON);

            // COMPROBAR QUE SEA UN ARRAY
            if (!Array.isArray(usersJSON)) {

                throw new Error(
                    'El servidor no devuelve una lista JSON válida.'
                );

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

            // COMPROBAR CREDENCIALES
            if (!user) {

                throw new Error(
                    'Correo electrónico o contraseña incorrectos.'
                );

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

            // TIEMPO DE ESPERA AGOTADO
            if (error.name === 'AbortError') {

                this.showError(
                    'password',
                    'Error con la base de datos o servidor. Intentalo más tarde.'
                );

            }

            // GLASSFISH APAGADO O SIN CONEXIÓN
            else if (error instanceof TypeError) {

                this.showError(
                    'password',
                    'Error crítico: No se puede conectar con el servidor. Intentalo más tarde.'
                );

            }

            // ERROR HTTP, JSON O CREDENCIALES
            else {

                this.showError(
                    'password',
                    error.message
                );

            }

        } finally {

            // LIMPIAR TEMPORIZADOR
            clearTimeout(timeoutId);

            // RESTAURAR BOTÓN
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'LOGIN';

        }

    }

}

// =========================================================
// CARGAR LOGIN CUANDO EL DOM ESTÉ LISTO
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    new SingIn();
});
