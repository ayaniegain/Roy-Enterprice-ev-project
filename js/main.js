/**
 * SmartNest Interiors & EV Hub
 * Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ── Navbar Shadow on Scroll ──────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '0';
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });

    // ── Mobile Menu Toggle ───────────────────────────────────────────
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ── Intersection Observer for Reveal Animations ──────────────────
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // ── Smooth Scroll for Anchors ────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // ── Video Hover & Modal Playback ────────────────────────────────
    const galleryItems = document.querySelectorAll('.gallery-item');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');

    galleryItems.forEach(item => {
        const video = item.querySelector('video');
        if (!video) return;

        // Hover Effect
        item.addEventListener('mouseenter', () => video.play().catch(() => {}));
        item.addEventListener('mouseleave', () => video.pause());

        // Click Effect (Open Modal)
        item.addEventListener('click', () => {
            const videoSrc = video.querySelector('source').src;
            modalVideo.querySelector('source').src = videoSrc;
            modalVideo.load();
            
            videoModal.style.display = 'flex';
            setTimeout(() => videoModal.classList.add('active'), 10);
            
            modalVideo.play().catch(error => console.log("Modal play failed:", error));
        });
    });

    // Close Modal
    const closeModal = () => {
        videoModal.classList.remove('active');
        setTimeout(() => {
            videoModal.style.display = 'none';
            modalVideo.pause();
        }, 300); // Animation duration
    };

    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeModal();
        });
    }

    // ── Form Submission Animation ───────────────────────────────────
    const forms = document.querySelectorAll('.contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Success! We\'ll Contact You';
                submitBtn.style.background = 'var(--p-interior)';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    });
});