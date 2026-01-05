// Typing Animation
const typed = document.querySelector('.typing');
const roles = ['Data Scientist', 'Python Devoloper', 'Backend Devoloper'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typed.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typed.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Wait before deleting
        isDeleting = true;
        setTimeout(typeText, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        // Move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
typeText();

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check for elements already in view
revealOnScroll();

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Progress Bar Animation
const progressBars = document.querySelectorAll('.bar span');

function animateProgressBars() {
    progressBars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        const barElement = bar.closest('.skills-content');
        
        if (barElement) {
            const elementTop = barElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && !bar.classList.contains('animated')) {
                bar.style.width = width;
                bar.classList.add('animated');
            }
        }
    });
}

// Check progress bars on scroll
window.addEventListener('scroll', animateProgressBars);
// Initial check
animateProgressBars();

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function activeNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Read More Button Functionality
const readMoreBtn = document.querySelector('.read-more-btn');
const moreText = document.querySelector('.more-text');

if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moreText.classList.toggle('show');
        readMoreBtn.textContent = moreText.classList.contains('show') ? 'Read Less' : 'Read More';
    });
}

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && subject && message) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Scroll to Top Button Functionality
const footerIconTop = document.querySelector('.footer-iconTop a');

if (footerIconTop) {
    footerIconTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            footerIconTop.style.opacity = '1';
            footerIconTop.style.visibility = 'visible';
        } else {
            footerIconTop.style.opacity = '0';
            footerIconTop.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button visibility
if (footerIconTop) {
    footerIconTop.style.transition = 'opacity 0.3s, visibility 0.3s';
    footerIconTop.style.opacity = '0';
    footerIconTop.style.visibility = 'hidden';
}

// Add active class to home section on page load
window.addEventListener('load', () => {
    revealOnScroll();
    animateProgressBars();
    activeNavLink();
});

// Mobile Menu Toggle (for smaller screens)
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 20px rgba(0, 171, 240, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 30px rgba(0, 171, 240, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section (subtle)
const homeSection = document.querySelector('.home');

if (homeSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            homeSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add intersection observer for better performance on scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
revealElements.forEach((el) => observer.observe(el));

// Enhanced progress bar observer
const progressBarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            
            if (width && !bar.classList.contains('animated')) {
                bar.style.width = width;
                bar.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

// Observe all progress bars
progressBars.forEach((bar) => progressBarObserver.observe(bar));

