/* ============================================
   REVIS 2015 — Main Application JavaScript
   ============================================ */

(function () {
    'use strict';

    // --- State ---
    let currentLang = localStorage.getItem('revis_lang') || 'bg';

    // --- DOM Ready ---
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initLanguage();
        initNavbar();
        initMobileMenu();
        initScrollAnimations();
        initCounterAnimation();
        initOrderButtons();
        initContractButtons();
        initModal();
        initContactForm();
        initOrderForm();
        setCurrentYear();
    }

    // =====================
    // LANGUAGE SYSTEM
    // =====================
    function initLanguage() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
        setLanguage(currentLang);
    }

    function setLanguage(lang) {
        if (!TRANSLATIONS[lang]) return;
        currentLang = lang;
        localStorage.setItem('revis_lang', lang);
        document.documentElement.lang = lang === 'bg' ? 'bg' : lang === 'de' ? 'de' : 'en';

        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (TRANSLATIONS[lang][key]) {
                if (el.tagName === 'INPUT' && el.type !== 'checkbox') {
                    el.placeholder = TRANSLATIONS[lang][key];
                } else if (el.tagName === 'OPTION') {
                    el.textContent = TRANSLATIONS[lang][key];
                } else {
                    el.textContent = TRANSLATIONS[lang][key];
                }
            }
        });

        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // =====================
    // NAVBAR
    // =====================
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        var lastScroll = 0;

        window.addEventListener('scroll', function () {
            var currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    document.getElementById('navLinks').classList.remove('active');
                    document.getElementById('navToggle').classList.remove('active');
                }
            });
        });
    }

    // =====================
    // MOBILE MENU
    // =====================
    function initMobileMenu() {
        var toggle = document.getElementById('navToggle');
        var navLinks = document.getElementById('navLinks');

        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // =====================
    // SCROLL ANIMATIONS
    // =====================
    function initScrollAnimations() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('[data-aos]').forEach(function (el) {
            var delay = el.getAttribute('data-aos-delay');
            if (delay) {
                el.style.transitionDelay = delay + 'ms';
            }
            observer.observe(el);
        });
    }

    // =====================
    // COUNTER ANIMATION
    // =====================
    function initCounterAnimation() {
        var counters = document.querySelectorAll('[data-count]');
        var observed = false;

        var observer = new IntersectionObserver(function (entries) {
            if (observed) return;
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    observed = true;
                    animateCounters(counters);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    function animateCounters(counters) {
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'), 10);
            var duration = 2000;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(step);
        });
    }

    // =====================
    // ORDER BUTTONS (Pricing + Parts)
    // =====================
    function initOrderButtons() {
        document.querySelectorAll('.order-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var service = this.getAttribute('data-service');
                var price = this.getAttribute('data-price');
                openOrderModal(service, price);
            });
        });
    }

    // =====================
    // CONTRACT BUTTONS
    // =====================
    function initContractButtons() {
        document.querySelectorAll('.contract-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var plan = this.getAttribute('data-plan');
                var prices = { bronze: '99', silver: '199', gold: '399' };
                openOrderModal(plan, prices[plan] || '0');
            });
        });
    }

    // =====================
    // ORDER MODAL
    // =====================
    function initModal() {
        var modal = document.getElementById('orderModal');
        var closeBtn = document.getElementById('modalClose');
        var backdrop = modal.querySelector('.modal-backdrop');

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    function openOrderModal(service, price) {
        var modal = document.getElementById('orderModal');
        var serviceName = document.getElementById('modalServiceName');
        var priceEl = document.getElementById('modalPrice');
        var serviceInput = document.getElementById('orderService');
        var priceInput = document.getElementById('orderPrice');
        var form = document.getElementById('orderForm');
        var success = document.getElementById('orderSuccess');

        // Get translated service name
        var names = SERVICE_NAMES[currentLang] || SERVICE_NAMES['bg'];
        serviceName.textContent = names[service] || service;
        priceEl.textContent = price && price !== '0' ? '\u20AC' + price : '';
        serviceInput.value = service;
        priceInput.value = price;

        form.style.display = 'block';
        success.style.display = 'none';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        var modal = document.getElementById('orderModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // =====================
    // CONTACT FORM
    // =====================
    function initContactForm() {
        var form = document.getElementById('contactForm');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = new FormData(form);
            var obj = {};
            data.forEach(function (value, key) { obj[key] = value; });
            obj.language = currentLang;

            // In production, this would POST to a backend or email service
            // For now, simulate success
            console.log('Contact form submitted:', obj);

            form.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';

            // Store locally for demo
            storeSubmission('contact', obj);
        });
    }

    // =====================
    // ORDER FORM (Modal)
    // =====================
    function initOrderForm() {
        var form = document.getElementById('orderForm');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = new FormData(form);
            var obj = {};
            data.forEach(function (value, key) { obj[key] = value; });
            obj.language = currentLang;

            console.log('Order submitted:', obj);

            form.style.display = 'none';
            document.getElementById('orderSuccess').style.display = 'block';

            storeSubmission('order', obj);

            setTimeout(closeModal, 3000);
        });
    }

    // =====================
    // LOCAL STORAGE (Demo)
    // =====================
    function storeSubmission(type, data) {
        try {
            var submissions = JSON.parse(localStorage.getItem('revis_submissions') || '[]');
            submissions.push({
                type: type,
                data: data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('revis_submissions', JSON.stringify(submissions));
        } catch (e) {
            // localStorage might be unavailable
        }
    }

    // =====================
    // UTILITIES
    // =====================
    function setCurrentYear() {
        var el = document.getElementById('currentYear');
        if (el) el.textContent = new Date().getFullYear();
    }

})();
