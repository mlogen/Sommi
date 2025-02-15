// Use strict mode for better error catching and performance
'use strict';

// Cache DOM elements for better performance
const elements = {
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    navLinks: document.querySelector('.nav-links'),
    scrollToTopBtn: document.querySelector('.scroll-to-top'),
    heroImages: Array.from(document.querySelectorAll('.hero-image')),
    contactForm: document.querySelector('#contact-form')
};

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile Menu Toggle with event delegation
if (elements.mobileMenuBtn) {
    elements.mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.mobileMenuBtn.classList.toggle('active');
        elements.navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside - with event delegation
document.addEventListener('click', (e) => {
    if (elements.mobileMenuBtn && elements.navLinks &&
        !elements.mobileMenuBtn.contains(e.target) && 
        !elements.navLinks.contains(e.target)) {
        elements.mobileMenuBtn.classList.remove('active');
        elements.navLinks.classList.remove('active');
    }
});

// Optimized scroll handler with debounce
const handleScroll = debounce(() => {
    if (elements.scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            elements.scrollToTopBtn.classList.add('visible');
        } else {
            elements.scrollToTopBtn.classList.remove('visible');
        }
    }
}, 100);

window.addEventListener('scroll', handleScroll);

// Scroll to Top with smooth behavior
if (elements.scrollToTopBtn) {
    elements.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Optimized smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (elements.mobileMenuBtn && elements.navLinks) {
                elements.mobileMenuBtn.classList.remove('active');
                elements.navLinks.classList.remove('active');
            }
        }
    });
});

// Optimized Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.feature-card, .menu-item, .gallery-item').forEach(element => {
    observer.observe(element);
});

// Enhanced Form Validation with security measures
if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const formElements = {
            name: elements.contactForm.querySelector('[name="name"]'),
            email: elements.contactForm.querySelector('[name="email"]'),
            message: elements.contactForm.querySelector('[name="message"]')
        };
        
        // Sanitize and validate input
        const sanitizedInputs = {
            name: DOMPurify.sanitize(formElements.name.value.trim()),
            email: DOMPurify.sanitize(formElements.email.value.trim()),
            message: DOMPurify.sanitize(formElements.message.value.trim())
        };
        
        // Validation
        if (!sanitizedInputs.name || !sanitizedInputs.email || !sanitizedInputs.message) {
            showFormError('Please fill in all required fields');
            return;
        }
        
        if (!isValidEmail(sanitizedInputs.email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        // Using fetch with proper error handling
        submitForm(sanitizedInputs);
    });
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Form error handling
function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    // Remove any existing error messages
    const existingError = elements.contactForm.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    elements.contactForm.insertBefore(errorDiv, elements.contactForm.firstChild);
    setTimeout(() => errorDiv.remove(), 5000);
}

// Optimized form submission
async function submitForm(data) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Success handling
        elements.contactForm.reset();
        showFormSuccess('Thank you for your message! We will get back to you soon.');
    } catch (error) {
        console.error('Error:', error);
        showFormError('There was a problem sending your message. Please try again later.');
    }
}

// Optimized image loading with lazy loading
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Optimized Hero Image Slider
if (elements.heroImages.length > 0) {
    let currentImageIndex = 0;
    let sliderInterval;

    function showNextImage() {
        elements.heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % elements.heroImages.length;
        elements.heroImages[currentImageIndex].classList.add('active');
    }

    // Show first image immediately
    elements.heroImages[0].classList.add('active');

    // Start slideshow if there's more than one image
    if (elements.heroImages.length > 1) {
        // Preload next image
        const preloadNextImage = () => {
            const nextIndex = (currentImageIndex + 1) % elements.heroImages.length;
            const nextImage = elements.heroImages[nextIndex];
            if (nextImage.tagName === 'IMG') {
                const img = new Image();
                img.src = nextImage.src;
            }
        };

        // Initialize slider with preloading
        sliderInterval = setInterval(() => {
            showNextImage();
            preloadNextImage();
        }, 5000);

        // Pause slider when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(sliderInterval);
            } else {
                sliderInterval = setInterval(showNextImage, 5000);
            }
        });
    }
}
