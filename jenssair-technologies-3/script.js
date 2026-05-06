// script.js

// Services data
const services = [
    {
        id: "data-analytics",
        title: "Data Analytics",
        description: "Transform raw data into actionable insights with advanced analytics, visualization, and reporting tools to drive informed business decisions.",
        icon: "fas fa-chart-bar",
        color: "#00d9ff"
    },
    {
        id: "data-science",
        title: "Data Science",
        description: "Leverage machine learning, statistical analysis, and predictive modeling to extract value from complex data sets.",
        icon: "fas fa-database",
        color: "#ff00ff"
    },
    {
        id: "ai-engineering",
        title: "AI Engineering",
        description: "Design, build, and deploy robust AI systems and machine learning models tailored to your specific business needs.",
        icon: "fas fa-robot",
        color: "#00ff88"
    },
    {
        id: "ai-automation",
        title: "AI Automation",
        description: "Automate repetitive tasks and streamline business processes with intelligent AI-powered automation solutions.",
        icon: "fas fa-cogs",
        color: "#ffaa00"
    },
    {
        id: "agentic-ai",
        title: "Agentic AI",
        description: "Develop autonomous AI agents capable of making decisions, learning, and adapting to dynamic environments.",
        icon: "fas fa-brain",
        color: "#aa00ff"
    },
    {
        id: "robotic-ai",
        title: "Robotic AI",
        description: "Combine robotics with AI to create intelligent systems that can perceive, learn, and interact with the physical world.",
        icon: "fas fa-industry",
        color: "#00d9ff"
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering",
        description: "Craft optimized prompts and interactions for large language models to maximize their effectiveness and accuracy.",
        icon: "fas fa-code",
        color: "#ff00ff"
    },
    {
        id: "cyber-security",
        title: "Cyber Security",
        description: "Protect your digital assets with comprehensive cybersecurity solutions, threat detection, and risk management.",
        icon: "fas fa-shield-alt",
        color: "#00ff88"
    },
    {
        id: "ethical-hacking",
        title: "Ethical Hacking",
        description: "Identify vulnerabilities in your systems through authorized penetration testing and security assessments.",
        icon: "fas fa-user-secret",
        color: "#ffaa00"
    },
    {
        id: "python-dev",
        title: "Python Development",
        description: "Build scalable, high-performance applications and scripts using Python and its extensive ecosystem of libraries.",
        icon: "fab fa-python",
        color: "#aa00ff"
    }
];

// DOM Elements
const servicesGrid = document.querySelector('.services-grid');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');
const contactForm = document.getElementById('contactForm');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Initialize services
function initServices() {
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.id = service.id;
        
        serviceCard.innerHTML = `
            <div class="service-icon" style="background: linear-gradient(45deg, ${service.color}, ${service.color}dd);">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="#" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Modal functionality
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services
    initServices();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    authButtons.style.display = 'none';
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Login button click
    loginBtn.addEventListener('click', () => openModal(loginModal));
    
    // Signup button click
    signupBtn.addEventListener('click', () => openModal(signupModal));
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            authButtons.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            authButtons.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(5, 5, 16, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.borderTop = '1px solid var(--border)';
            navLinks.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
            
            authButtons.style.position = 'absolute';
            authButtons.style.top = 'calc(100% + 250px)';
            authButtons.style.left = '0';
            authButtons.style.width = '100%';
            authButtons.style.justifyContent = 'center';
            authButtons.style.padding = '1rem';
            authButtons.style.backgroundColor = 'rgba(5, 5, 16, 0.98)';
            authButtons.style.borderTop = '1px solid var(--border)';
        }
    });
    
    // Form submissions
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login functionality would be implemented in a real application.');
        closeModal(loginModal);
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Account creation functionality would be implemented in a real application.');
        closeModal(signupModal);
    });
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(5, 5, 16, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'rgba(5, 5, 16, 0.95)';
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add high-tech typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
});