//Version 1.2

class singUpController {

    // CONSTRUCTOR
    // Se ejecuta automáticamente cuando creamos el controlador.
    constructor() {
        // Recuperamos el formulario de registro del HTML.
        this.form = document.querySelector('.register-card');
        // Comprobamos que el formulario existe.
        if (!this.form) {
            console.error('No se ha encontrado el formulario');
            // Si no existe, detenemos la ejecución.
            return;
        }

        // Recuperamos el botón de registro.
        this.submitButton = this.form.querySelector('button[type="submit"]');

        // Recuperamos el espacio para mostrar errores del servidor.
        this.serverError = document.getElementById('serverError');

        // Recuperamos el espacio para mostrar mensajes de éxito.
        this.successMessage = document.getElementById('successMessage');

        // Recuperamos los campos personales.
        this.firstName = document.getElementById('firstName');
        // Recuperamos el espacio donde mostraremos el error del nombre.
        this.firstNameError = document.getElementById('firstNameError');

        this.lastName = document.getElementById('lastName');
        // Recuperamos el elemento donde mostraremos el mensaje de error del apellido.
        this.lastNameError = document.getElementById('lastNameError');

        this.middleInitial = document.getElementById('middleInitial');
        // Recuperamos el elemento donde mostraremos el mensaje de error de Middle Initial.
        this.middleInitialError = document.getElementById('middleInitialError');

        // Recuperamos los campos del teléfono.
        this.prefix = document.getElementById('prefix');
        this.phone = document.getElementById('phone');
        // Recuperamos el elemento donde mostraremos el mensaje de error del teléfono.
        this.phoneError = document.getElementById('phoneError');

        // Recuperamos los campos de dirección.
        this.street = document.getElementById('street');
        // Recuperamos el elemento donde mostraremos el mensaje de error de la dirección.
        this.streetError = document.getElementById('streetError');

        this.city = document.getElementById('city');
        // Recuperamos el elemento donde mostraremos el mensaje de error de la ciudad.
        this.cityError = document.getElementById('cityError');

        this.state = document.getElementById('state');
        // Recuperamos el elemento donde mostraremos el mensaje de error de la provincia.
        this.stateError = document.getElementById('stateError');

        this.zip = document.getElementById('zip');
        // Recuperamos el elemento donde mostraremos el mensaje de error del código postal.
        this.zipError = document.getElementById('zipError');

        // Recuperamos el campo del correo electrónico.
        this.email = document.getElementById('email');
        // Recuperamos el elemento donde mostraremos el mensaje de error del correo electrónico.
        this.emailError = document.getElementById('emailError');


        // Recuperamos los campos de contraseña.
        this.password = document.getElementById('password');
        // Recuperamos el elemento donde mostraremos el mensaje de error de la contraseña.
        this.passwordError = document.getElementById('passwordError');

        this.repeatPassword = document.getElementById('repeatPassword');
        // Recuperamos el elemento donde mostraremos el mensaje de error de la confirmación de contraseña.
        this.repeatPasswordError = document.getElementById('repeatPasswordError');

        // Escuchamos el evento submit del formulario.
        // Cuando el usuario pulsa el botón de registro,
        // se ejecuta el método handleSubmit().
        this.form.addEventListener('submit', (event) => {
            this.handleSubmit(event);
        });

        // Recuperamos todos los campos input y select.
        // Cuando el usuario modifica un campo, eliminamos
        // el mensaje de error que pudiera tener.
        this.form.querySelectorAll('input, select').forEach((field) => {
            // Evento que se ejecuta al escribir en un campo.
            field.addEventListener('input', () => {
                field.setCustomValidity('');
            });

            // Evento que se ejecuta al cambiar una opción.
            field.addEventListener('change', () => {
                field.setCustomValidity('');
            });
        });

        // MOSTRAR / OCULTAR CONTRASEÑA
        this.form.querySelectorAll('.eye').forEach((button) => {
            button.addEventListener('click', () => this.togglePassword(button));
        });
    }

    // =====================================================
    // MOSTRAR / OCULTAR CONTRASEÑA
    // =====================================================

    togglePassword(button) {

        const passwordInput = document.getElementById(button.dataset.target);
        const passwordEyeIcon = button.querySelector('img');

        const isPassword = passwordInput.type === 'password';

        // CAMBIAR TIPO DEL INPUT
        passwordInput.type = isPassword ? 'text' : 'password';

        // CAMBIAR IMAGEN SVG
        passwordEyeIcon.src = isPassword
            ? '/AppSignUpSignIn/images/abierto.svg'
            : '/AppSignUpSignIn/images/tachado.svg';

        // ACTUALIZAR ACCESIBILIDAD
        const actionText = isPassword
            ? 'Ocultar contraseña'
            : 'Mostrar contraseña';

        button.setAttribute('aria-label', actionText);
        button.setAttribute('title', actionText);
        button.setAttribute('aria-pressed', String(isPassword));

        // ACTUALIZAR ESTADO VISUAL
        button.classList.toggle('active', isPassword);

    }

    // MÉTODO PARA MOSTRAR ERRORES DEL SERVIDOR.
    showServerError(message) {

        // Mostramos el mensaje de error en el HTML.
        this.serverError.textContent = message;

        // Hacemos visible el mensaje.
        this.serverError.style.display = 'block';

        // Ocultamos cualquier mensaje de éxito anterior.
        this.successMessage.textContent = '';
        this.successMessage.style.display = 'none';
    }

    // MÉTODO PARA LIMPIAR LOS MENSAJES DEL SERVIDOR.
    clearServerMessages() {
        // Eliminamos el mensaje de error anterior.
        this.serverError.textContent = '';
        this.serverError.style.display = 'none';

        // Eliminamos el mensaje de éxito anterior.
        this.successMessage.textContent = '';
        this.successMessage.style.display = 'none';
    }

    // MÉTODO PARA VALIDAR LOS DATOS DEL FORMULARIO.
    validateForm() {

        // Variable que indica si el formulario es válido.
        let valid = true;

        // Función auxiliar para mostrar mensajes de error.
        // Recibe el campo que tiene el error y el mensaje que queremos mostrar.
        const setError = (field, message) => {

            // Establecemos un mensaje de validación personalizado.
            field.setCustomValidity(message);

            // Si hay un mensaje, significa que el campo no es válido.
            if (message !== '') {
                valid = false;
            }
        };

        // VALIDACIÓN DEL NOMBRE.
        // Recuperamos el nombre y eliminamos espacios sobrantes.
        const firstName = this.firstName.value.trim();

        // Expresión regular para permitir letras, espacios, guiones y apóstrofes.
        const namePattern = /^[\p{L}\s'-]+$/u;

        // Comprobamos si el nombre está vacío.
        if (firstName === '') {
            setError(this.firstName, 'Nombre obligatorio.');
            this.firstNameError.textContent = 'Nombre obligatorio.';
        }
        // Comprobamos si contiene caracteres no permitidos.
        else if (!namePattern.test(firstName)) {
            setError(this.firstName, 'Introduzca solo letras y espacios.');
            this.firstNameError.textContent = 'Introduzca solo letras y espacios.';
        }
        // Si es correcto, eliminamos el mensaje de error.
        else {
            this.firstName.setCustomValidity('');
            this.firstNameError.textContent = '';
        }

        // VALIDACIÓN DE LOS APELLIDOS.
        // Recuperamos el apellido y eliminamos los espacios sobrantes.
        const lastName = this.lastName.value.trim();

        // Comprobamos si el apellido está vacío.
        if (lastName === '') {
            setError(this.lastName, 'Apellido obligatorio.');
            // Mostramos el mensaje de error debajo del campo.
            this.lastNameError.textContent = 'Apellido obligatorio.';
        }

        // Comprobamos si contiene caracteres no permitidos.
        else if (!namePattern.test(lastName)) {
            setError(this.lastName, 'Introduzca un apellido valido.');
            // Mostramos el mensaje de error debajo del campo.
            this.lastNameError.textContent = 'Introduzca un apellido valido.';
        }

        // Si el apellido es correcto, limpiamos el error.
        else {
            this.lastName.setCustomValidity('');
            this.lastNameError.textContent = '';
        }

        // VALIDACIÓN DE LA INICIAL DEL SEGUNDO NOMBRE (OPCIONAL).
        // Recuperamos el valor y eliminamos los espacios sobrantes.
        const middleInitial = this.middleInitial.value.trim();

        // Comprobamos que, si se introduce una inicial, sea una única letra.
        const initialPattern = /^[\p{L}]$/u;

        // Si el campo contiene algún valor, comprobamos que sea válido.
        if (middleInitial !== '' && !initialPattern.test(middleInitial)) {
            // Establecemos el mensaje de error para la validación del navegador.
            setError(this.middleInitial, 'Enter only one letter.');
            // Mostramos el mensaje de error debajo del campo.
            this.middleInitialError.textContent = 'Enter only one letter.';
        } else {
            // Si está vacío o contiene una única letra, el campo es válido.
            this.middleInitial.setCustomValidity('');
            // Limpiamos el mensaje de error.
            this.middleInitialError.textContent = '';
        }

        // VALIDACIÓN DEL TELÉFONO.
        // Recuperamos el número y eliminamos los espacios sobrantes.
        const phone = this.phone.value.trim();

        // Permitimos números, espacios, paréntesis, puntos y guiones.
        const phonePattern = /^[0-9\s().-]+$/;

        // Eliminamos los caracteres que no sean números.
        const phoneDigits = phone.replace(/\D/g, '');

        // Comprobamos si el teléfono está vacío.
        if (phone === '') {
            // Establecemos el mensaje de error para el navegador.
            setError(this.phone, 'El teléfono es obligatorio.');
            // Mostramos el mensaje debajo del campo.
            this.phoneError.textContent = 'El teléfono es obligatorio.';
        }
        // Comprobamos el formato y la longitud del teléfono.
        else if (!phonePattern.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
            setError(this.phone, 'Introduce un teléfono válido de entre 7 y 15 dígitos.');
            // Mostramos el mensaje de error debajo del campo.
            this.phoneError.textContent = 'Introduce un teléfono válido de entre 7 y 15 dígitos.';
        }
        // Si el teléfono es correcto, limpiamos el error.
        else {
            this.phone.setCustomValidity('');
            this.phoneError.textContent = '';
        }

        // VALIDACIÓN DEL PREFIJO TELEFÓNICO.

        // Comprobamos que el usuario haya seleccionado un prefijo.
        if (!this.prefix.value) {
            // Establecemos el mensaje de error para el navegador.
            setError(this.prefix, 'Selecciona un prefijo telefónico.');
            // Mostramos el mensaje de error debajo del teléfono.
            this.phoneError.textContent = 'Selecciona un prefijo telefónico.';
        }
        // Si el prefijo es correcto, limpiamos el error.
        else {
            this.prefix.setCustomValidity('');
        }

        // VALIDACIÓN DE LA DIRECCIÓN.
        // Recuperamos la dirección y eliminamos los espacios sobrantes.
        const street = this.street.value.trim();

        // Comprobamos si el campo está vacío.
        if (street === '') {
            // Establecemos el mensaje de error para el navegador.
            setError(this.street, 'Street is required.');
            // Mostramos el mensaje debajo del campo.
            this.streetError.textContent = 'Street is required.';
        }
        // Comprobamos que la dirección tenga al menos 5 caracteres.
        else if (street.length < 5) {
            setError(this.street, 'Enter a valid street address.');
            // Mostramos el mensaje debajo del campo.
            this.streetError.textContent = 'Enter a valid street address.';
        }
        // Si la dirección es correcta, eliminamos el error.
        else {
            this.street.setCustomValidity('');
            this.streetError.textContent = '';
        }

        // VALIDACIÓN DE LA CIUDAD Y LA PROVINCIA.
        // Permitimos letras, espacios, guiones y apóstrofes.
        const locationPattern = /^[\p{L}\s'-]+$/u;

        // Recuperamos el nombre de la ciudad y eliminamos espacios sobrantes.
        const city = this.city.value.trim();

        // Comprobamos si la ciudad está vacía.
        if (city === '') {
            setError(this.city, 'City is required.');
            this.cityError.textContent = 'City is required.';
        }
        // Comprobamos si la ciudad tiene un formato válido.
        else if (!locationPattern.test(city)) {
            setError(this.city, 'Enter a valid city.');
            this.cityError.textContent = 'Enter a valid city.';
        }
        // Si la ciudad es correcta, eliminamos el error.
        else {
            this.city.setCustomValidity('');
            this.cityError.textContent = '';
        }

        // Recuperamos la provincia y eliminamos espacios sobrantes.
        const state = this.state.value.trim();

        // Comprobamos si la provincia está vacía.
        if (state === '') {
            setError(this.state, 'State is required.');
            this.stateError.textContent = 'State is required.';
        }
        // Comprobamos si la provincia tiene un formato válido.
        else if (!locationPattern.test(state)) {
            setError(this.state, 'Enter a valid state or province.');
            this.stateError.textContent = 'Enter a valid state or province.';
        }
        // Si la provincia es correcta, eliminamos el error.
        else {
            this.state.setCustomValidity('');
            this.stateError.textContent = '';
        }

        // VALIDACIÓN DEL CÓDIGO POSTAL.
        // Recuperamos el código postal y eliminamos espacios sobrantes.
        const zip = this.zip.value.trim();

        // Permitimos códigos postales de entre 3 y 9 números.
        // Utilizamos números porque el campo ZIP de nuestra entidad Java está definido como Integer.
        if (zip === '') {
            // Establecemos el mensaje de error para el navegador.
            setError(this.zip, 'ZIP code is required.');
            // Mostramos el mensaje debajo del campo.
            this.zipError.textContent = 'ZIP code is required.';
        }

        // Comprobamos que el código postal tenga entre 3 y 9 dígitos.
        else if (!/^\d{3,9}$/.test(zip)) {
            setError(this.zip, 'Enter a valid ZIP code.');
            // Mostramos el mensaje debajo del campo.
            this.zipError.textContent = 'Enter a valid ZIP code.';
        }
        // Si el código postal es correcto, eliminamos el error.
        else {
            this.zip.setCustomValidity('');
            this.zipError.textContent = '';
        }

        // VALIDACIÓN DEL CORREO ELECTRÓNICO.
        // Recuperamos el correo y eliminamos los espacios sobrantes.
        const email = this.email.value.trim();

        // Expresión regular para comprobar el formato del correo electrónico.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Comprobamos si el campo está vacío.
        if (email === '') {
            // Establecemos el mensaje de error para el navegador.
            setError(this.email, 'Email is required.');
            // Mostramos el mensaje debajo del campo.
            this.emailError.textContent = 'Email is required.';
        }
        // Comprobamos si el correo tiene un formato incorrecto.
        else if (!emailPattern.test(email)) {
            // Establecemos el mensaje de error para el navegador.
            setError(this.email, 'Enter a valid email address.');
            // Mostramos el mensaje debajo del campo.
            this.emailError.textContent = 'Enter a valid email address.';
        }
        // Si el correo es correcto, eliminamos el error.
        else {
            this.email.setCustomValidity('');
            this.emailError.textContent = '';
        }

        // VALIDACIÓN DE LA CONTRASEÑA.

        // Recuperamos la contraseña introducida por el usuario.
        const password = this.password.value;

        // La contraseña debe contener:
        // - Una letra minúscula.
        // - Una letra mayúscula.
        // - Un número.
        // - Un carácter especial.
        // - Un mínimo de 8 caracteres.
        // - Ningún espacio.

        // Expresión regular para comprobar todos los requisitos.
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?=\S+$).{8,}$/;

        // Comprobamos si el campo está vacío.
        if (password === '') {
            // Establecemos el mensaje de error para el navegador.
            setError(this.password, 'Password is required.');
            // Mostramos el mensaje debajo del campo.
            this.passwordError.textContent = 'Password is required.';
        }
        // Comprobamos si la contraseña cumple todos los requisitos.
        else if (!passwordPattern.test(password)) {
            setError(this.password, 'Password must have at least 8 characters, uppercase, lowercase, a number and a special character, without spaces.');
            // Mostramos el mensaje de error debajo del campo.
            this.passwordError.textContent = 'Use at least 8 characters, uppercase, lowercase, a number and a special character. No spaces.';
        }
        // Si la contraseña es correcta, eliminamos el error.
        else {
            this.password.setCustomValidity('');
            this.passwordError.textContent = '';
        }

        // VALIDACIÓN DE REPEAT PASSWORD.
        // Recuperamos la contraseña de confirmación.
        const repeatPassword = this.repeatPassword.value;

        // Comprobamos si el campo está vacío.
        if (repeatPassword === '') {
            // Establecemos el mensaje de error para el navegador.
            setError(this.repeatPassword, 'Password confirmation is required.');
            // Mostramos el mensaje debajo del campo.
            this.repeatPasswordError.textContent = 'Password confirmation is required.';
        }
        // Comprobamos si las dos contraseñas coinciden.
        else if (repeatPassword !== password) {
            // Establecemos el mensaje de error para el navegador.
            setError(this.repeatPassword, 'Passwords do not match.');
            // Mostramos el mensaje debajo del campo.
            this.repeatPasswordError.textContent = 'Passwords do not match.';
        }
        // Si las contraseñas coinciden, eliminamos el error.
        else {
            this.repeatPassword.setCustomValidity('');
            this.repeatPasswordError.textContent = '';
        }

        // Devolvemos el resultado de todas las validaciones.
        // true: todos los campos son correctos.
        // false: existe algún campo con errores.
        return valid;
    }

    // MÉTODO QUE GESTIONA EL ENVÍO DEL FORMULARIO.
    // Utilizamos async porque realizaremos peticiones a la API REST.
    async handleSubmit(event) {
        // LIMPIAR LOS MENSAJES DE OPERACIONES ANTERIORES.
        this.clearServerMessages();

        // Evitamos el envío tradicional del formulario HTML.
        event.preventDefault();

        // PRIMER PASO: VALIDAR EL FORMULARIO.
        // Ejecutamos el método validateForm().
        if (!this.validateForm()) {
            // Si hay errores, detenemos el proceso de registro.
            return;
        }

        // SEGUNDO PASO: RECOGER LOS DATOS DEL FORMULARIO.
        // Creamos un objeto con los datos que enviaremos al backend.
        const userData = {
            // Datos personales.
            firstName: this.firstName.value.trim(),
            lastName: this.lastName.value.trim(),
            middleInitial: this.middleInitial.value.trim(),

            // Convertimos el teléfono en un número.
            // Eliminamos previamente espacios y otros caracteres.
            phone: Number(this.phone.value.replace(/\D/g, '')),

            // Datos de dirección.
            street: this.street.value.trim(),
            city: this.city.value.trim(),
            state: this.state.value.trim(),

            // Convertimos el código postal en número
            // porque en Java está definido como Integer.
            zip: Number(this.zip.value.trim()),

            // Datos de acceso.
            email: this.email.value.trim(),
            password: this.password.value
        };

        // TERCER PASO: DEFINIR LA DIRECCIÓN DE LA API REST.
        // Esta es la URL base de nuestro servicio UserFacadeREST.
        const API_URL = 'http://localhost:8080/AppSignUpSignIn/webresources/model.user';

        // CONTROLADOR PARA CANCELAR LAS PETICIONES.
        //const controller = new AbortController();

        // Utilizamos try-catch para controlar los posibles errores
        // que puedan producirse durante la comunicación con el servidor.
        try {
            // DESACTIVAR BOTÓN MIENTRAS SE PROCESA EL REGISTRO.
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'REGISTERING...';

            // CUARTO PASO: COMPROBAR SI EL CORREO YA ESTÁ REGISTRADO.
            // Realizamos una petición GET al backend.
            // Enviamos el correo como parámetro de la URL.
            const emailResponse = await fetch(`${API_URL}/email?email=${encodeURIComponent(userData.email)}`,
                    {
                        // GET se utiliza para consultar información.
                        method: 'GET',
                        // Indicamos que esperamos recibir texto.
                        headers: {
                            'Accept': 'text/plain'
                        }
                        // CONECTAR LA PETICIÓN CON EL CONTROLADOR.
                        //signal: controller.signal
                    }
            );

            // COMPROBAMOS SI EL SERVIDOR HA RESPONDIDO CORRECTAMENTE.
            if (!emailResponse.ok) {
                // SERVICIO NO DISPONIBLE (BASE DE DATOS).
                if (emailResponse.status === 503) {
                    throw new Error('El servicio no está disponible temporalmente. Inténtalo más tarde.');

                    // ERROR INTERNO DEL SERVIDOR.
                } else if (emailResponse.status >= 500) {
                    throw new Error('Error interno del servidor (HTTP ' + emailResponse.status + '). Inténtalo más tarde.');
                    // RECURSO NO ENCONTRADO.
                } else if (emailResponse.status === 404) {
                    throw new Error('Recurso no encontrado en el servidor (Error 404).');

                    // OTROS ERRORES HTTP.
                } else {
                    throw new Error('Error del servidor: HTTP ' + emailResponse.status);
                }
            }

            // Leemos la respuesta del servidor.
            // Nuestro método emailExists() devuelve true o false.
            const emailExists = (await emailResponse.text()).trim() === 'true';

            // Comprobamos si el correo ya está registrado.
            if (emailExists) {
                // Mostramos el mensaje de error en el formulario.
                this.showServerError('Este correo electrónico ya está registrado. Utiliza otro.');

                // Colocamos el cursor en el campo del correo.
                this.email.focus();

                // Detenemos el proceso de registro.
                return;
            }

            // QUINTO PASO: REGISTRAR EL USUARIO.
            // Si el correo no existe, enviamos los datos al backend
            // mediante una petición POST.
            const response = await fetch(API_URL, {
                // POST se utiliza para enviar datos y crear un registro.
                method: 'POST',

                // Indicamos que enviamos información en formato JSON.
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                // Convertimos el objeto userData en una cadena JSON.
                body: JSON.stringify(userData)

                // Conectamos la petición POST con el controlador.
                //signal: controller.signal
            });

            // Comprobamos si el servidor ha aceptado la petición.
            if (!response.ok) {
                // ERROR INTERNO DEL SERVIDOR.
                // SERVICIO NO DISPONIBLE (BASE DE DATOS).
                if (response.status === 503) {
                    throw new Error('El servicio no está disponible temporalmente. Inténtalo más tarde.');
                    // ERROR INTERNO DEL SERVIDOR.
                } else if (response.status >= 500) {
                    throw new Error('Error interno del servidor (HTTP ' + response.status + '). Inténtalo más tarde.');
                    // CORREO ELECTRÓNICO DUPLICADO.
                } else if (response.status === 409) {
                    throw new Error('Este correo electrónico ya está registrado.');
                    // DATOS INCORRECTOS.
                } else if (response.status === 400) {
                    throw new Error('Los datos enviados no son válidos. Comprueba la información.');
                    // RECURSO NO ENCONTRADO.
                } else if (response.status === 404) {
                    throw new Error('Recurso no encontrado en el servidor (Error 404).');
                    // OTROS ERRORES HTTP.
                } else {
                    throw new Error('Error del servidor: HTTP ' + response.status);
                }
            }

            // SEXTO PASO: CONFIRMAR EL REGISTRO.
            // Mostramos el mensaje de éxito en el formulario.
            this.successMessage.textContent = '¡Usuario registrado correctamente!';
            this.successMessage.style.display = 'block';

            // Limpiamos todos los campos del formulario.
            this.form.reset();

        } catch (error) {
            // MOSTRAR EL ERROR TÉCNICO EN LA CONSOLA.
            console.error('Error en el registro:', error);

            // TIEMPO DE ESPERA AGOTADO.
            if (error.name === 'AbortError') {
                this.showServerError('El servidor está tardando demasiado en responder. Inténtalo más tarde.');
            }
            // GLASSFISH APAGADO O SIN CONEXIÓN.
            else if (error instanceof TypeError) {
                this.showServerError('No se puede conectar con el servidor. Comprueba que esté disponible.');
            }
            // OTROS ERRORES.
            else {
                this.showServerError(error.message);
            }
        } finally {
            // RESTAURAR EL BOTÓN DE REGISTRO.
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'CREATE ACCOUNT';
        }
    }
}

//Instaciamos el controlador en el elemento de carga del DOM
document.addEventListener('DOMContentLoaded', () => {
    new singUpController();
});
