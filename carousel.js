document.addEventListener('DOMContentLoaded', () => {
    // Código para el modal
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBuyButton = document.getElementById('modal-buy-button');

    // Muestra el modal con la información del producto
    document.querySelectorAll('.sales-buy-button').forEach(button => {
        button.addEventListener('click', () => {
            const imageSrc = button.dataset.image;
            const title = button.dataset.title;
            const description = button.dataset.description;

            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.style.display = 'block';
            
            // Guarda el título del servicio seleccionado para WhatsApp
            modalBuyButton.setAttribute('data-service', title);
        });
    });

    // Cierra el modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cierra el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Código para el carrusel
    const prevButton = document.querySelector('.sales-carousel-prev');
    const nextButton = document.querySelector('.sales-carousel-next');
    const wrapper = document.querySelector('.sales-carousel-wrapper');
    const items = document.querySelectorAll('.sales-item');

    if (items.length === 0) return;

    // Calcula el ancho de un ítem
    const itemWidth = items[0].offsetWidth;

    // Calcula el número de ítems visibles según el tamaño de la pantalla
    let visibleItems = 5; // Número fijo de ítems visibles para pantallas grandes

    function updateVisibleItems() {
        // Ajusta el número de ítems visibles según el ancho del contenedor
        const containerWidth = wrapper.offsetWidth;
        visibleItems = Math.floor(containerWidth / itemWidth);
        if (visibleItems < 5) visibleItems = 5; // Asegura que se vean al menos 5 ítems
    }

    function toggleScrollbar() {
        if (window.innerWidth >= 600) {
            wrapper.style.overflowX = 'hidden'; // Oculta el scrollbar en pantallas grandes
        } else {
            wrapper.style.overflowX = 'scroll'; // Muestra el scrollbar en pantallas pequeñas
        }
    }

    updateVisibleItems(); // Actualiza al cargar la página
    toggleScrollbar(); // Ajusta el scrollbar al cargar la página

    // Desplaza el carrusel en función del número de ítems visibles
    function scrollCarousel(offset) {
        wrapper.scrollBy({
            left: offset * itemWidth,
            behavior: 'smooth'
        });
    }

    prevButton.addEventListener('click', function() {
        scrollCarousel(-visibleItems); // Desplazarse hacia la izquierda
    });

    nextButton.addEventListener('click', function() {
        scrollCarousel(visibleItems); // Desplazarse hacia la derecha
    });

    // Actualiza el número de ítems visibles y la visibilidad del scrollbar al redimensionar la ventana
    window.addEventListener('resize', function() {
        updateVisibleItems();
        toggleScrollbar();
    });

    // Redirige a WhatsApp cuando se haga clic en el botón "Comprar Ya"
    modalBuyButton.addEventListener('click', () => {
        const serviceTitle = modalBuyButton.getAttribute('data-service'); // Obtiene el servicio seleccionado
        const whatsappLink = `https://api.whatsapp.com/send?phone=+51 918 451 635&text=Hola, estoy interesado en esta plataforma de streaming: ${serviceTitle}. ¿Qué planes tiene?`;

        window.open(whatsappLink, '_blank'); // Abre WhatsApp en una nueva pestaña
        modal.style.display = 'none'; // Cierra el modal después de abrir WhatsApp
    });
});
