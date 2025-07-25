document.addEventListener('DOMContentLoaded', () => {

    // --- Vanta.js Hero Background ---
    if (window.VANTA) {
        VANTA.NET({
            el: "#home", // This targets your hero section with id="home"
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8cadf2,
            backgroundColor: 0x23153c,
            points: 9.00,
            maxDistance: 23.00,
            spacing: 18.00
        });
    }

    // --- Typed.js Initialization ---
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ["MOTORE DI CRESCITA.", "AMPLIFICATORE DEL BRAND.", "GENERATORE DI PROFITTI."],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            smartBackspace: true
        });
    }

    // --- Off-Canvas Menu Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const offCanvasMenu = document.querySelector('.off-canvas-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const openMenu = () => {
        offCanvasMenu.classList.add('is-open');
        overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeMenu = () => {
        offCanvasMenu.classList.remove('is-open');
        overlay.classList.remove('is-active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (menuToggle && offCanvasMenu) {
        menuToggle.addEventListener('click', openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    if (overlay) {
        // Close menu if overlay is clicked
        overlay.addEventListener('click', closeMenu);
    }

    // UX Polish: Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if it's a main link and not just a submenu toggle
            if(link.getAttribute('href') && link.getAttribute('href') !== '#') {
                closeMenu();
            }
        });
    });

    // Close menu on 'Escape' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && offCanvasMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // --- Animate elements on scroll ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.service-card, .showcase-container, .contact-btn, .advantage-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // --- Auto-update copyright year ---
    const copyrightDiv = document.querySelector('.footer-copyright');
    if (copyrightDiv) {
        copyrightDiv.textContent = `© ${new Date().getFullYear()} AxiomWeb. Tutti i diritti riservati.`;
    }
});