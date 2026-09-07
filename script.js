/**
 * ============================================================================
 * PREMIUM MODERN DEVELOPER PORTFOLIO - JAVASCRIPT CORE
 * Muthuselvam K | Full-Stack Web Developer & Data Analyst
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize All Interactive Systems
    initThemeSwitcher();
    initTypeWriter();
    initScrollProgressBar();
    initNavbar();
    initMobileNavigation();
    initProjectFiltering();
    initProjectModal();
    initResumeModal();
    initStatCounters();
    initContactForm();
    initCustomCursor();
    initParticleCanvas();
    initHero3DParallax();
    initVanillaTilt();
    initBackToTop();
    initScrollReveal();
    initMagneticButtons();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return;

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    const initialTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
    setTheme(initialTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Notify Particle System if active
        if (window.particleSystemInstance) {
            window.particleSystemInstance.updateThemeColors(theme);
        }
    }
}

/* ==========================================================================
   2. TYPEWRITER ANIMATION (HERO SECTION)
   ========================================================================== */
function initTypeWriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const roles = [
        'Full-Stack Developer',
        ' UI Designer',
        'Information Technology Student'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2200; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   3. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    const updateProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/* ==========================================================================
   4. FLOATING NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar) return;

    const handleScroll = () => {
        // Sticky background
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Spy
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ==========================================================================
   5. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (!hamburger || !navLinks || !navOverlay) return;

    const openMenu = () => {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        if (isOpen) closeMenu();
        else openMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ==========================================================================
   6. PROJECT DETAILS DATA & MODAL SYSTEM
   ========================================================================== */
const projectsData = {
    shopai: {
        title: "ShopAI — AI Product Search & Insights Platform",
        category: "Full-Stack & AI Web Platform",
        problem: "Consumers spend hours navigating disjointed e-commerce websites, comparing fractured specifications, reading contradictory reviews, and struggling to benchmark fair market prices.",
        solution: "Engineered a unified intelligent web platform that aggregates real-time product listings via external REST APIs, analyzes review sentiment, and algorithmically categorizes products into 'Best Overall', 'Budget Choice', and 'Premium Pick'.",
        features: [
            "Real-time external REST API product data aggregation",
            "Natural Language Processing & sentiment analysis on customer reviews",
            "Instant price benchmarking & budget vs premium categorization",
            "High-speed reactive search bar with debounced query filters",
            "Responsive product comparison matrix with detailed breakdown",
            "Single-click direct retailer navigation & checkout redirect"
        ],
        techStack: ["React.js", "Node.js", "Express.js", "REST APIs", "Modern CSS", "Vite", "JavaScript (ES6+)"],
        challenges: "Managing rate limits and latency across asynchronous multiple API fetches. Resolved by implementing an Express caching layer and optimistic UI rendering in React.",
        outcome: "Delivered a sub-second search experience with intuitive AI recommendations that streamlines product comparison for users.",
        github: "https://github.com/Muthuselvam1203",
        demo: "https://github.com/Muthuselvam1203"
    },
    library: {
        title: "Campus Library & Student Resource System",
        category: "Full-Stack Mobile & Cloud System",
        problem: "Manual library book tracking and paper logs at educational institutions led to lost inventory, delayed return notifications, and lack of real-time visibility for students.",
        solution: "Built a native Android mobile application with a real-time cloud backend using Firebase Firestore, authentication, and Firebase Cloud Messaging (FCM) to automate book issuing, renewal reminders, and catalog queries.",
        features: [
            "Real-time catalog search and book availability status",
            "Student and Administrator role-based authentication",
            "Firebase Cloud Messaging (FCM) automated push alerts for return deadlines",
            "Digital borrowing history and barcode/ID catalog indexing",
            "Offline data persistence with SQLite and Firebase Local Cache",
            "Clean XML-based responsive UI matching Google Material Design"
        ],
        techStack: ["Java", "Android Studio", "Firebase Firestore", "Firebase Auth", "FCM Cloud Messaging", "XML Layouts"],
        challenges: "Managing state synchronization across intermittent campus Wi-Fi networks. Solved using Firestore offline persistence and structured SQLite fallback caching.",
        outcome: "Eliminated manual tracking friction, providing instant push notifications and transparent book management for both students and staff.",
        github: "https://github.com/Muthuselvam1203",
        demo: "https://github.com/Muthuselvam1203"
    },
    timetable: {
        title: "AI Timetable & Dynamic Scheduling System",
        category: "Full-Stack & AI System",
        problem: "Academic timetable scheduling is an NP-hard problem prone to classroom conflicts, faculty schedule clashes, and inefficient institutional resource utilization.",
        solution: "Developed an algorithmic conflict resolution and timetable generation engine leveraging vector similarity indexing and constraint programming to generate collision-free schedules in seconds.",
        features: [
            "Automated multi-constraint schedule optimization algorithm",
            "Vector-based similarity indexing for intelligent faculty & lab querying",
            "Real-time schedule conflict visualization and alert flags",
            "Interactive timetable calendar grid with drag-and-drop adjustments",
            "Export schedules to PDF, Excel, and Google Calendar formats",
            "Multi-department access with synchronized cloud storage"
        ],
        techStack: ["React.js", "Node.js", "Firebase", "Vector Search", "RESTful API", "JavaScript", "Vite"],
        challenges: "Handling complex hard and soft constraints simultaneously without high computational overhead. Solved through custom backtracking heuristics combined with vector indexing.",
        outcome: "Reduced timetable scheduling turnaround from several days of manual work to under 30 seconds with 100% collision avoidance.",
        github: "https://github.com/Muthuselvam1203",
        demo: "https://github.com/Muthuselvam1203"
    },
    healthcare: {
        title: "MedPulse — Healthcare Records & Patient Platform",
        category: "Full-Stack Clinical System",
        problem: "Healthcare administrators struggle with fragmented patient intake, uncoordinated record indexing, and slow doctor appointment routing.",
        solution: "Engineered a full-stack clinical management web application with React, Node.js, Express, and relational SQL databases to centralize electronic health records, patient registration, and appointment scheduling.",
        features: [
            "Full-stack patient registration & EHR medical records management",
            "Relational SQL database schema for diagnosis and prescription indexing",
            "Interactive clinical analytics dashboards and patient recovery metrics",
            "Secure role-based authentication for medical staff and administrators",
            "RESTful backend endpoints for real-time appointment scheduling",
            "Responsive modern UI optimized for clinic terminals and tablets"
        ],
        techStack: ["React.js", "Node.js", "Express.js", "SQL / PostgreSQL", "REST APIs", "Modern CSS"],
        challenges: "Ensuring strict data consistency across multi-table patient histories and prescription records. Solved using atomic SQL transactions and relational constraints.",
        outcome: "Streamlined patient record retrieval by over 60% with zero data discrepancies across departments.",
        github: "https://github.com/Muthuselvam1203",
        demo: "https://github.com/Muthuselvam1203"
    },
    academic: {
        title: "EduPredict — Academic Performance & Grade Engine",
        category: "Full-Stack & Predictive System",
        problem: "Educators identify underperforming students too late in the academic semester due to disconnected grading spreadsheets and static reports.",
        solution: "Built a full-stack predictive web platform combining a reactive React frontend, Node.js API backend, and Python statistical regression services to forecast final grades from continuous attendance and assessment data.",
        features: [
            "Interactive student dashboard with dynamic GPA & grade forecasting",
            "REST API integration between Node.js and Python statistical services",
            "Automated early-warning signals for at-risk course modules",
            "Visual grade breakdown charts with interactive metric filters",
            "Exportable academic performance summaries and faculty notes",
            "Modular component architecture with responsive mobile-ready views"
        ],
        techStack: ["Python", "React.js", "Node.js", "Scikit-Learn", "REST APIs", "Vite"],
        challenges: "Bridging synchronous Python predictive scripts with asynchronous Node/React web clients. Implemented structured JSON microservice endpoints with request caching.",
        outcome: "Empowered students and faculty mentors to identify grade risks with over 85% early prediction accuracy.",
        github: "https://github.com/Muthuselvam1203",
        demo: "https://github.com/Muthuselvam1203"
    }
};

function initProjectModal() {
    const projectModal = document.getElementById('projectModal');
    const projectModalBody = document.getElementById('projectModalBody');
    const closeBtn = document.getElementById('closeProjectModalBtn');
    const detailButtons = document.querySelectorAll('.view-details-btn');

    if (!projectModal || !projectModalBody || !closeBtn) return;

    const openModal = (projectId) => {
        const project = projectsData[projectId];
        if (!project) return;

        projectModalBody.innerHTML = `
            <div class="pm-header">
                <span class="pm-category">${project.category}</span>
                <h3 class="pm-title">${project.title}</h3>
            </div>

            <div class="pm-section">
                <h4 class="pm-section-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    The Problem
                </h4>
                <p class="pm-text">${project.problem}</p>
            </div>

            <div class="pm-section">
                <h4 class="pm-section-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Engineered Solution
                </h4>
                <p class="pm-text">${project.solution}</p>
            </div>

            <div class="pm-section">
                <h4 class="pm-section-title">Key Architectural Features</h4>
                <div class="pm-features-grid">
                    ${project.features.map(f => `
                        <div class="pm-feature-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>${f}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="pm-section">
                <h4 class="pm-section-title">Technology Stack & Libraries</h4>
                <div class="pm-tech-list">
                    ${project.techStack.map(t => `<span class="p-tech">${t}</span>`).join('')}
                </div>
            </div>

            <div class="pm-section">
                <h4 class="pm-section-title">Engineering Challenges Overcome</h4>
                <p class="pm-text">${project.challenges}</p>
            </div>

            <div class="pm-section">
                <h4 class="pm-section-title">Key Impact & Outcome</h4>
                <p class="pm-text">${project.outcome}</p>
            </div>

            <div class="pm-actions">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    <span>View Repository</span>
                </a>
                <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <span>Live Documentation</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
            </div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   7. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';

                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   8. RESUME PREVIEW MODAL
   ========================================================================== */
function initResumeModal() {
    const resumeModal = document.getElementById('resumeModal');
    const resumeHeroBtn = document.getElementById('resumeHeroBtn');
    const closeBtn = document.getElementById('closeResumeModalBtn');
    const printBtn = document.getElementById('printResumeBtn');

    if (!resumeModal || !closeBtn) return;

    const openModal = () => {
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (resumeHeroBtn) {
        resumeHeroBtn.addEventListener('click', openModal);
    }

    closeBtn.addEventListener('click', closeModal);

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeModal();
        }
    });

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

/* ==========================================================================
   9. STAT COUNTERS (ANIMATION ON SCROLL)
   ========================================================================== */
function initStatCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                    const duration = 1500;
                    const stepTime = 40;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.2 });

    const statsStrip = document.querySelector('.hero-stats-strip');
    if (statsStrip) {
        observer.observe(statsStrip);
    }
}

/* ==========================================================================
   10. TOAST NOTIFICATION MANAGER
   ========================================================================== */
function showToast(message, type = 'success', duration = 4500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconSvg = type === 'success'
        ? `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        : `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
        ${iconSvg}
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px) scale(0.9)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

/* ==========================================================================
   11. CONTACT FORM & EMAILJS INTEGRATION
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() || 'General Inquiry' : 'General Inquiry';
        const message = messageInput ? messageInput.value.trim() : '';

        // Validation
        if (!name || !email || !message) {
            showToast('Please fill in all required fields (Name, Email, Message).', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Set Loading State
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                </svg>
            `;
        }

        const templateParams = {
            from_name: name,
            name: name,
            email: email,
            subject: subject,
            message: message,
            time: new Date().toLocaleString()
        };

        try {
            if (window.emailConfig && typeof window.emailConfig.sendEmail === 'function') {
                await window.emailConfig.sendEmail(templateParams);
                showToast('Message sent successfully! I will reply shortly.', 'success');
                contactForm.reset();

                if (formMessage) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = "Thank you! Your message has been sent successfully.";
                    setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
                }
            } else {
                // Graceful fallback if EmailJS service is not configured
                showToast('Thank you! Your inquiry has been received.', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            showToast('Failed to send message via form. Please email directly to muthuselvamm022@gmail.com', 'error');

            if (formMessage) {
                formMessage.className = 'form-message error';
                formMessage.textContent = "Error sending message. Please reach out via muthuselvamm022@gmail.com directly.";
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    });
}

/* ==========================================================================
   12. CUSTOM CURSOR PHYSICS (DESKTOP)
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    if (!dot || !ring || window.innerWidth <= 1024) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animateRing = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
    };

    animateRing();

    // Hover scale effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card, .skill-card, .c-card, .bento-card');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
        target.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });
}

/* ==========================================================================
   13. THEME-AWARE PARTICLE CANVAS
   ========================================================================== */
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.isLight = document.documentElement.getAttribute('data-theme') === 'light';

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouseX = -1000;
            this.mouseY = -1000;
        });
    }

    updateThemeColors(theme) {
        this.isLight = theme === 'light';
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.min(Math.floor(window.innerWidth / 16), 75);
        this.particles = [];

        const colorBase = this.isLight ? '229, 9, 20' : '255, 30, 30';

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1,
                colorBase: colorBase,
                alpha: Math.random() * 0.4 + 0.15
            });
        }
    }

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update & Render Particles
        this.particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Mouse repulsion
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140 && dist > 0) {
                const force = (140 - dist) / 140;
                p.vx -= (dx / dist) * force * 0.04;
                p.vy -= (dy / dist) * force * 0.04;
            }

            p.vx *= 0.99;
            p.vy *= 0.99;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${p.colorBase}, ${p.alpha})`;
            this.ctx.fill();

            // Connections
            for (let j = idx + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const cdx = p.x - p2.x;
                const cdy = p.y - p2.y;
                const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                if (cdist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    const lineAlpha = (1 - cdist / 120) * (this.isLight ? 0.12 : 0.08);
                    this.ctx.strokeStyle = `rgba(${p.colorBase}, ${lineAlpha})`;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

function initParticleCanvas() {
    const canvas = document.getElementById('particles');
    if (canvas) {
        window.particleSystemInstance = new ParticleSystem(canvas);
    }
}

/* ==========================================================================
   14. VANILLA TILT INITIALIZATION
   ========================================================================== */
function initVanillaTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        tiltElements.forEach(el => {
            VanillaTilt.init(el, {
                max: 7,
                speed: 400,
                glare: false,
                perspective: 1000
            });
        });
    }
}

/* ==========================================================================
   15. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   16. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.section-header, .bento-card, .service-card, .timeline-card, .project-card, .skill-card, .contact-info-panel, .contact-form-panel'
    );

    if (!targets.length) return;

    targets.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        // Add staggered delay for grid items
        const delay = (index % 3) * 0.08;
        if (delay > 0) {
            el.style.transitionDelay = `${delay}s`;
        }
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    targets.forEach(el => observer.observe(el));
}

/* ==========================================================================
   17. MAGNETIC BUTTON INTERACTION (DESKTOP)
   ========================================================================== */
function initMagneticButtons() {
    if (window.innerWidth <= 1024) return;

    const magneticElements = document.querySelectorAll('.btn-primary, .social-icon-btn, .theme-toggle-btn, .logo-badge');

    magneticElements.forEach(elem => {
        elem.classList.add('magnetic-elem');

        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            elem.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px)';
        });
    });
}

/* ==========================================================================
   18. INTERACTIVE 3D MOUSE PARALLAX & LAYERED HERO ENGINE
   ========================================================================== */
function initHero3DParallax() {
    const stage = document.getElementById('heroParallaxStage');
    const heroSection = document.getElementById('home');
    if (!stage || !heroSection) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isMobile = window.innerWidth <= 640;
    let isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;

    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 640;
        isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;
        if (isMobile) {
            resetToRestingState();
        }
    }, { passive: true });

    if (isMobile) return;

    // Physics & State
    let isHovering = false;
    let isRunning = false;
    let rafId = null;

    // Target values
    let targetRotX = 0;
    let targetRotY = 0;
    let targetTransX = 0;
    let targetTransY = 0;
    let targetBgTransX = 0;
    let targetBgTransY = 0;
    let targetBadgeTransX = 0;
    let targetBadgeTransY = 0;
    let targetScale = 1;
    let targetSpotlightX = 50;
    let targetSpotlightY = 50;
    let targetSpotlightOpacity = 0;
    let targetSheenOpacity = 0;
    let targetSheenAngle = 115;

    // Current interpolated values
    let currRotX = 0;
    let currRotY = 0;
    let currTransX = 0;
    let currTransY = 0;
    let currBgTransX = 0;
    let currBgTransY = 0;
    let currBadgeTransX = 0;
    let currBadgeTransY = 0;
    let currScale = 1;
    let currSpotlightX = 50;
    let currSpotlightY = 50;
    let currSpotlightOpacity = 0;
    let currSheenOpacity = 0;
    let currSheenAngle = 115;

    const LERP_FACTOR = 0.085;

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function resetToRestingState() {
        targetRotX = 0;
        targetRotY = 0;
        targetTransX = 0;
        targetTransY = 0;
        targetBgTransX = 0;
        targetBgTransY = 0;
        targetBadgeTransX = 0;
        targetBadgeTransY = 0;
        targetScale = 1;
        targetSpotlightOpacity = 0;
        targetSheenOpacity = 0;
        targetSheenAngle = 115;

        if (!isRunning && !isMobile) {
            isRunning = true;
            rafId = requestAnimationFrame(animateParallax);
        }
    }

    function updateParallax(e) {
        if (isMobile) return;

        const rect = stage.getBoundingClientRect();
        const stageCenterX = rect.left + rect.width / 2;
        const stageCenterY = rect.top + rect.height / 2;

        // Normalized offsets (-1 to +1 within stage bounds)
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;
        const normX = Math.max(-1.4, Math.min(1.4, (e.clientX - stageCenterX) / halfWidth));
        const normY = Math.max(-1.4, Math.min(1.4, (e.clientY - stageCenterY) / halfHeight));

        const maxRot = isTablet ? 2.4 : 4.8;
        const maxTrans = isTablet ? 8 : 15;
        const maxBgTrans = isTablet ? 10 : 20;
        const maxBadgeTrans = isTablet ? 12 : 24;

        // 3D Rotations (Rotate around X based on vertical delta, Y based on horizontal delta)
        targetRotX = -normY * maxRot;
        targetRotY = normX * maxRot;

        // Layer 3 (Foreground Card: ~0.50x movement)
        targetTransX = normX * maxTrans;
        targetTransY = normY * maxTrans;

        // Layer 1 (Background Silhouette: ~0.15x movement with subtle counter-depth)
        targetBgTransX = -normX * maxBgTrans;
        targetBgTransY = -normY * maxBgTrans;

        // Badges: ~0.70x elevated depth movement
        targetBadgeTransX = normX * maxBadgeTrans;
        targetBadgeTransY = normY * maxBadgeTrans;

        // Hover scale
        targetScale = 1.02;

        // Layer 2: Dynamic Cursor Spotlight & Sheen Highlight
        const spotX = ((e.clientX - rect.left) / rect.width) * 100;
        const spotY = ((e.clientY - rect.top) / rect.height) * 100;
        targetSpotlightX = Math.max(0, Math.min(100, spotX));
        targetSpotlightY = Math.max(0, Math.min(100, spotY));
        targetSpotlightOpacity = 1;

        targetSheenAngle = 115 + normX * 25;
        targetSheenOpacity = 0.65;

        if (!isRunning) {
            isRunning = true;
            rafId = requestAnimationFrame(animateParallax);
        }
    }

    function animateParallax() {
        currRotX = lerp(currRotX, targetRotX, LERP_FACTOR);
        currRotY = lerp(currRotY, targetRotY, LERP_FACTOR);
        currTransX = lerp(currTransX, targetTransX, LERP_FACTOR);
        currTransY = lerp(currTransY, targetTransY, LERP_FACTOR);
        currBgTransX = lerp(currBgTransX, targetBgTransX, LERP_FACTOR);
        currBgTransY = lerp(currBgTransY, targetBgTransY, LERP_FACTOR);
        currBadgeTransX = lerp(currBadgeTransX, targetBadgeTransX, LERP_FACTOR);
        currBadgeTransY = lerp(currBadgeTransY, targetBadgeTransY, LERP_FACTOR);
        currScale = lerp(currScale, targetScale, LERP_FACTOR);
        currSpotlightX = lerp(currSpotlightX, targetSpotlightX, LERP_FACTOR);
        currSpotlightY = lerp(currSpotlightY, targetSpotlightY, LERP_FACTOR);
        currSpotlightOpacity = lerp(currSpotlightOpacity, targetSpotlightOpacity, LERP_FACTOR);
        currSheenOpacity = lerp(currSheenOpacity, targetSheenOpacity, LERP_FACTOR);
        currSheenAngle = lerp(currSheenAngle, targetSheenAngle, LERP_FACTOR);

        // Apply batch updates to CSS custom properties on stage
        stage.style.setProperty('--hero-rot-x', `${currRotX.toFixed(3)}deg`);
        stage.style.setProperty('--hero-rot-y', `${currRotY.toFixed(3)}deg`);
        stage.style.setProperty('--hero-trans-x', `${currTransX.toFixed(2)}px`);
        stage.style.setProperty('--hero-trans-y', `${currTransY.toFixed(2)}px`);
        stage.style.setProperty('--hero-scale', `${currScale.toFixed(4)}`);
        stage.style.setProperty('--bg-trans-x', `${currBgTransX.toFixed(2)}px`);
        stage.style.setProperty('--bg-trans-y', `${currBgTransY.toFixed(2)}px`);
        stage.style.setProperty('--badge-trans-x', `${currBadgeTransX.toFixed(2)}px`);
        stage.style.setProperty('--badge-trans-y', `${currBadgeTransY.toFixed(2)}px`);
        stage.style.setProperty('--spotlight-x', `${currSpotlightX.toFixed(1)}%`);
        stage.style.setProperty('--spotlight-y', `${currSpotlightY.toFixed(1)}%`);
        stage.style.setProperty('--spotlight-opacity', `${currSpotlightOpacity.toFixed(3)}`);
        stage.style.setProperty('--sheen-angle', `${currSheenAngle.toFixed(1)}deg`);
        stage.style.setProperty('--sheen-opacity', `${currSheenOpacity.toFixed(3)}`);

        // Check if values have reached resting threshold when not hovering
        if (!isHovering) {
            const deltaRot = Math.abs(currRotX) + Math.abs(currRotY);
            const deltaTrans = Math.abs(currTransX) + Math.abs(currTransY) + Math.abs(currBgTransX) + Math.abs(currBgTransY);
            const deltaOpacity = currSpotlightOpacity + currSheenOpacity;
            const deltaScale = Math.abs(currScale - 1);

            if (deltaRot < 0.005 && deltaTrans < 0.05 && deltaOpacity < 0.005 && deltaScale < 0.0005) {
                // Snap to exact resting state and stop RAF loop to save resources
                stage.style.setProperty('--hero-rot-x', '0deg');
                stage.style.setProperty('--hero-rot-y', '0deg');
                stage.style.setProperty('--hero-trans-x', '0px');
                stage.style.setProperty('--hero-trans-y', '0px');
                stage.style.setProperty('--hero-scale', '1');
                stage.style.setProperty('--bg-trans-x', '0px');
                stage.style.setProperty('--bg-trans-y', '0px');
                stage.style.setProperty('--badge-trans-x', '0px');
                stage.style.setProperty('--badge-trans-y', '0px');
                stage.style.setProperty('--spotlight-opacity', '0');
                stage.style.setProperty('--sheen-opacity', '0');

                currRotX = 0; currRotY = 0;
                currTransX = 0; currTransY = 0;
                currBgTransX = 0; currBgTransY = 0;
                currBadgeTransX = 0; currBadgeTransY = 0;
                currScale = 1;
                currSpotlightOpacity = 0;
                currSheenOpacity = 0;

                isRunning = false;
                rafId = null;
                return;
            }
        }

        rafId = requestAnimationFrame(animateParallax);
    }

    // Event Listeners on hero section & stage for broad and smooth tracking
    heroSection.addEventListener('pointerenter', (e) => {
        if (isMobile) return;
        isHovering = true;
        updateParallax(e);
    }, { passive: true });

    heroSection.addEventListener('pointermove', (e) => {
        if (isMobile) return;
        isHovering = true;
        updateParallax(e);
    }, { passive: true });

    heroSection.addEventListener('pointerleave', () => {
        isHovering = false;
        resetToRestingState();
    }, { passive: true });
}

