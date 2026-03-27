/* ═══════════════════════════════════════════════════════════════
   ZÜRI GLOW Beauty Studio — Interactive System
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Preloader ───
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initRevealAnimations();
        }, 800);
    });

    // Failsafe: hide preloader after 3s max
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initRevealAnimations();
        }
    }, 3000);

    // ─── Header Scroll Effect ───
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });

    // ─── Navigation Active State ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ─── Mobile Navigation ───
    const hamburger = document.getElementById('nav-hamburger');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileNav() {
        const isActive = hamburger.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileNav);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileNav();
        });
    });

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Cursor Glow ───
    const cursorGlow = document.getElementById('cursor-glow');
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    if (window.matchMedia('(min-width: 768px)').matches && !('ontouchstart' in window)) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });

        function animateCursor() {
            glowX += (cursorX - glowX) * 0.08;
            glowY += (cursorY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ─── Reveal Animations (Intersection Observer) ───
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Respect animation-delay from inline styles
                    const delay = entry.target.style.animationDelay || '0s';
                    const delayMs = parseFloat(delay) * 1000;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delayMs);

                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ─── Hero Particles ───
    const particlesContainer = document.getElementById('hero-particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');

        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const hue = Math.random() > 0.5 ? '270' : '36'; // lavender or gold
        const saturation = Math.random() * 30 + 40;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            bottom: -10px;
            background: hsl(${hue}, ${saturation}%, 70%);
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 3}s;
        `;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + 3) * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 1200);
    // Initial burst
    for (let i = 0; i < 6; i++) {
        setTimeout(createParticle, i * 300);
    }

    // ─── Treatment Card Tilt Effect ───
    const treatmentCards = document.querySelectorAll('.treatment-card');

    if (window.matchMedia('(min-width: 768px)').matches) {
        treatmentCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ─── Parallax on Hero Image ───
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage && window.matchMedia('(min-width: 1024px)').matches) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                const translate = scrollY * 0.12;
                heroImage.style.transform = `translateY(${translate}px)`;
            }
        }, { passive: true });
    }

    // ─── Counter Animation for Pricing ───
    const priceAmounts = document.querySelectorAll('.preise-amount');
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    priceAmounts.forEach(el => priceObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 40;
        const duration = 1200;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, stepTime);
    }

    // ─── Testimonials Pause on Hover ───
    const testimonialTrack = document.getElementById('testimonials-track');
    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => {
            testimonialTrack.style.animationPlayState = 'paused';
        });
        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialTrack.style.animationPlayState = 'running';
        });
    }
});
