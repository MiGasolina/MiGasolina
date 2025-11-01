document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL-REVEAL EFFECT (TRANSITIONS)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Elemento visible en un 20%
    };

    /**
     * Callback que maneja la lógica de visibilidad de los elementos.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Dejar de observar el elemento una vez que se ha animado
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Selecciona todos los elementos con el atributo data-animation
    const animatableElements = document.querySelectorAll('[data-animation]');

    animatableElements.forEach(element => {
        const animationType = element.getAttribute('data-animation');
        element.classList.add('animated', animationType);
        observer.observe(element);
    });

    // 2. CONTACT FORM SIMULATION
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación de procesamiento de datos
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validación simple
        if (name && email && message) {
            formMessage.textContent = `¡Gracias por tu mensaje, ${name}! Nos pondremos en contacto pronto.`;
            formMessage.style.color = '#18ad5a'; // Verde para éxito
            formMessage.style.display = 'block';

            // Resetear formulario después de 3 segundos
            setTimeout(() => {
                form.reset();
                formMessage.style.display = 'none';
            }, 3000);
            
        } else {
            formMessage.textContent = 'Por favor, completa todos los campos requeridos.';
            formMessage.style.color = '#ad1800'; // Rojo para error
            formMessage.style.display = 'block';
        }
    });

});