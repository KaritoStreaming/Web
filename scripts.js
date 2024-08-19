document.addEventListener('DOMContentLoaded', () => {

    // Funcionalidad del buscador con sugerencias
    const searchInput = document.getElementById('search');
    const suggestionsContainer = document.getElementById('suggestions');
    
    const suggestions = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query) {
            const filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query)
            );

            filteredSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.textContent = suggestion;
                div.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(div);
            });

            suggestionsContainer.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Opcional: Manejo de teclas de flecha para seleccionar sugerencias
    searchInput.addEventListener('keydown', (e) => {
        const selected = suggestionsContainer.querySelector('.selected');
        if (e.key === 'ArrowDown') {
            if (selected) {
                const next = selected.nextElementSibling;
                if (next) {
                    selected.classList.remove('selected');
                    next.classList.add('selected');
                    searchInput.scrollTop = next.offsetTop - suggestionsContainer.clientHeight + next.clientHeight;
                }
            } else {
                const first = suggestionsContainer.firstChild;
                if (first) {
                    first.classList.add('selected');
                    searchInput.scrollTop = first.offsetTop;
                }
            }
        } else if (e.key === 'ArrowUp') {
            if (selected) {
                const prev = selected.previousElementSibling;
                if (prev) {
                    selected.classList.remove('selected');
                    prev.classList.add('selected');
                    searchInput.scrollTop = prev.offsetTop;
                }
            }
        } else if (e.key === 'Enter') {
            if (selected) {
                searchInput.value = selected.textContent;
                suggestionsContainer.innerHTML = '';
            }
        }
    });

    // Funcionalidad del modal
    const buyButtons = document.querySelectorAll('.btn-buy');
    const modal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.modal .close');
    const paymentAmount = document.getElementById('payment-amount');
    const paymentForm = document.getElementById('payment-form');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = button.getAttribute('data-amount');
            paymentAmount.textContent = `$${amount}`;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pago solicitado');
        modal.style.display = 'none';
    });

});
