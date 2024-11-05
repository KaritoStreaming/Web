document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Aquí podrías realizar una validación más avanzada o enviar datos a un servidor
    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Simulación de inicio de sesión exitoso
    alert("Inicio de sesión exitoso"); // Muestra un mensaje
});
