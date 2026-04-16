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

    // ─── Price Tabs ───
    const priceTabs = document.querySelectorAll('.price-tab');
    const pricePanels = document.querySelectorAll('.price-panel');

    priceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            priceTabs.forEach(t => t.classList.remove('active'));
            pricePanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.querySelector(`.price-panel[data-panel="${target}"]`);
            if (panel) panel.classList.add('active');
        });
    });

    // ─── Instagram Feed Slider ───
    const igTrack = document.getElementById('ig-slider-track');
    const igViewport = document.getElementById('ig-slider-viewport');
    const igPrev = document.getElementById('ig-slider-prev');
    const igNext = document.getElementById('ig-slider-next');
    const igDotsContainer = document.getElementById('ig-slider-dots');

    if (igTrack && igViewport) {
        const slides = igTrack.querySelectorAll('.ig-slide');
        let currentSlide = 0;
        let slidesPerView = 3;
        let isDragging = false;
        let startX = 0;
        let dragOffset = 0;
        let currentTranslate = 0;
        let autoSlideInterval;

        function getSlidesPerView() {
            const w = window.innerWidth;
            if (w <= 480) return 1;
            if (w <= 768) return 2;
            return 3;
        }

        function getMaxSlide() {
            return Math.max(0, slides.length - slidesPerView);
        }

        function getSlideWidth() {
            if (slides.length === 0) return 0;
            const gap = parseFloat(getComputedStyle(igTrack).gap) || 16;
            const viewportWidth = igViewport.offsetWidth;
            return (viewportWidth - (slidesPerView - 1) * gap) / slidesPerView + gap;
        }

        function goToSlide(index) {
            currentSlide = Math.max(0, Math.min(index, getMaxSlide()));
            const slideWidth = getSlideWidth();
            currentTranslate = -currentSlide * slideWidth;
            igTrack.style.transform = `translateX(${currentTranslate}px)`;
            updateDots();
            updateArrows();
        }

        function updateArrows() {
            if (igPrev) igPrev.disabled = currentSlide === 0;
            if (igNext) igNext.disabled = currentSlide >= getMaxSlide();
        }

        // Create dots
        function createDots() {
            if (!igDotsContainer) return;
            igDotsContainer.innerHTML = '';
            const totalDots = getMaxSlide() + 1;
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('ig-slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoSlide();
                });
                igDotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            if (!igDotsContainer) return;
            const dots = igDotsContainer.querySelectorAll('.ig-slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Arrow events
        if (igPrev) igPrev.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
        if (igNext) igNext.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });

        // Drag/Swipe support
        function onDragStart(x) {
            isDragging = true;
            startX = x;
            dragOffset = 0;
            igTrack.classList.add('dragging');
        }

        function onDragMove(x) {
            if (!isDragging) return;
            dragOffset = x - startX;
            igTrack.style.transform = `translateX(${currentTranslate + dragOffset}px)`;
        }

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            igTrack.classList.remove('dragging');

            const threshold = getSlideWidth() * 0.25;
            if (dragOffset < -threshold) {
                goToSlide(currentSlide + 1);
            } else if (dragOffset > threshold) {
                goToSlide(currentSlide - 1);
            } else {
                goToSlide(currentSlide);
            }
            resetAutoSlide();
        }

        // Mouse events
        igViewport.addEventListener('mousedown', (e) => {
            e.preventDefault();
            onDragStart(e.clientX);
        });
        window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
        window.addEventListener('mouseup', onDragEnd);

        // Touch events
        igViewport.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX), { passive: true });
        igViewport.addEventListener('touchmove', (e) => onDragMove(e.touches[0].clientX), { passive: true });
        igViewport.addEventListener('touchend', onDragEnd);

        // Auto-slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                if (currentSlide >= getMaxSlide()) {
                    goToSlide(0);
                } else {
                    goToSlide(currentSlide + 1);
                }
            }, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Pause auto-slide on hover
        igViewport.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        igViewport.addEventListener('mouseleave', startAutoSlide);

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                slidesPerView = getSlidesPerView();
                createDots();
                goToSlide(Math.min(currentSlide, getMaxSlide()));
            }, 200);
        });

        // Initialize
        slidesPerView = getSlidesPerView();
        createDots();
        updateArrows();
        startAutoSlide();
    }
});

/* ═══════════════════════════════════════════════════════════════
   COOKIE CONSENT BANNER
   ═══════════════════════════════════════════════════════════════ */
(function() {
    const banner = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (!banner) return;

    // Check if user already made a choice
    const consent = localStorage.getItem('zg-cookie-consent');
    if (consent) {
        banner.classList.add('hidden');
        return;
    }

    // Show banner after a short delay
    setTimeout(function() {
        banner.classList.add('visible');
    }, 1500);

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('zg-cookie-consent', 'accepted');
            banner.classList.remove('visible');
            banner.classList.add('hidden');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('zg-cookie-consent', 'declined');
            banner.classList.remove('visible');
            banner.classList.add('hidden');
        });
    }
})();

/* ═══════════════════════════════════════════════════════════════
   LEGAL OVERLAY (Impressum / Datenschutz)
   ═══════════════════════════════════════════════════════════════ */
(function() {
    // Open legal overlay when clicking links with href="#impressum" or "#datenschutz"
    document.querySelectorAll('a[href="#impressum"], a[href="#datenschutz"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var section = document.getElementById(targetId);
            if (section) {
                section.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close via × button
    document.querySelectorAll('.legal-close').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var section = this.closest('.legal-section');
            if (section) {
                section.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close via clicking backdrop (outside content)
    document.querySelectorAll('.legal-section').forEach(function(section) {
        section.addEventListener('click', function(e) {
            if (e.target === section) {
                section.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close via ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.legal-section.active').forEach(function(section) {
                section.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
})();
