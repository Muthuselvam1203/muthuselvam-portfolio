// ========================================
// TYPEWRITER EFFECT FOR HERO SECTION
// ========================================

class TypeWriter {
    constructor(
        element,
        roles,
        typingSpeed = 100,
        deletingSpeed = 50,
        pauseTime = 2000
    ) {
        this.element = element;
        this.roles = roles;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.roleIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        this.maxLength = Math.max(
            ...roles.map(role => role.length)
        );

        this.init();
    }

    init() {
        this.element.style.display = "inline-block";
        this.element.style.width = `${this.maxLength}ch`;
        this.element.style.verticalAlign = "bottom";

        this.type();
    }

    type() {
        const currentRole = this.roles[this.roleIndex];

        if (this.isDeleting) {
            this.element.textContent =
                currentRole.substring(0, this.charIndex - 1);

            this.charIndex--;

            if (this.charIndex === 0) {
                this.isDeleting = false;

                this.roleIndex =
                    (this.roleIndex + 1) % this.roles.length;

                setTimeout(() => this.type(), 500);
            } else {
                setTimeout(
                    () => this.type(),
                    this.deletingSpeed
                );
            }
        } else {
            this.element.textContent =
                currentRole.substring(0, this.charIndex + 1);

            this.charIndex++;

            if (this.charIndex === currentRole.length) {
                this.isDeleting = true;

                setTimeout(
                    () => this.type(),
                    this.pauseTime
                );
            } else {
                setTimeout(
                    () => this.type(),
                    this.typingSpeed
                );
            }
        }
    }
}


// ========================================
// THROTTLE FUNCTION
// ========================================

function throttle(func, limit) {
    let inThrottle;

    return function () {
        const args = arguments;
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);

            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}


// ========================================
// PROJECT SCROLL ANIMATIONS
// ========================================

function initProjectScrollAnimations() {
    const projectItems =
        document.querySelectorAll(".project-item");

    // Add level classes
    projectItems.forEach((item, index) => {
        const level = (index % 5) + 1;

        item.classList.add(`level-${level}`);
    });

    // Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                }
            });
        },
        observerOptions
    );

    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Parallax effect
    window.addEventListener(
        "scroll",
        throttle(() => {
            const scrolled = window.pageYOffset;

            const parallaxElements =
                document.querySelectorAll(
                    ".project-item.animate-in"
                );

            parallaxElements.forEach(element => {
                const rect =
                    element.getBoundingClientRect();

                const elementHeight = rect.height;
                const viewportHeight = window.innerHeight;

                if (
                    rect.top < viewportHeight &&
                    rect.bottom > 0
                ) {
                    const scrollProgress =
                        (viewportHeight - rect.top) /
                        (viewportHeight + elementHeight);

                    const parallaxOffset =
                        scrollProgress * 10;

                    const content =
                        element.querySelector(
                            ".project-content"
                        );

                    if (content) {
                        content.style.transform =
                            `translateY(${parallaxOffset * 0.3}px)`;
                    }
                }
            });
        }, 16)
    );
}


// ========================================
// PROJECT LOCK FUNCTIONS
// ========================================

function initProjectLockSystem() {
    console.log(
        "Project lock system initialized"
    );
}

function initAdvancedScrollAnimations() {
    console.log(
        "Advanced scroll animations initialized"
    );
}

function initScrollBasedProjectLock() {
    console.log(
        "Scroll based project lock initialized"
    );
}


// ========================================
// NAVIGATION FUNCTIONS
// ========================================

function handleNavScroll() {
    const nav =
        document.querySelector(".navbar");

    if (!nav) return;

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}


function updateActiveNav() {
    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop =
            section.offsetTop - 100;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }
    });
}


// ========================================
// NAVBAR HIDE / SHOW ON SCROLL
// ========================================

let lastScrollTop = 0;
const scrollThreshold = 100;
let navbarHidden = false;

function handleNavbarHide() {
    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;

    if (
        scrollTop > lastScrollTop &&
        scrollTop > scrollThreshold
    ) {
        if (!navbarHidden) {
            navbar.style.transform =
                "translateY(-100%)";

            navbar.style.transition =
                "transform 0.3s ease-in-out";

            navbarHidden = true;
        }
    } else if (
        scrollTop < lastScrollTop ||
        scrollTop < scrollThreshold
    ) {
        if (navbarHidden) {
            navbar.style.transform =
                "translateY(0)";

            navbar.style.transition =
                "transform 0.3s ease-in-out";

            navbarHidden = false;
        }
    }

    lastScrollTop =
        scrollTop <= 0 ? 0 : scrollTop;
}


// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {

    // Main sections
    const sectionObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "is-visible"
                        );
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin:
                    "0px 0px -80px 0px"
            }
        );

    document
        .querySelectorAll(".scroll-section")
        .forEach(section => {
            sectionObserver.observe(section);
        });


    // Skill categories
    const categoryObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "is-visible"
                        );
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );

    document
        .querySelectorAll(
            ".skill-category-section"
        )
        .forEach(category => {
            categoryObserver.observe(category);
        });
}


// ========================================
// SCROLL ANIMATION CSS
// ========================================

function addScrollAnimationsCSS() {
    const style =
        document.createElement("style");

    style.textContent = `
        .navbar {
            transition:
                transform 0.3s ease-in-out;
        }
    `;

    document.head.appendChild(style);
}


// ========================================
// PARTICLE SYSTEM
// ========================================

class ParticleSystem {

    constructor(canvas) {
        this.canvas = canvas;

        if (!canvas) {
            return;
        }

        this.ctx =
            canvas.getContext("2d");

        this.particles = [];

        this.mouseX = 0;
        this.mouseY = 0;

        this.init();
    }


    init() {
        this.resize();

        this.createParticles();

        this.animate();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        window.addEventListener(
            "mousemove",
            event => {
                this.mouseX =
                    event.clientX;

                this.mouseY =
                    event.clientY;
            }
        );
    }


    resize() {
        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;
    }


    createParticles() {
        const particleCount =
            Math.min(
                window.innerWidth / 10,
                100
            );

        this.particles = [];

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {
            this.particles.push({
                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                vx:
                    (Math.random() - 0.5) *
                    1.5,

                vy:
                    (Math.random() - 0.5) *
                    1.5,

                size:
                    Math.random() * 2 + 1,

                color:
                    `rgba(${
                        Math.random() > 0.5
                            ? "255, 0, 51"
                            : "153, 0, 0"
                    }, ${
                        Math.random() * 0.5 + 0.2
                    })`
            });
        }
    }


    animate() {
        if (!this.ctx) return;

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        // Draw particles
        this.particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                // Wrap edges
                if (particle.x < 0) {
                    particle.x =
                        this.canvas.width;
                }

                if (
                    particle.x >
                    this.canvas.width
                ) {
                    particle.x = 0;
                }

                if (particle.y < 0) {
                    particle.y =
                        this.canvas.height;
                }

                if (
                    particle.y >
                    this.canvas.height
                ) {
                    particle.y = 0;
                }


                // Mouse interaction
                const dx =
                    this.mouseX -
                    particle.x;

                const dy =
                    this.mouseY -
                    particle.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 200 &&
                    distance > 0
                ) {
                    const force =
                        (200 - distance) /
                        200;

                    particle.vx +=
                        (dx / distance) *
                        force *
                        0.05;

                    particle.vy +=
                        (dy / distance) *
                        force *
                        0.05;
                }


                // Friction
                particle.vx *= 0.99;
                particle.vy *= 0.99;


                // Draw particle
                this.ctx.beginPath();

                this.ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                this.ctx.fillStyle =
                    particle.color;

                this.ctx.shadowBlur = 10;

                this.ctx.shadowColor =
                    particle.color;

                this.ctx.fill();

                this.ctx.shadowBlur = 0;
            }
        );


        // Connections
        this.particles.forEach(
            (particle, index) => {

                this.particles
                    .slice(index + 1)
                    .forEach(otherParticle => {

                        const dx =
                            particle.x -
                            otherParticle.x;

                        const dy =
                            particle.y -
                            otherParticle.y;

                        const distance =
                            Math.sqrt(
                                dx * dx +
                                dy * dy
                            );


                        if (distance < 150) {

                            this.ctx.beginPath();

                            this.ctx.moveTo(
                                particle.x,
                                particle.y
                            );

                            this.ctx.lineTo(
                                otherParticle.x,
                                otherParticle.y
                            );

                            this.ctx.strokeStyle =
                                `rgba(
                                    255,
                                    0,
                                    51,
                                    ${
                                        0.1 *
                                        (
                                            1 -
                                            distance /
                                                150
                                        )
                                    }
                                )`;

                            this.ctx.stroke();
                        }
                    });
            }
        );


        requestAnimationFrame(
            () => this.animate()
        );
    }
}


// ========================================
// CONTACT FORM — EMAILJS
// ========================================

function sendEmail(event) {

    event.preventDefault();

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) {
        console.error(
            "Contact form not found."
        );

        return;
    }


    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const messageInput =
        document.getElementById("message");

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (
        !nameInput ||
        !emailInput ||
        !messageInput
    ) {
        console.error(
            "Contact form fields are missing."
        );

        return;
    }


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const message =
        messageInput.value.trim();


    // Validate fields
    if (!name || !email || !message) {

        if (formMessage) {
            formMessage.innerHTML =
                `<div class="error-message">
                    Please fill in all required fields.
                </div>`;

            formMessage.style.display =
                "block";
        }

        return;
    }


    // Basic email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        if (formMessage) {
            formMessage.innerHTML =
                `<div class="error-message">
                    Please enter a valid email address.
                </div>`;

            formMessage.style.display =
                "block";
        }

        return;
    }


    // Loading message
    if (formMessage) {
        formMessage.innerHTML =
            `<div class="loading-message">
                Sending message...
            </div>`;

        formMessage.style.display =
            "block";
    }


    // ========================================
    // EMAILJS TEMPLATE PARAMETERS
    // ========================================

    const templateParams = {

        // Visitor's name
        from_name: name,

        // Visitor's name
        name: name,

        // Visitor's email
        email: email,

        // Visitor's message
        message: message,

        // Submission time
        time: new Date().toLocaleString()
    };


    console.log(
        "Sending contact form...",
        {
            from_name: name,
            email: email
        }
    );


    // ========================================
    // CHECK EMAILJS CONFIGURATION
    // ========================================

    if (
        !window.emailConfig ||
        !window.emailConfig.isInitialized
    ) {

        console.error(
            "EmailJS is not initialized."
        );

        console.error(
            "EmailJS status:",
            window.emailConfig?.getConfigStatus?.()
        );


        if (formMessage) {
            formMessage.innerHTML =
                `<div class="error-message">
                    Email service is not ready.
                    Please try again.
                </div>`;
        }

        return;
    }


    // ========================================
    // SEND EMAIL
    // ========================================

    window.emailConfig
        .sendEmail(templateParams)

        .then(response => {

            console.log(
                "EmailJS SUCCESS:",
                response.status,
                response.text
            );


            if (formMessage) {
                formMessage.innerHTML =
                    `<div class="success-message">
                        Message sent successfully!
                        I'll get back to you soon.
                    </div>`;

                formMessage.style.display =
                    "block";
            }


            // Clear form
            form.reset();


            // Hide message
            setTimeout(() => {

                if (formMessage) {
                    formMessage.style.display =
                        "none";
                }

            }, 5000);

        })

        .catch(error => {

            console.error(
                "EmailJS FAILED:",
                error
            );


            if (formMessage) {
                formMessage.innerHTML =
                    `<div class="error-message">
                        Failed to send message.
                        Please try again later.
                    </div>`;

                formMessage.style.display =
                    "block";
            }


            setTimeout(() => {

                if (formMessage) {
                    formMessage.style.display =
                        "none";
                }

            }, 5000);
        });
}


// ========================================
// MOBILE DEVICE DETECTION
// ========================================

function isMobileDevice() {

    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent)
        ||
        (
            window.innerWidth <= 768 &&
            "ontouchstart" in window
        )
    );
}


// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const targetId =
                    this.getAttribute(
                        "href"
                    ).substring(1);

                const targetElement =
                    document.getElementById(
                        targetId
                    );


                if (targetElement) {

                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    // Close mobile menu
                    const navLinks =
                        document.querySelector(
                            ".nav-links"
                        );

                    const hamburger =
                        document.querySelector(
                            ".hamburger"
                        );

                    const overlay =
                        document.querySelector(
                            ".nav-overlay"
                        );


                    if (
                        navLinks &&
                        navLinks.classList.contains(
                            "active"
                        )
                    ) {

                        navLinks.classList.remove(
                            "active"
                        );

                        if (hamburger) {
                            hamburger.classList.remove(
                                "open"
                            );
                        }

                        if (overlay) {
                            overlay.classList.remove(
                                "active"
                            );
                        }

                        document.body.style.overflow =
                            "auto";
                    }
                }
            }
        );
    });
}


// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {

    const hamburger =
        document.querySelector(
            ".hamburger"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    const navOverlay =
        document.querySelector(
            ".nav-overlay"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!hamburger || !navLinks) {
        return;
    }


    function toggleMenu() {

        const isActive =
            navLinks.classList.contains(
                "active"
            );


        if (!isActive) {

            hamburger.classList.add(
                "open"
            );

            navLinks.classList.add(
                "active"
            );

            if (navOverlay) {
                navOverlay.classList.add(
                    "active"
                );
            }

            document.body.style.overflow =
                "hidden";

        } else {

            closeMenu();
        }
    }


    function closeMenu() {

        hamburger.classList.remove(
            "open"
        );

        navLinks.classList.remove(
            "active"
        );

        if (navOverlay) {
            navOverlay.classList.remove(
                "active"
            );
        }

        document.body.style.overflow =
            "auto";
    }


    hamburger.addEventListener(
        "click",
        toggleMenu
    );


    if (navOverlay) {
        navOverlay.addEventListener(
            "click",
            closeMenu
        );
    }


    links.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );
    });
}


// ========================================
// PARALLAX HERO EFFECT
// ========================================

function initParallax() {

    window.addEventListener(
        "scroll",
        () => {

            const scrolled =
                window.pageYOffset;

            const heroContent =
                document.querySelector(
                    ".hero-content"
                );


            if (heroContent) {

                heroContent.style.transform =
                    `translateY(
                        ${scrolled * 0.5}px
                    )`;

                heroContent.style.opacity =
                    1 - scrolled / 800;
            }
        }
    );
}


// ========================================
// CUSTOM ANIMATIONS
// ========================================

function addCustomAnimations() {

    const style =
        document.createElement("style");

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
            animation:
                slideIn 1s ease forwards;
        }
    `;

    document.head.appendChild(style);
}


// ========================================
// MAIN INITIALIZATION
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "Initializing Portfolio Scripts..."
        );


        // ====================================
        // TYPEWRITER
        // ====================================

        const typewriterElement =
            document.getElementById(
                "typewriter"
            );


        if (typewriterElement) {

            const roles = [
                "Web Developer",
                "IT Student",
                "FrontEnd Developer",
                "Designer",
                "Data Analytics Enthusiast"
            ];


            new TypeWriter(
                typewriterElement,
                roles,
                100,
                50,
                2000
            );
        }


        // ====================================
        // PROJECT ANIMATIONS
        // ====================================

        initProjectScrollAnimations();

        initScrollBasedProjectLock();


        // ====================================
        // SCROLL ANIMATIONS
        // ====================================

        addScrollAnimationsCSS();

        initScrollAnimations();


        // ====================================
        // MOBILE MENU
        // ====================================

        initMobileMenu();


        // ====================================
        // PARTICLE SYSTEM
        // ====================================

        const canvas =
            document.querySelector(
                "#particles"
            );


        if (canvas) {

            try {

                new ParticleSystem(canvas);

            } catch (error) {

                console.error(
                    "ParticleSystem failed:",
                    error
                );
            }
        }


        // ====================================
        // VANILLA TILT
        // ====================================

        if (
            typeof VanillaTilt !==
            "undefined"
        ) {

            const tiltElements =
                document.querySelectorAll(
                    ".stat-item, .education-item, .contact-form"
                );


            tiltElements.forEach(
                element => {

                    new VanillaTilt(
                        element,
                        {
                            max: 5,
                            speed: 400,
                            glare: false,
                            "max-glare": 0.2
                        }
                    );
                }
            );
        }


        // ====================================
        // STAGGERED SCROLL ANIMATIONS
        // ====================================

        const observerOptions = {
            threshold: 0.1,
            rootMargin:
                "0px 0px -50px 0px"
        };


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                const children =
                                    entry.target.querySelectorAll(
                                        ".skill-item, .tech-tag"
                                    );


                                children.forEach(
                                    (
                                        child,
                                        index
                                    ) => {

                                        setTimeout(
                                            () => {

                                                child.style.opacity =
                                                    "1";

                                                child.style.transform =
                                                    "translateY(0)";

                                            },
                                            index * 50
                                        );
                                    }
                                );
                            }
                        }
                    );
                },
                observerOptions
            );


        document
            .querySelectorAll(
                ".section-content, .project-item, .feature, .education-item"
            )
            .forEach(element => {

                element.classList.add(
                    "fade-up-element"
                );

                observer.observe(
                    element
                );
            });


        // ====================================
        // CONTACT FORM
        // ====================================

        const contactForm =
            document.getElementById(
                "contactForm"
            );


        if (contactForm) {

            // IMPORTANT:
            // Only ONE submit listener.
            contactForm.addEventListener(
                "submit",
                sendEmail
            );

            console.log(
                "Contact form initialized."
            );
        }


        // ====================================
        // EMAILJS CHECK
        // ====================================

        if (window.emailConfig) {

            console.log(
                "EmailJS configuration:",
                window.emailConfig.getConfigStatus()
            );


            // If EmailJS wasn't ready when
            // the page loaded, try loading it.
            if (
                !window.emailConfig
                    .isInitialized &&
                typeof window.emailConfig
                    .initializeWhenReady ===
                    "function"
            ) {

                try {

                    await window.emailConfig
                        .initializeWhenReady();

                    console.log(
                        "EmailJS initialized successfully."
                    );

                } catch (error) {

                    console.error(
                        "EmailJS initialization error:",
                        error
                    );
                }
            }

        } else {

            console.error(
                "emailConfig not found. Check email-config.js."
            );
        }


        // ====================================
        // NAVIGATION
        // ====================================

        handleNavScroll();

        updateActiveNav();


        // ====================================
        // SMOOTH SCROLL
        // ====================================

        initSmoothScroll();


        // ====================================
        // CUSTOM ANIMATIONS
        // ====================================

        addCustomAnimations();


        console.log(
            "Portfolio initialized successfully!"
        );
    }
);


// ========================================
// WINDOW SCROLL EVENTS
// ========================================

window.addEventListener(
    "scroll",
    throttle(
        handleNavbarHide,
        16
    )
);


window.addEventListener(
    "scroll",
    throttle(
        handleNavScroll,
        16
    )
);


window.addEventListener(
    "scroll",
    throttle(
        updateActiveNav,
        16
    )
);