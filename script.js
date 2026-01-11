/* ===== GLOBAL JAVASCRIPT FOR ALL PAGES ===== */

document.addEventListener('DOMContentLoaded', function () {

    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    const fadeOutPreloader = () => {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.add('loaded');
            }, 800);
        } else {
            document.body.classList.add('loaded');
        }
    };

    if (document.readyState === 'complete') {
        fadeOutPreloader();
    } else {
        window.addEventListener('load', fadeOutPreloader);
    }

    // Safety Timeout: Force page visible after 3.5s if preloader gets stuck
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            document.body.classList.add('loaded');
        }
    }, 3500);

    // 1. Mobile Menu Functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';

    const headerContainer = document.querySelector('.header-container');
    const navMenu = document.querySelector('.nav-menu');

    if (headerContainer && navMenu) {
        headerContainer.insertBefore(mobileMenuToggle, navMenu);

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // 2. Copy Email Functionality
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function () {
            const email = 'naaveensaaran.01319@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
                this.style.background = 'rgba(34, 197, 94, 0.2)';
                this.style.borderColor = '#22c55e';
                this.style.color = '#22c55e';

                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                    this.style.borderColor = '';
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Reveal Animations on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-card, .project-item-card, .stat-card, .service-tag, .faq-item').forEach((el, index) => {
        el.classList.add('reveal-element');
        el.style.transitionDelay = `${index * 0.05}s`;
        revealObserver.observe(el);
    });

    // 5. Ripple Effect for All Buttons
    document.querySelectorAll('.btn, .cta-button, .cta-btn, .service-tag').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 6. Active Link Highlighting (Clean URLs)
    const currentLocation = window.location.pathname.split("/").pop() || "index";
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 7. Dynamic Greeting & Console Log (From Services)
    const hour = new Date().getHours();
    let greeting = hour < 12 ? 'Good Morning' : (hour < 18 ? 'Good Afternoon' : 'Good Evening');
    console.log(`%c${greeting}! Welcome to Naveen's Portfolio`, 'color: #3B82F6; font-size: 20px; font-weight: bold;');

    // 9. FAQ Accordion (From Services)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

    // 10. Hero Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section:not(.full-width-hero)');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // 11. Custom Cursor & Confetti "Gift Paper" Effect
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'custom-cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = `${cursorX - 4}px`;
        cursor.style.top = `${cursorY - 4}px`;
        follower.style.left = `${followerX - 15}px`;
        follower.style.top = `${followerY - 15}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Gift Paper Confetti Effect on Click
    window.addEventListener('mousedown', (e) => {
        cursor.style.transform = 'scale(0.8)';
        follower.style.transform = 'scale(1.2)';

        // Create confetti particles
        const colors = ['#3B82F6', '#00ffcc', '#ffffff', '#ff007f', '#ffff00'];
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';

            const size = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;

            // Random direction and rotation
            const destX = (Math.random() - 0.5) * 200;
            const destY = (Math.random() - 0.5) * 200;
            const rotation = Math.random() * 360;

            particle.style.setProperty('--x', `${destX}px`);
            particle.style.setProperty('--y', `${destY}px`);
            particle.style.setProperty('--r', `${rotation}deg`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    });

    window.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
    });

    // Cursor hover effects on links/buttons
    document.querySelectorAll('a, button, .service-tag').forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(2)';
            follower.style.borderColor = 'var(--cyan)';
            follower.style.background = 'rgba(0, 255, 204, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--primary-blue)';
            follower.style.background = 'transparent';
        });
    });

});

/* Embedded Styles for JS Animations */
const styleInjection = document.createElement('style');
styleInjection.textContent = `
    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .reveal-visible {
        opacity: 1;
        transform: translateY(0);
    }
    .ripple-effect {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }
    .mobile-menu-toggle {
        display: none;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        z-index: 1001;
    }
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(15, 12, 41, 0.98);
        justify-content: center;
        align-items: center;
        z-index: 1000;
        gap: 2.5rem;
    }
    .nav-menu.active a { font-size: 1.5rem; }
    @media (max-width: 768px) {
        .mobile-menu-toggle { display: block; }
        .nav-menu { display: none; }
    }
`;
document.head.appendChild(styleInjection);
