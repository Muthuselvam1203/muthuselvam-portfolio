// Typewriter Effect for Hero Section
class TypeWriter {
    constructor(element, roles, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.roles = roles;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.roleIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.maxLength = Math.max(...roles.map(role => role.length));
        this.init();
    }

    init() {
        // Set fixed width to prevent layout shifting
        this.element.style.display = 'inline-block';
        this.element.style.width = `${this.maxLength}ch`;
        this.element.style.verticalAlign = 'bottom';
        this.type();
    }

    type() {
        const currentRole = this.roles[this.roleIndex];

        if (this.isDeleting) {
            // Deleting text
            this.element.textContent = currentRole.substring(0, this.charIndex - 1);
            this.charIndex--;

            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                setTimeout(() => this.type(), 500); // Pause before typing next role
            } else {
                setTimeout(() => this.type(), this.deletingSpeed);
            }
        } else {
            // Typing text
            this.element.textContent = currentRole.substring(0, this.charIndex + 1);
            this.charIndex++;

            if (this.charIndex === currentRole.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseTime); // Pause before deleting
            } else {
                setTimeout(() => this.type(), this.typingSpeed);
            }
        }
    }
}

// Initialize typewriter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = [
            'Web Developer',
            'IT Student',
            'FrontEnd Developer',
            'Designer',
            'Data Analytics Enthusiast',

        ];
        new TypeWriter(typewriterElement, roles, 100, 50, 2000);
    }

    // Initialize project scroll animations
    initProjectScrollAnimations();
    initScrollBasedProjectLock();
});

// Missing function: initProjectLockSystem
function initProjectLockSystem() {
    console.log('Project lock system initialized');
}

// Missing function: initAdvancedScrollAnimations  
function initAdvancedScrollAnimations() {
    console.log('Advanced scroll animations initialized');
}

// Missing function: initScrollBasedProjectLock
function initScrollBasedProjectLock() {
    console.log('Scroll based project lock initialized');
}

// Missing function: handleNavScroll
function handleNavScroll() {
    console.log('Nav scroll handler initialized');
}

// Missing function: updateActiveNav
function updateActiveNav() {
    console.log('Active nav updated');
}

// Project scroll animations
function initProjectScrollAnimations() {
    const projectItems = document.querySelectorAll('.project-item');

    // Add level classes to projects
    projectItems.forEach((item, index) => {
        const level = (index % 5) + 1;
        item.classList.add(`level-${level}`);
    });

    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe each project item
    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Add parallax effect to project items with throttling
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.project-item.animate-in');

        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Check if element is in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);
                const parallaxOffset = scrollProgress * 10; // Reduced parallax intensity

                // Apply subtle parallax to project content
                const content = element.querySelector('.project-content');
                if (content) {
                    content.style.transform = `translateY(${parallaxOffset * 0.3}px)`;
                }
            }
        });
    }, 16)); // 60fps

    // Add level-based progress indicators
    // addProjectProgressIndicators(); // Disabled per user request
}

// Add progress indicators for each project level
function addProjectProgressIndicators() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach((item, index) => {
        const level = (index % 5) + 1;

        // Create level indicator
        const levelIndicator = document.createElement('div');
        levelIndicator.className = 'project-level-indicator';
        levelIndicator.innerHTML = `
            <div class="level-bar">
                <div class="level-progress" data-level="${level}"></div>
            </div>
            <span class="level-text">Level ${level}</span>
        `;

        // Insert at the beginning of project item
        item.insertBefore(levelIndicator, item.firstChild);

        // Animate level progress when project comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.level-progress');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.width = `${level * 20}%`;
                        }, 500);
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(item);
    });
}

// Throttled scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Hide/Show Navbar on Scroll
let lastScrollTop = 0;
let scrollThreshold = 100;
let navbarHidden = false;

function handleNavbarHide() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide navbar when scrolling down past threshold
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        if (!navbarHidden) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease-in-out';
            navbarHidden = true;
        }
    }
    // Show navbar when scrolling up
    else if (scrollTop < lastScrollTop || scrollTop < scrollThreshold) {
        if (navbarHidden) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease-in-out';
            navbarHidden = false;
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// Scroll Animations
function initScrollAnimations() {
    // Observer for main sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px'
    });

    // Observe all scroll-section elements
    document.querySelectorAll('.scroll-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Separate observer for skill categories (staggered reveal)
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.skill-category-section').forEach(cat => {
        categoryObserver.observe(cat);
    });
}

// Add CSS animations dynamically
function addScrollAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: transform 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialize scroll features
document.addEventListener('DOMContentLoaded', function () {
    addScrollAnimationsCSS();
    initScrollAnimations();

    // Add throttled scroll event listener for navbar
    window.addEventListener('scroll', throttle(handleNavbarHide, 4)); // 240fps for ultra-instant navbar
});

// Particle System
// Advanced Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(window.innerWidth / 10, 100); // Original count
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2 + 1,
                color: `rgba(${Math.random() > 0.5 ? '255, 0, 51' : '153, 0, 0'}, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const force = (200 - distance) / 200;
                particle.vx += (dx / distance) * force * 0.05;
                particle.vy += (dy / distance) * force * 0.05;
            }

            // Friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Draw particle with glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(255, 0, 51, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const canvas = document.getElementById('particles'); // Fixed ID
if (canvas) {
    new ParticleSystem(canvas);
}

// Initialize EmailJS when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // EmailJS will be initialized through the EmailConfig class
    console.log('Portfolio initialized with EmailJS configuration');
});

// Device detection function
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.innerWidth <= 768 && 'ontouchstart' in window);
}

// Contact Form Email Functionality - Direct sending through portfolio only
function sendEmail(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Show loading message
    formMessage.innerHTML = '<div class="loading-message">Sending message...</div>';
    formMessage.style.display = 'block';

    // Prepare email parameters to match EmailJS template
    const templateParams = {
        from_name: name,
        name: name.toLowerCase(),
        email: email,
        message: message,
        time: Date.now()
    };

    // Send email using EmailJS for all devices
    if (window.emailConfig && window.emailConfig.isInitialized) {
        window.emailConfig.sendEmail(templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                formMessage.innerHTML = '<div class="success-message">Message sent successfully! I\'ll get back to you soon.</div>';
                form.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch(function (error) {
                console.log('EmailJS FAILED...', error);
                formMessage.innerHTML = '<div class="error-message">Failed to send message. Please try again later.</div>';

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
    } else {
        // EmailJS not configured - show error message
        console.error('EmailJS not initialized:', window.emailConfig?.getConfigStatus());
        formMessage.innerHTML = '<div class="error-message">Email service not configured. Please contact the administrator.</div>';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
});

// Smooth Scrolling
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth animated scroll
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                const overlay = document.querySelector('.nav-overlay');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('open');
                    if (overlay) overlay.classList.remove('active');
                }
            }
        });
    });
}

// Initialize smooth scrolling
initSmoothScroll();

// Navigation scroll effect
function handleNavScroll() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', throttle(handleNavScroll, 4)); // 240fps for ultra-instant navbar

// Mobile Menu Toggle Logic
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const links = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        const isActive = navLinks.classList.contains('active');
        if (!isActive) {
            // Open
            hamburger.classList.add('open');
            navLinks.classList.add('active');
            if (navOverlay) navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Close
            hamburger.classList.remove('open');
            navLinks.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);

        // Close when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', throttle(updateActiveNav, 4)); // 240fps for ultra-instant navbar




// Form submission
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;

            // Here you would normally send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}


// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - scrolled / 800;
        }
    });
}

// Add custom CSS animations
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                width: 0;
            }
            to {
                width: var(--width);
            }
        }
        
        .skill-progress {
            --width: 0;
        }
        
        .skill-progress.animated {
            animation: slideIn 1s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Portfolio Scripts...');

    // Mobile Menu Toggle - Priority Init
    initMobileMenu();

    // Initialize particle system
    try {
        new ParticleSystem(document.querySelector('canvas'));
    } catch (e) {
        console.error('ParticleSystem failed:', e);
    }

    // Initialize custom cursor
    // initCustomCursor(); // Disabled for now to keep it simple

    // Initialize 3D Tilt
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('.stat-item, .education-item, .contact-form');
        tiltElements.forEach(element => {
            new VanillaTilt(element, {
                max: 5,
                speed: 400,
                glare: false, // Disabled per user request ("dont show the tild square")
                "max-glare": 0.2
            });
        });
    }

    // Staggered Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger children if any
                const children = entry.target.querySelectorAll('.skill-item, .tech-tag');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }, observerOptions);

    // Observe sections and items
    document.querySelectorAll('.section-content, .project-item, .feature, .education-item').forEach(el => {
        el.classList.add('fade-up-element'); // Add class for CSS handling if needed
        observer.observe(el);
    });

    // Initialize contact form
    handleContactForm();

    // Handle nav scroll
    handleNavScroll();
    updateActiveNav();

    console.log('Portfolio initialized successfully with premium effects!');
});