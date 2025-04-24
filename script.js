document.addEventListener('DOMContentLoaded', () => {

    // ---===[ Mobile Navigation Toggle ]===---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            body.classList.toggle('nav-open'); // For potential background overlay

            // Toggle aria-expanded attribute for accessibility
             const isOpen = mainNav.classList.contains('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close nav when a link is clicked (useful for single-page apps)
    const navLinks = document.querySelectorAll('.main-nav .nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
                body.classList.remove('nav-open');
                 navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ---===[ Smooth Scrolling for Anchor Links ]===---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset dynamically based on header height if needed
                 const headerOffset = document.querySelector('.site-header').offsetHeight || 80;
                 const elementPosition = targetElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // ---===[ Animate on Scroll (using Intersection Observer) ]===---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        console.log('if')
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for project cards if needed
                    if (entry.target.classList.contains('project-card')) {
                        // Basic stagger - customize as needed
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }

                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Optional: Stop observing once visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    } else {
        // Fallback for older browsers (simply show the elements)
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }

    // ---===[ Add background to header on scroll ]===---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add class after scrolling 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ---===[ Update Footer Year Dynamically ]===---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Add any other custom JS interactions here (e.g., typing effect, particle JS init)

});