document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true, // Whether animation should happen only once - while scrolling down
        mirror: false, // Whether elements should animate out while scrolling past them
    });
        // --- NEW: Portfolio Filtering Logic ---
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Manage active state for buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }
        // --- NEW: Lightbox Functionality ---
    const portfolioCardsLightbox = document.querySelectorAll('.portfolio-card');
    const lightbox = document.getElementById('portfolio-lightbox');
    
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCloseBtn = lightbox.querySelector('.lightbox-close');

        const openLightbox = (imgSrc) => {
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        portfolioCardsLightbox.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const fullImageSrc = card.getAttribute('data-full-image');
                if (fullImageSrc) {
                    openLightbox(fullImageSrc);
                }
            });
        });

        lightboxCloseBtn.addEventListener('click', closeLightbox);
        
        // Close lightbox if the dark overlay area is clicked
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }




    // --- Vanta.js Hero Background ---
    if (window.VANTA) {
    VANTA.RINGS({
        el: "#home", // This correctly targets your hero section
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        // --- Color Scheme Integration ---
        backgroundColor: 0x1a1d24, // This matches your --bg-primary color
        color: 0x00c6ff          // This is the vibrant blue from your --accent-blue-gradient
    });
    }

    // --- Typed.js Initialization ---
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ["SUCCESSO.", "IMPATTO.", "RISULTATO."],
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