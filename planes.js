// Función que se ejecuta al hacer clic en "Adquierelo ya"
function comprarPlan(button) {
  const planNombre = button.getAttribute('data-plan'); // Obtener el nombre del plan
  const planId = button.getAttribute('data-plan-id'); // Obtener el ID del plan

  // Almacenar información del plan en una variable global
  window.selectedPlan = { name: planNombre, id: planId };

  openModal(`modal-${planId}`); // Abrir la modal de detalles del plan

  // Esperar un tiempo antes de abrir la modal del proceso (ajusta el tiempo según necesites)
  setTimeout(() => {
      closeModal(`modal-${planId}`); // Cerrar la modal del plan
      openModal('modalProceso1'); // Abrir la modal de datos del cliente
  }, 9000); // Cambia 9000 por el tiempo que desees
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

// Función para mostrar el resumen de la información
function mostrarResumen() {
  const resumenInfo = document.getElementById('resumenInfo');
  const nombre = document.getElementById('nombre').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const pais = document.getElementById('pais').value;
  const ciudad = document.getElementById('ciudad').value;

  resumenInfo.innerHTML = `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Número:</strong> ${numero}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>País:</strong> ${pais}</p>
      <p><strong>Ciudad:</strong> ${ciudad}</p>
      <p><strong>Plan:</strong> ${window.selectedPlan.name}</p>
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
  // Obtener todos los valores del formulario
  const form = document.getElementById('form-seleccion-servicios');
  const formData = new FormData(form);

  const nombre = formData.get('nombre').trim();
  const numero = formData.get('numero').trim();
  const correo = formData.get('correo').trim();
  const pais = formData.get('pais');
  const ciudad = formData.get('ciudad');
  const metodoPago = document.querySelector('input[name="metodoPago"]:checked');

  if (!metodoPago) {
      alert("Por favor, selecciona un método de pago.");
      return; // Detener si no se selecciona un método
  }
  const metodoPagoValor = metodoPago.value;

  // Obtener datos del plan de la variable global
  const planNombre = window.selectedPlan.name; 
  const planId = window.selectedPlan.id;

  // Obtener los servicios seleccionados automáticamente desde el formulario
  const serviciosSeleccionados = [];
  const servicios = form.querySelectorAll('input[name="servicio"]:checked');
  
  servicios.forEach(servicio => {
      serviciosSeleccionados.push(servicio.value);
  });

  // Crear el texto de los servicios seleccionados
  const serviciosTexto = serviciosSeleccionados.length > 0 
      ? `Servicios Seleccionados: ${serviciosSeleccionados.join(', ')}`
      : 'No se seleccionaron servicios.';

  // Construir el mensaje de WhatsApp
  const mensaje = `Hola, me gustaría realizar una compra.\n
      Nombre: ${nombre}\n
      Número: ${numero}\n
      Correo: ${correo}\n
      País: ${pais}\n
      Ciudad: ${ciudad}\n
      Método de Pago: ${metodoPagoValor}\n
      Plan: ${planNombre}\n
      ID del Plan: ${planId}\n
      ${serviciosTexto}`;

  // Número de WhatsApp al que se enviará el mensaje
  const numeroWhatsApp = "+51 918 451 635";
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

  // Abrir el enlace de WhatsApp en una nueva ventana/pestaña
  window.open(urlWhatsApp, '_blank');

  // Esperar 2 segundos y luego mostrar la modal de gracias
  setTimeout(() => {
      closeModal('modalProceso3'); // Cerrar la modal de pago
      openModal('modalGracias'); // Abrir la modal de gracias
  }, 3000);
}
