document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Limpiar mensajes de error
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.textContent = '');

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validación básica
    if (!username) {
        document.getElementById("username-error").textContent = "Por favor, ingresa un nombre de usuario.";
        return;
    }

    if (!email) {
        document.getElementById("email-error").textContent = "Por favor, ingresa un correo electrónico.";
        return;
    }

    // Validar formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Por favor, ingresa un correo electrónico válido.";
        return;
    }

    // Validar longitud de la contraseña
    if (password.length < 8) {
        document.getElementById("password-error").textContent = "La contraseña debe tener al menos 8 caracteres.";
        return;
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        document.getElementById("confirm-password-error").textContent = "Las contraseñas no coinciden.";
        return;
    }

    // Aquí podrías realizar un registro en el servidor
    console.log("Nombre de usuario:", username);
    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Simulación de registro exitoso
    alert("Registro exitoso. ¡Bienvenido!"); // Muestra un mensaje
});
