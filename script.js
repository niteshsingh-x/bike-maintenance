// Calculator Logic
const calculateBtn = document.getElementById('calculateBtn');
const totalCostSpan = document.getElementById('totalCost');
const checkboxes = document.querySelectorAll('input[name="service"]');

calculateBtn.addEventListener('click', () => {
    let total = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseInt(cb.value);
        }
    });

    // Animate the number
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentVal = Math.floor(progress * total);
        totalCostSpan.textContent = `₹${currentVal}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            totalCostSpan.textContent = `₹${total}`;
        }
    }
    
    requestAnimationFrame(update);
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission (Demo)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Service request submitted! We will contact you soon.');
    contactForm.reset();
});

// Mobile Menu Toggle (Basic)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(30, 30, 47, 0.95)';
        navLinks.style.padding = '20px';
    }
});