 const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function updateNavLogo(sectionId) {
            const logos = document.querySelectorAll('#navLogo img');
            logos.forEach(logo => {
                if (logo.dataset.section === sectionId) {
                    logo.classList.remove('hidden');
                } else {
                    logo.classList.add('hidden');
                }
            });
        }

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        const sections = document.querySelectorAll('.section');
        const navDots = document.querySelectorAll('.nav-dot');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let current = '';
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.clientHeight;
                        if (window.pageYOffset >= sectionTop - 300) {
                            current = section.getAttribute('id');
                        }
                    });

                    navDots.forEach((dot, index) => {
                        dot.classList.remove('active');
                        if (index === Array.from(sections).findIndex(s => s.id === current)) {
                            dot.classList.add('active');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + current) {
                            link.classList.add('active');
                        }
                    });

                    updateNavLogo(current);

                    ticking = false;
                });

                ticking = true;
            }
        });

        window.addEventListener('scroll', () => {
            const shapes = document.querySelectorAll('.shape');
            const scrolled = window.pageYOffset;
            
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        window.addEventListener('load', () => {
            const teamSection = document.getElementById('team');
            if (teamSection) {
                teamSection.classList.add('visible');
            }
        });

        // System data with links and descriptions
const systemData = {
    system1: {
        name: 'A.C.E Scheduling System',
        description: 'Automated Class Engine - Streamline your class scheduling process with intelligent automation.',
        logo: '1.png',
        url: 'https://automated-class-engine-system-1.onrender.com'
    },
    system2: {
        name: 'ASCReM System',
        description: 'Student Record Management - Centralized platform for managing all academic records efficiently.',
        logo: '2.png',
        url: 'https://ascrem.onrender.com'
    },
    system3: {
        name: 'HerbMed System',
        description: 'Herbal Medicine Information System - Comprehensive database of herbal remedies and medicinal properties.',
        logo: '3.png',
        url: 'https://herbmed.onrender.com'
    },
    system4: {
        name: 'Tubig Tracker',
        description: 'Water Consumption Tracker - Monitor and track your daily water intake for better health.',
        logo: '4.png',
        url: 'https://tubig-tracker.onrender.com'
    }
};

// Open modal function
function openModal(systemId) {
    const system = systemData[systemId];
    if (!system) return;

    const modal = document.getElementById('modalOverlay');
    const modalLogo = document.getElementById('modalLogoImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const confirmBtn = document.getElementById('modalConfirmBtn');

    // Set modal content
    modalLogo.src = system.logo;
    modalTitle.textContent = system.name;
    modalDescription.textContent = system.description;
    confirmBtn.href = system.url;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalOverlay');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Existing scroll and navigation functions (keep all your existing JS)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active states
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navLogo = document.getElementById('navLogo');
    const logoImages = navLogo.querySelectorAll('img');

    let currentSection = '';

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update dots
    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        const sectionIds = ['team', 'system1', 'system2', 'system3', 'system4'];
        if (sectionIds[index] === currentSection) {
            dot.classList.add('active');
        }
    });

    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Update logo
    logoImages.forEach(img => {
        img.classList.add('hidden');
        const imgSection = img.getAttribute('data-section');
        if (imgSection === currentSection) {
            img.classList.remove('hidden');
        }
    });

    // Show sections on scroll
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - window.innerHeight / 1.3)) {
            section.classList.add('visible');
        }
    });
});


// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});