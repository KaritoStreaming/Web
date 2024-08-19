document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('#search-box');
    const showMoreButton = document.getElementById('show-more');
    const moreContent = document.getElementById('more-content');
    const carouselImages = document.querySelector('.carousel-images');
    const indicators = document.querySelectorAll('.indicator');

    // Función para mostrar/ocultar el menú en pantallas pequeñas
    function toggleMenu() {
        navMenu.classList.toggle('active');
    }

    // Función para cambiar de slide en el carrusel
    function goToSlide(index) {
        carouselImages.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    // Inicialización del carrusel
    const totalSlides = indicators.length;
    let currentIndex = 0;
    if (carouselImages && indicators.length > 0) {
        setInterval(nextSlide, 3000); // Cambia cada 3 segundos
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                goToSlide(parseInt(indicator.dataset.slide, 10));
            });
        });
        goToSlide(0); // Inicializa el carrusel en el primer slide
    }

    // Función para mostrar/ocultar el campo de búsqueda
    function toggleSearchBox() {
        searchBox.classList.toggle('visible');
        if (searchBox.classList.contains('visible')) {
            searchBox.querySelector('input').focus();
        }
    }

    // Función para mostrar más contenido
    function toggleMoreContent(event) {
        event.preventDefault();
        const isExpanded = moreContent.style.display === 'block';
        moreContent.style.display = isExpanded ? 'none' : 'block';
        showMoreButton.textContent = isExpanded ? 'Ver más' : 'Ver menos';
    }

    // Controlador de eventos
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearchBox);
    }

    if (showMoreButton) {
        showMoreButton.addEventListener('click', toggleMoreContent);
    }

    // Cierre del campo de búsqueda si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (searchBox.classList.contains('visible') && !searchBox.contains(event.target) && !searchToggle.contains(event.target)) {
            searchBox.classList.remove('visible');
        }
    });

    // Carrusel de ventas (eliminado)

});

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Alterna la visibilidad de la respuesta
            const parentItem = this.parentElement;
            parentItem.classList.toggle('active');
        });
    });
});
