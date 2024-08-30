// Selección de elementos
const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn"),
  searchInput = document.querySelector(".search-box input"),
  resultsContainer = document.getElementById('search-results');

// Alternar búsqueda y navegación
searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");

  if (nav.classList.contains("openSearch")) {
    searchIcon.classList.replace("uil-search", "uil-times");
    searchInput.focus(); // Enfocar en el campo de búsqueda
  } else {
    searchIcon.classList.replace("uil-times", "uil-search");
  }
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});

navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

// Datos de ejemplo para búsqueda
const searchData = [
  { name: "Inicio", url: "index.html" },
  { name: "Sobre Nosotros", url: "sobre-nosotros.html" },
  { name: "Servicios", url: "servicios.html" },
  { name: "Contactos", url: "contactos.html" },
  { name: "Streaming", url: "streaming.html" },
  { name: "IPTV", url: "iptv.html" },
  { name: "Música", url: "musica.html" },
  { name: "Política", url: "politica.html" },
  { name: "Privacidad", url: "privacidad.html" },
  { name: "Preguntas", url: "preguntas.html" },
  { name: "Compras", url: "compras.html" },
  { name: "Método de Pago", url: "pagos.html" },
];

// Función de búsqueda
searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const results = searchData.filter(item => item.name.toLowerCase().includes(query));

  resultsContainer.innerHTML = '';

  if (results.length > 0) {
    results.forEach(result => {
      const resultElement = document.createElement('a');
      resultElement.href = result.url;
      resultElement.textContent = result.name;
      resultElement.classList.add('search-result-item'); // Agregar clase para estilo
      resultsContainer.appendChild(resultElement);
    });
    resultsContainer.style.display = 'block';
  } else {
    resultsContainer.style.display = 'none';
  }
});

// Detectar la tecla "Enter" y redirigir a la primera página de los resultados
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const firstResult = resultsContainer.querySelector('a');
    if (firstResult) {
      window.location.href = firstResult.href; // Redirigir a la URL del primer resultado
    }
  }
});
