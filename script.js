// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// --- Typing Effect ---
const typingText = document.getElementById('typing-text');
const words = ["AI Developer", "Artificial Intelligence & Data Science Student", "SAP Enthusiast", "Full Stack Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

if (typingText) {
    type();
}

// --- Intersection Observer for Reveals ---
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If it's a skill category, trigger progress bars
            if (entry.target.classList.contains('skills')) {
                animateProgressBars();
            }
            
            // If it's achievements, trigger counters
            if (entry.target.classList.contains('achievements')) {
                animateCounters();
            }
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal, .section').forEach(el => revealObserver.observe(el));

// --- Animate Progress Bars ---
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// --- Animate Counters ---
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target;
        }
    });
}

// --- Navbar Background on Scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        navbar.style.height = '70px';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.5)';
        navbar.style.boxShadow = 'none';
        navbar.style.height = '90px';
    }
});

// --- Active Link Highlighting ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// --- Contact Form Simulation ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'TRANSMITTING... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            formStatus.style.display = 'block';
            formStatus.textContent = 'TRANSMISSION SUCCESSFUL. STAND BY FOR RESPONSE.';
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
        }, 2000);
    });
}
