document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const email = document.getElementById("email").value;

    // Validación básica de formato de correo electrónico
    if (!validateEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Aquí podrías realizar el envío del enlace de restablecimiento al servidor
    console.log("Enviando enlace de restablecimiento a:", email);

    // Simulación de envío exitoso
    alert("Se ha enviado un enlace de restablecimiento a tu correo electrónico.");
});

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar el correo
    return regex.test(email);
}
