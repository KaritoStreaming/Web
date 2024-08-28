document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const showMoreButton = document.getElementById('show-more');
    const moreContent = document.getElementById('more-content');
    const carouselImages = document.querySelector('.carousel-images');
    const indicators = document.querySelectorAll('.indicator');
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Función para mostrar/ocultar contenido adicional
    function toggleMoreContent(event) {
        event.preventDefault();
        // Alterna la visibilidad del contenido adicional
        if (moreContent.style.display === 'block') {
            moreContent.style.display = 'none';
            showMoreButton.textContent = 'Ver más';
        } else {
            moreContent.style.display = 'block';
            showMoreButton.textContent = 'Ver menos';
        }
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

    // Función para alternar la visibilidad de las respuestas en FAQ
    function toggleFAQ(event) {
        const parentItem = this.parentElement;
        parentItem.classList.toggle('active');
    }

    // Controladores de eventos
    if (showMoreButton) {
        showMoreButton.addEventListener('click', toggleMoreContent);
    }

    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
});
