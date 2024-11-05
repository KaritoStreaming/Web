// Mostrar/Ocultar las opciones de filtro
document.getElementById('filter-btn').addEventListener('click', function() {
    var filterOptions = document.getElementById('filter-options');
    // Alternar la visibilidad del contenedor de filtros
    filterOptions.style.display = filterOptions.style.display === 'none' || filterOptions.style.display === '' ? 'flex' : 'none';
});

// Aplicar los filtros al hacer clic en el botón "Aplicar Filtros"
document.getElementById('apply-filters').addEventListener('click', function() {
    // Obtener los valores seleccionados de los filtros
    var category = document.getElementById('category-filter').value;
    var platform = document.getElementById('platform-filter').value;
    var relevance = document.getElementById('relevance-filter').value;
    var availability = document.getElementById('availability-filter').value;

    // Llamar a la función de filtrado con los valores seleccionados
    filterItems(category, platform, relevance, availability);

    // Ocultar las opciones de filtro después de aplicar
    document.getElementById('filter-options').style.display = 'none';
});

// Función para filtrar los elementos del catálogo
function filterItems(category, platform, relevance, availability) {
    var items = document.querySelectorAll('.sales-item'); // Selecciona todos los elementos con la clase 'sales-item'

    items.forEach(function(item) {
        // Obtener las categorías y atributos asociados al item (por ejemplo, 'streaming' o 'iptv')
        var itemCategory = item.classList.contains('streaming') ? 'streaming' : (item.classList.contains('iptv') ? 'iptv' : 'all');
        var itemPlatform = item.id.toLowerCase(); // Usamos el ID del elemento como plataforma
        var itemAvailability = item.querySelector('.coming-soon') ? 'coming-soon' : 'available'; // Si contiene el texto "Próximamente", es 'coming-soon'
        
        // Para la relevancia, asumimos que cada servicio podría tener un atributo 'data-relevance' o similar
        // Si no lo tienen, asumimos que la relevancia es "all" (no filtrado)
        var itemRelevance = item.getAttribute('data-relevance') || 'all'; // Aseguramos que si no hay relevancia, se tome como 'all'
        
        // Lógica de filtrado: se muestra solo si todos los filtros coinciden
        var shouldDisplay = true;

        if (category !== 'all' && itemCategory !== category) {
            shouldDisplay = false;
        }

        if (platform !== 'all' && itemPlatform !== platform) {
            shouldDisplay = false;
        }

        if (relevance !== 'all' && itemRelevance !== relevance) {
            shouldDisplay = false;
        }

        if (availability !== 'all' && itemAvailability !== availability) {
            shouldDisplay = false;
        }

        // Mostrar o esconder el item según el filtrado
        if (shouldDisplay) {
            item.style.display = 'block'; // Mostrar el elemento
        } else {
            item.style.display = 'none'; // Ocultar el elemento
        }
    });
}

// Restablecer los filtros cuando se hace clic en el botón "Restablecer Filtros"
document.getElementById('reset-filters').addEventListener('click', function() {
    // Restablecer los valores de los filtros a 'all'
    document.getElementById('category-filter').value = 'all';
    document.getElementById('platform-filter').value = 'all';
    document.getElementById('relevance-filter').value = 'all';
    document.getElementById('availability-filter').value = 'all';

    // Mostrar todos los elementos en el catálogo
    filterItems('all', 'all', 'all', 'all');

    // Ocultar el contenedor de filtros
    document.getElementById('filter-options').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', () => {
    // Variables del modal
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBuyButton = document.getElementById('modal-buy-button');

    // Muestra el modal con la información del servicio
    document.querySelectorAll('.sales-buy-button').forEach(button => {
        button.addEventListener('click', () => {
            const imageSrc = button.dataset.image;
            const title = button.dataset.title;
            const description = button.dataset.description;

            // Asigna los datos al modal
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Muestra el modal
            modal.style.display = 'block';

            // Guarda el título del servicio seleccionado para WhatsApp
            modalBuyButton.setAttribute('data-service', title);
        });
    });

    // Cierra el modal cuando se hace clic en el botón de cerrar (X)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cierra el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Redirige a WhatsApp cuando se hace clic en el botón "Comprar"
    modalBuyButton.addEventListener('click', () => {
        const serviceTitle = modalBuyButton.getAttribute('data-service'); // Obtiene el nombre del servicio
        const whatsappLink = `https://api.whatsapp.com/send?phone=+51 918 451 635&text=Hola, estoy interesado en esta plataforma de streaming: ${serviceTitle}. ¿Qué planes tiene?`;

        window.open(whatsappLink, '_blank'); // Abre WhatsApp en una nueva pestaña
        modal.style.display = 'none'; // Cierra el modal después de abrir WhatsApp
    });
});
