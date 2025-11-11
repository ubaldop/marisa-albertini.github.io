// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Update aria-expanded for accessibility
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Contact form submission handler
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'INVIO IN CORSO...';
    formMessage.style.display = 'none';

    try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Success message
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#e6f9f7';
            formMessage.style.color = '#08ad9d';
            formMessage.style.border = '2px solid #08ad9d';
            formMessage.textContent = '✓ Messaggio inviato con successo! Ti risponderemo presto.';

            // Reset form
            form.reset();
        } else {
            throw new Error('Invio fallito');
        }
    } catch (error) {
        // Error message
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = '#f8d7da';
        formMessage.style.color = '#721c24';
        formMessage.style.border = '1px solid #f5c6cb';
        formMessage.textContent = '✗ Si è verificato un errore. Riprova o contattaci direttamente via email.';
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'INVIA';
    }
});
