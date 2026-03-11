/* ============================================
   DANIEL NATHAN CASTILLO — PORTFOLIO
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal (Intersection Observer) ----
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ---- Active Nav Link Highlighting ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ---- Mobile Hamburger Menu ----
    const hamburger = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksEl.classList.toggle('open');
        document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksEl.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---- Typewriter Effect ----
    const typedEl = document.getElementById('heroTyped');
    const phrases = [
        'Weddings · Events · Films',
        'Cinematographer & Editor',
        'Creating Visual Narratives',
        'Scrapestatic Studio',
        'Francis Libiran · Oxin Films'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typedEl.innerHTML = current.substring(0, charIndex - 1) + '<span class="cursor"></span>';
            charIndex--;
            typingSpeed = 40;
        } else {
            typedEl.innerHTML = current.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing after a brief delay
    setTimeout(typeWriter, 1500);

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Contact Form Handler (Web3Forms) ----
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                btn.textContent = 'Message Sent! ✓';
                btn.style.background = '#28a745';
                btn.style.color = '#fff';
                contactForm.reset();
            } else {
                btn.textContent = 'Error Sending';
                btn.style.background = '#dc3545';
                btn.style.color = '#fff';
            }
        } catch (error) {
            btn.textContent = 'Error Sending';
            btn.style.background = '#dc3545';
            btn.style.color = '#fff';
        }

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 4000);
    });

    // ---- Parallax on Hero Background ----
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
            }
        });
    }

    // ---- Card Tilt Effect on Hover ----
    const cards = document.querySelectorAll('.project-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---- Native Google Drive Gallery Integration ----
    const driveGalleryContainer = document.getElementById('driveGallery');

    // Replace these placeholder IDs with the actual Google Drive File IDs you want to display.
    // Ensure the files are set to "Anyone with the link can view".
    const driveMediaItems = [
        { type: 'image', id: '1V3Pe4MhGow3Bf9EqEIP8RZ4szG76uU2h' },
        { type: 'image', id: '1ybu7NeMKiPUzAxR1qyS9-mKbbJAbwjZs' },
        { type: 'image', id: '1rrHeDi-652V8binCAhGuBVFUfW881UyQ' },
        { type: 'video', id: '1-39b-LOoCf2gKe5dBoOpGh7gVyoD5rdg' }, // Example Image ID
        { type: 'video', id: '13uPaedtAV8JDZDfhTInRvipbO7eUmwge' }, // Example Video ID
        { type: 'video', id: '1n5gfANJ0F1aL8ARauDEKaz3V7Yro4TQb' }
    ];

    if (driveGalleryContainer) {
        driveMediaItems.forEach((item, index) => {
            const galleryItemWrapper = document.createElement('div');
            // Adding reveal animations matching the rest of the site
            galleryItemWrapper.className = `gallery-item reveal ${index % 3 !== 0 ? 'reveal-delay-' + (index % 3) : ''}`;

            if (item.type === 'image') {
                const img = document.createElement('img');
                // Use the Drive thumbnail/view URL format for direct image rendering
                img.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w800`;
                img.alt = `Portfolio Image ${index + 1}`;
                img.loading = 'lazy';
                galleryItemWrapper.appendChild(img);
            } else if (item.type === 'video') {
                const iframe = document.createElement('iframe');
                // Use the standard Drive video preview embed URL
                iframe.src = `https://drive.google.com/file/d/${item.id}/preview`;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.setAttribute('allowfullscreen', 'true');
                galleryItemWrapper.appendChild(iframe);
            }

            driveGalleryContainer.appendChild(galleryItemWrapper);

            // Trigger the intersection observer on the new dynamically added element
            setTimeout(() => {
                if (typeof revealObserver !== 'undefined' && revealObserver.observe) {
                    revealObserver.observe(galleryItemWrapper);
                }
            }, 50);
        });
    }

});
