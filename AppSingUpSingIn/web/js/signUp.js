class singUpController {

    // CONSTRUCTOR
    // Se ejecuta automáticamente cuando creamos el controlador.
    constructor() {
        // Recuperamos el formulario de registro del HTML.
        this.form = document.querySelector('.register-card');

        // Recuperamos los campos personales.
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.middleInitial = document.getElementById('middleInitial');

        // Recuperamos los campos del teléfono.
        this.prefix = document.getElementById('prefix');
        this.phone = document.getElementById('phone');

        // Recuperamos los campos de dirección.
        this.street = document.getElementById('street');
        this.city = document.getElementById('city');
        this.state = document.getElementById('state');
        this.zip = document.getElementById('zip');

        // Recuperamos el campo del correo electrónico.
        this.email = document.getElementById('email');

        // Recuperamos los campos de contraseña.
        this.password = document.getElementById('password');
        this.repeatPassword = document.getElementById('repeatPassword');


        // Comprobamos que el formulario existe.
        if (!this.form) {
            console.error('No se ha encontrado el formulario');
            // Si no existe, detenemos la ejecución.
            return;
        }

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
        // Expresión regular que permite letras, espacios,
        // guiones y apóstrofes.
        const namePattern = /^[\p{L}\s'-]+$/u;

        // Recuperamos el nombre eliminando espacios innecesarios.
        const firstName = this.firstName.value.trim();

        // Comprobamos que el nombre tenga un formato válido.
        if (!namePattern.test(firstName)) {
            setError(this.firstName, 'Introduce un nombre válido.');
        }

        // VALIDACIÓN DE LOS APELLIDOS.
        const lastName = this.lastName.value.trim();

        if (!namePattern.test(lastName)) {
            setError(this.lastName, 'Introduce unos apellidos válidos.');
        }

        // VALIDACIÓN DE LA INICIAL DEL SEGUNDO NOMBRE (OPCIONAL).
        const middleInitial = this.middleInitial.value.trim();

        // Si el campo no está vacío, comprobamos que solamente
        // contenga una letra.
        if (middleInitial !== '' && !/^\p{L}$/u.test(middleInitial)) {
            setError(this.middleInitial, 'Introduce solamente una letra.');
        }

        // VALIDACIÓN DEL TELÉFONO.
        const phone = this.phone.value.trim();

        // Permitimos números, espacios, paréntesis, puntos y guiones.
        const phonePattern = /^[0-9\s().-]+$/;

        // Eliminamos los caracteres que no sean números.
        const phoneDigits = phone.replace(/\D/g, '');

        // Comprobamos que el teléfono tenga entre 7 y 15 dígitos.
        if (!phonePattern.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
            setError(this.phone, 'Introduce un teléfono válido de entre 7 y 15 dígitos.');
        }

        // VALIDACIÓN DEL PREFIJO TELEFÓNICO.
        // Comprobamos que el usuario haya seleccionado un prefijo.
        if (!this.prefix.value) {
            setError(this.prefix, 'Selecciona un prefijo.');
        }

        // VALIDACIÓN DE LA DIRECCIÓN.
        const street = this.street.value.trim();

        // Comprobamos que la dirección tenga al menos 5 caracteres.
        if (street.length < 5) {
            setError(this.street, 'Introduce una dirección válida.');
        }

        // VALIDACIÓN DE LA CIUDAD Y LA PROVINCIA.
        // Permitimos letras, espacios, guiones y apóstrofes.
        const locationPattern = /^[\p{L}\s'-]+$/u;

        // Comprobamos que la ciudad tenga un formato válido.
        if (!locationPattern.test(this.city.value.trim())) {
            setError(this.city, 'Introduce una ciudad válida.');
        }

        // Comprobamos que la provincia tenga un formato válido.
        if (!locationPattern.test(this.state.value.trim())) {
            setError(this.state, 'Introduce una provincia válida.');
        }

        // VALIDACIÓN DEL CÓDIGO POSTAL.
        const zip = this.zip.value.trim();

        // Permitimos entre 3 y 9 números.
        // Utilizamos números porque el campo ZIP de nuestra entidad
        // Java está definido como Integer.
        if (!/^\d{3,9}$/.test(zip)) {
            setError(this.zip, 'Introduce un código postal válido.');
        }

        // VALIDACIÓN DEL CORREO ELECTRÓNICO.
        // Comprobamos que el correo tenga un formato válido
        // utilizando la validación nativa de HTML.
        if (!this.email.validity.valid) {
            setError(this.email, 'Introduce un correo electrónico válido.');
        }

        // VALIDACIÓN DE LA CONTRASEÑA.
        const password = this.password.value;
        // La contraseña debe contener:
        // - Una letra minúscula.
        // - Una letra mayúscula.
        // - Un número.
        // - Un mínimo de 8 caracteres.
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {

            setError(this.password, 'La contraseña necesita 8 caracteres, una mayúscula, una minúscula y un número.');
        }

        // VALIDACIÓN DE REPETIR CONTRASEÑA.
        // Comprobamos que las dos contraseñas coincidan.
        if (this.repeatPassword.value !== password) {
            setError(this.repeatPassword, 'Las contraseñas no coinciden.');
        }

        // Devolvemos el resultado de las validaciones.
        // true: todos los campos son válidos.
        // false: existe algún campo incorrecto.
        return valid;
    }

    // MÉTODO QUE GESTIONA EL ENVÍO DEL FORMULARIO.
    // Utilizamos async porque realizaremos peticiones a la API REST.
    async handleSubmit(event) {
        // Evitamos el envío tradicional del formulario HTML.
        event.preventDefault();

        // PRIMER PASO: VALIDAR EL FORMULARIO.
        // Ejecutamos el método validateForm().
        if (!this.validateForm()) {
            // Si hay errores, mostramos el mensaje del primer campo incorrecto.
            this.form.reportValidity();
            // Detenemos el proceso de registro.
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

        // Utilizamos try-catch para controlar los posibles errores
        // que puedan producirse durante la comunicación con el servidor.
        try {
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
                    }
            );

            // Comprobamos si el servidor ha respondido correctamente.
            if (!emailResponse.ok) {
                throw new Error('No se ha podido comprobar el correo electrónico.');
            }

            // Leemos la respuesta del servidor.
            // Nuestro método emailExists() devuelve true o false.
            const emailExists = (await emailResponse.text()).trim() === 'true';

            // Comprobamos si el correo ya está registrado.
            if (emailExists) {
                // Mostramos un aviso al usuario.
                alert('Este correo electrónico ya está registrado. Por favor, utiliza otro.');

                // Colocamos el foco en el campo del correo.
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
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'
                },
                // Convertimos el objeto userData en una cadena JSON.
                body: JSON.stringify(userData)
            });

            // Comprobamos si el servidor ha aceptado la petición.
            if (!response.ok) {
                throw new Error('No se ha podido registrar el usuario.');
            }

            // SEXTO PASO: CONFIRMAR EL REGISTRO.
            // Si la respuesta ha sido correcta, mostramos un mensaje.
            alert('¡Usuario registrado correctamente!');

            // Limpiamos todos los campos del formulario.
            this.form.reset();

        } catch (error) {
            // CONTROL DE ERRORES.
            // Mostramos el error técnico en la consola del navegador.
            console.error('Error en el registro:', error);

            // Mostramos un mensaje comprensible al usuario.
            alert('Ha ocurrido un error al registrar el usuario. Inténtalo de nuevo.');
        }
    }
}

// CREAMOS EL CONTROLADOR.
// Al crear esta instancia, se ejecuta el constructor
// y se preparan los eventos del formulario.
const signUp = new singUpController();
