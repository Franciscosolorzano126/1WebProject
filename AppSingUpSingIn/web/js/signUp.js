import { User } from './user.js'

class singUpController {

    // Constructor
    constructor() {

        // Recuperamos el formulario
        this.form = document.querySelector('.register-card');

        // Recuperamos los campos
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.middleInitial = document.getElementById('middleInitial');

        this.prefix = document.getElementById('prefix');
        this.phone = document.getElementById('phone');

        this.street = document.getElementById('street');
        this.city = document.getElementById('city');
        this.state = document.getElementById('state');
        this.zip = document.getElementById('zip');

        this.email = document.getElementById('email');

        this.password = document.getElementById('password');
        this.repeatPassword = document.getElementById('repeatPassword');

        // Comprobamos que existe el formulario
        if (!this.form) {
            console.error('No se ha encontrado el formulario');
            return;
        }

        // Escuchamos el envío del formulario
        this.form.addEventListener('submit', (event) => {
            this.handleSubmit(event);
        });

        // Limpiamos los errores cuando el usuario modifica un campo
        this.form.querySelectorAll('input, select').forEach((field) => {
            field.addEventListener('input', () => {
                field.setCustomValidity('');
            });

            field.addEventListener('change', () => {
                field.setCustomValidity('');
            });
        });
    }

    // Método para comprobar los datos
    validateForm() {
        let valid = true;
        // Función auxiliar para mostrar errores
        const setError = (field, message) => {
            field.setCustomValidity(message);
            if (message !== '') {
                valid = false;
            }
        };

        // NOMBRE
        const namePattern = /^[\p{L}\s'-]+$/u;

        const firstName = this.firstName.value.trim();

        if (!namePattern.test(firstName)) {
            setError(this.firstName, 'Introduce un nombre válido.');
        }

        // APELLIDOS
        const lastName = this.lastName.value.trim();

        if (!namePattern.test(lastName)) {
            setError(this.lastName, 'Introduce unos apellidos válidos.');
        }

        // INICIAL DEL SEGUNDO NOMBRE (OPCIONAL)
        const middleInitial = this.middleInitial.value.trim();

        if (middleInitial !== '' && !/^\p{L}$/u.test(middleInitial)) {
            setError(this.middleInitial, 'Introduce solamente una letra.');
        }

        // TELÉFONO
        const phone = this.phone.value.trim();

        const phonePattern = /^[0-9\s().-]+$/;

        const phoneDigits = phone.replace(/\D/g, '');

        if (!phonePattern.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
            setError(this.phone, 'Introduce un teléfono válido de entre 7 y 15 dígitos.');
        }

        // PREFIJO
        if (!this.prefix.value) {
            setError(this.prefix, 'Selecciona un prefijo.');
        }

        // DIRECCIÓN
        const street = this.street.value.trim();

        if (street.length < 5) {
            setError(this.street, 'Introduce una dirección válida.');
        }

        // CIUDAD Y PROVINCIA
        const locationPattern = /^[\p{L}\s'-]+$/u;

        if (!locationPattern.test(this.city.value.trim())) {
            setError(this.city, 'Introduce una ciudad válida.');
        }

        if (!locationPattern.test(this.state.value.trim())) {
            setError(this.state, 'Introduce una provincia válida.');
        }

        // CÓDIGO POSTAL
        const zip = this.zip.value.trim();

        if (!/^[a-zA-Z0-9 -]{3,10}$/.test(zip)) {
            setError(this.zip, 'Introduce un código postal válido.');
        }

        // CORREO ELECTRÓNICO
        if (!this.email.validity.valid) {
            setError(this.email, 'Introduce un correo electrónico válido.');
        }

        // CONTRASEÑA
        const password = this.password.value;

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {
            setError(this.password, 'La contraseña necesita 8 caracteres, una mayúscula, una minúscula y un número.');
        }

        // REPETIR CONTRASEÑA
        if (this.repeatPassword.value !== password) {
            setError(this.repeatPassword, 'Las contraseñas no coinciden.');
        }
        return valid;
    }

    // Método que gestiona el envío
    handleSubmit(event) {

        event.preventDefault();

        // Comprobamos los datos
        if (!this.validateForm()) {
            // Mostramos el primer error encontrado
            this.form.reportValidity();
            return;
        }

        // Recogemos los datos
        const userData = {
            firstName: this.firstName.value.trim(),
            lastName: this.lastName.value.trim(),
            middleInitial: this.middleInitial.value.trim(),

            prefix: this.prefix.value,
            phone: this.phone.value.trim(),

            street: this.street.value.trim(),
            city: this.city.value.trim(),
            state: this.state.value.trim(),
            zip: this.zip.value.trim(),

            email: this.email.value.trim(),

            password: this.password.value
        };

        console.log('Datos del usuario:', userData);
        alert('¡Todos los datos son correctos!');
    }
}

// Creamos el controlador
const signUp = new singUpController();
