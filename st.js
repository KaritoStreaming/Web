let planSeleccionado = "basico"; // Plan seleccionado por defecto

// Obtener todos los elementos relevantes
const botonesComprar = document.querySelectorAll('.btn-buy-now');
const botonesCerrar = document.querySelectorAll('.close');
const formSeleccionServicios = document.getElementById('form-seleccion-servicios');
const seleccionAviso = document.getElementById('seleccionAviso');
const modalProceso0 = document.getElementById('modalProceso0');
const modalProceso1 = document.getElementById('modalProceso1');
const modalGracias = document.getElementById('modalGracias');
const resumenInfo = document.getElementById('resumenInfo');
const warningsElement = document.getElementById('warnings');

// Asignar eventos a los botones "Adquiere lo ya"
botonesComprar.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto
        comprarPlan(this); // Pasar el botón que fue clickeado
    });
});

// Función que se ejecuta al hacer clic en "Adquiere lo ya"
function comprarPlan(button) {
    const planNombre = button.getAttribute('data-plan'); // Obtener el nombre del plan
    const planId = button.getAttribute('data-plan-id'); // Obtener el ID del plan

    // Verificar que los valores de planNombre y planId no sean nulos o indefinidos
    if (!planNombre || !planId) {
        console.error('No se encontró el plan o ID del plan.');
        return;
    }

    // Actualizar la variable global con el plan seleccionado
    planSeleccionado = planNombre;  // Actualizamos el valor de planSeleccionado
    window.selectedPlan = { name: planNombre, id: planId }; // Almacenar el plan seleccionado

    console.log('Plan seleccionado:', planSeleccionado); // Depuración: Verificar el plan seleccionado

    openModal(`modal-${planId}`); // Abrir la modal de detalles del plan

    // Esperar un tiempo antes de abrir la modal del proceso
    setTimeout(() => {
        closeModal(`modal-${planId}`); // Cerrar la modal del plan
        openModal('modalProceso0'); // Abrir la modal de proceso 0
    }, 9000); // Tiempo de espera antes de abrir la siguiente modal
}

// Función para abrir la modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block"; // Mostrar la modal
    }
}

// Función para cerrar la modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none"; // Ocultar la modal
    }
}

// Agregar un event listener a cada botón de cerrar
botonesCerrar.forEach(botonCerrar => {
    botonCerrar.addEventListener('click', () => {
        const modal = botonCerrar.closest('.modal');
        if (modal) {
            closeModal(modal.id);
        }
    });
});

// Validar la selección de servicios y pasar al siguiente modal
formSeleccionServicios.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe

    const serviciosSeleccionados = document.querySelectorAll('#form-seleccion-servicios input[type="checkbox"]:checked');
    const limiteServicios = getLimiteServicios(planSeleccionado);  // Usar el valor actualizado de planSeleccionado

    console.log('Limite de servicios para el plan', planSeleccionado, ':', limiteServicios); // Depuración: Verificar el límite de servicios

    // Verificar si se seleccionaron servicios
    if (serviciosSeleccionados.length === 0) {
        seleccionAviso.textContent = "Debes seleccionar al menos un servicio.";
        seleccionAviso.style.display = 'block';
    } 
    // Verificar si se excede el límite de servicios
    else if (serviciosSeleccionados.length > limiteServicios) {
        seleccionAviso.textContent = `Has seleccionado demasiados servicios. Tu plan ${planSeleccionado} permite un máximo de ${limiteServicios} servicios.`;
        seleccionAviso.style.display = 'block';
    } else {
        // Si la selección es válida, ocultar el mensaje de advertencia
        seleccionAviso.style.display = 'none';

        // Continuar al siguiente proceso (proceso 1)
        closeModal('modalProceso0');
        openModal('modalProceso1');
    }
});

// Función para obtener el límite de servicios según el plan
function getLimiteServicios(plan) {
    console.log('getLimiteServicios llamado con plan:', plan); // Depuración: Verificar el valor de `plan`

    switch (plan) {
        case "basico":
            return 1; // El plan Básico permite solo 1 servicio
        case "estandar":
            return 2; // El plan Estándar permite hasta 2 servicios
        case "premium":
            return 3; // El plan Premium permite hasta 3 servicios
        case "personalizado":
            return Infinity; // El plan Personalizado no tiene límite de servicios
        default:
            console.error('Plan no reconocido:', plan); // Depuración: Verificar si el plan es válido
            return 0; // En caso de que no se reconozca el plan, devolver 0 (aunque no debería suceder)
    }
}

// Asignar la función de validación al botón de confirmar selección
document.getElementById('btnConfirmarSeleccion').addEventListener('click', validarSeleccion);

// Función para validar la selección de servicios (la original también sirve, pero la incluimos aquí por claridad)
function validarSeleccion() {
    const serviciosSeleccionados = document.querySelectorAll('#form-seleccion-servicios input[type="checkbox"]:checked');
    const limiteServicios = getLimiteServicios(planSeleccionado); // Obtener el límite según el plan seleccionado

    console.log('Validando selección... Servicios seleccionados:', serviciosSeleccionados.length, 'Limite de servicios:', limiteServicios); // Depuración

    const seleccionAviso = document.getElementById('seleccionAviso');

    // Verificar si la cantidad de servicios seleccionados supera el límite permitido
    if (serviciosSeleccionados.length === 0) {
        // Mostrar mensaje de advertencia si no se selecciona nada
        seleccionAviso.textContent = "Debes seleccionar al menos un servicio.";
        seleccionAviso.style.display = 'block';
    } else if (serviciosSeleccionados.length > limiteServicios) {
        // Mostrar mensaje de advertencia si se excede el límite
        seleccionAviso.textContent = `Has seleccionado demasiados servicios. Tu plan ${planSeleccionado} permite un máximo de ${limiteServicios} servicios.`;
        seleccionAviso.style.display = 'block';
    } else {
        // Si la selección es válida, ocultar el mensaje de advertencia
        seleccionAviso.style.display = 'none';

        // Continuar al siguiente proceso (proceso 1)
        closeModal('modalProceso0');
        openModal('modalProceso1');
    }
}

// Función para verificar la información del formulario
function verificarInfo() {
    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
  
    let warnings = [];
  
    if (!nombre) warnings.push("El nombre es obligatorio.");
    if (!numero || !/^\d{7,}$/.test(numero)) warnings.push("El número debe contener al menos 7 dígitos.");
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) warnings.push("Por favor, introduce un correo válido.");
    if (!pais) warnings.push("Selecciona un país.");
    if (!ciudad) warnings.push("Selecciona una ciudad.");
  
    const warningsElement = document.getElementById('warnings');
    if (warnings.length > 0) {
        warningsElement.innerHTML = warnings.join("<br>");
        warningsElement.style.display = "block";
        document.getElementById('btnSiguiente').style.display = "none"; // Ocultar botón "Siguiente"
    } else {
        warningsElement.style.display = "none";
        document.getElementById('btnSiguiente').style.display = "block"; // Mostrar botón "Siguiente"
    }
  }
  
  // Función para procesar la información del formulario
  function procesarInfo() {
    mostrarSpinner(); // Mostrar el spinner al iniciar el proceso
  
    // Simular un proceso (por ejemplo, envío de datos)
    setTimeout(() => {
        ocultarSpinner(); // Ocultar el spinner al finalizar
        mostrarResumen(); // Mostrar el resumen de la información
        openModal('modalProceso2'); // Mostrar la segunda modal después de procesar
    }, 7000);
  }
  
  function mostrarResumen() {
    const resumenInfo = document.getElementById('resumenInfo');
    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
  
    // Get selected streaming services
    const serviciosSeleccionados = Array.from(document.querySelectorAll('input[name="servicio"]:checked'))
        .map(checkbox => checkbox.value)
        .join(', ') || 'Ninguno';

    resumenInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Número:</strong> ${numero}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>País:</strong> ${pais}</p>
        <p><strong>Ciudad:</strong> ${ciudad}</p>
        <p><strong>Plan:</strong> ${window.selectedPlan.name}</p>
        <p><strong>Servicios Seleccionados:</strong> ${serviciosSeleccionados}</p>
    `;
}

  // Función para mostrar el spinner
  function mostrarSpinner() {
    const spinnerContainer = document.querySelector('.spinner-container');
    spinnerContainer.style.display = 'flex'; // Mostrar el spinner
  }
  
  // Función para ocultar el spinner
  function ocultarSpinner() {
    const spinnerContainer = document.querySelector('.spinner-container');
    spinnerContainer.style.display = 'none'; // Ocultar el spinner
  }
  
  // Evento para cerrar la modal al hacer clic fuera de ella
  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
  }
  
  // Función para actualizar las ciudades según el país seleccionado
  function actualizarCiudades() {
    const pais = document.getElementById('pais').value;
    const ciudadSelect = document.getElementById('ciudad');
    ciudadSelect.innerHTML = ""; // Limpiar ciudades
  
    if (pais === "Colombia") {
        ciudadSelect.innerHTML += `<option value="Bogotá">Bogotá</option>`;
        ciudadSelect.innerHTML += `<option value="Medellín">Medellín</option>`;
    } else if (pais === "Venezuela") {
        ciudadSelect.innerHTML += `<option value="Caracas">Caracas</option>`;
        ciudadSelect.innerHTML += `<option value="Maracaibo">Maracaibo</option>`;
    } else if (pais === "Perú") {
        ciudadSelect.innerHTML += `<option value="Lima">Lima</option>`;
        ciudadSelect.innerHTML += `<option value="Arequipa">Arequipa</option>`;
    }
  }
  
  // Función para editar la información en el proceso 2
  function editarInfo() {
    closeModal('modalProceso2'); // Cerrar la modal de resumen
    openModal('modalProceso1'); // Abrir la modal de datos del cliente para editar
  }
  
  // Función para continuar al siguiente paso (Proceso 3)
  function siguientePaso() {
    closeModal('modalProceso2'); // Cerrar la modal de proceso 2
    openModal('modalProceso3'); // Abrir la modal de proceso 3
  }
  
  // Asignar los eventos a los botones
  document.getElementById('btnEditar').onclick = editarInfo;
  document.getElementById('btnSiguienteProceso2').onclick = siguientePaso;
  
  function pagar() {
    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
  
    if (!metodoPago) {
        alert("Por favor, selecciona un método de pago.");
        return; // Detener si no se selecciona un método
    }
    const metodoPagoValor = metodoPago.value;
  
    // Obtener datos del plan de la variable global
    const planNombre = window.selectedPlan.name; 
    const planId = window.selectedPlan.id;

    // Obtener los servicios seleccionados
    const serviciosSeleccionados = [];
    const servicios = document.querySelectorAll('input[name="servicio"]:checked');
    
    servicios.forEach(servicio => {
        serviciosSeleccionados.push(servicio.value);
    });

    // Crear el texto de los servicios seleccionados
    const serviciosTexto = serviciosSeleccionados.length > 0 
        ? `Servicios Seleccionados: ${serviciosSeleccionados.join(', ')}`
        : 'No se seleccionaron servicios.';

      // Construir el mensaje de WhatsApp
  const mensaje = `Hola, me gustaría realizar una compra.\nNombre: ${nombre}\nNúmero: ${numero}\nCorreo: ${correo}\nPaís: ${pais}\nCiudad: ${ciudad}\nMétodo de Pago: ${metodoPagoValor}\nPlan: ${planNombre}\n${serviciosTexto}`;
  const numeroWhatsApp = "+51 918 451 635";
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

  // Redirigir a WhatsApp
  window.open(urlWhatsApp, '_blank');

  // Esperar 2 segundos y luego mostrar la modal de gracias
  setTimeout(() => {
      closeModal('modalProceso3'); // Cerrar la modal de pago
      openModal('modalGracias'); // Abrir la modal de gracias
  }, 3000);
}
