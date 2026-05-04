// --- Bike Maintenance Website Logic ---
// Encapsulated within DOMContentLoaded to prevent global scope pollution
// This fixes the "niteshsingh is not defined" error completely.

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BIKE DATABASE (Smart Search List) ---
    // All bikes in one flat list. Search filters by Brand OR Model name.
    const allBikes = [
        // Honda
        { id: 'honda-activa', brand: 'Honda', model: 'Activa 6G', factor: 1.0, baseOil: 350, baseChain: 250, baseBrake: 400, baseTire: 200 },
        { id: 'honda-shine', brand: 'Honda', model: 'Honda Shine', factor: 1.0, baseOil: 400, baseChain: 250, baseBrake: 450, baseTire: 200 },
        { id: 'honda-sp125', brand: 'Honda', model: 'SP 125', factor: 1.1, baseOil: 450, baseChain: 280, baseBrake: 480, baseTire: 220 },
        { id: 'honda-cbr150', brand: 'Honda', model: 'CBR 150R', factor: 1.3, baseOil: 800, baseChain: 600, baseBrake: 900, baseTire: 400 },
        
        // Yamaha
        { id: 'yamaha-fz', brand: 'Yamaha', model: 'FZ-S FI', factor: 1.2, baseOil: 600, baseChain: 400, baseBrake: 700, baseTire: 350 },
        { id: 'yamaha-r15', brand: 'Yamaha', model: 'R15 V4', factor: 1.6, baseOil: 1200, baseChain: 900, baseBrake: 1500, baseTire: 600 },
        { id: 'yamaha-mt15', brand: 'Yamaha', model: 'MT-15', factor: 1.5, baseOil: 1100, baseChain: 850, baseBrake: 1400, baseTire: 550 },
        
        // Royal Enfield
        { id: 're-classic', brand: 'Royal Enfield', model: 'Classic 350', factor: 1.8, baseOil: 1200, baseChain: 800, baseBrake: 1500, baseTire: 700 },
        { id: 're-hunter', brand: 'Royal Enfield', model: 'Hunter 350', factor: 1.8, baseOil: 1100, baseChain: 800, baseBrake: 1500, baseTire: 700 },
        { id: 're-meteor', brand: 'Royal Enfield', model: 'Meteor 350', factor: 1.8, baseOil: 1250, baseChain: 850, baseBrake: 1600, baseTire: 750 },
        
        // KTM
        { id: 'ktm-rc200', brand: 'KTM', model: 'RC 200', factor: 2.0, baseOil: 1500, baseChain: 1200, baseBrake: 2000, baseTire: 800 },
        { id: 'ktm-duke390', brand: 'KTM', model: 'Duke 390', factor: 2.2, baseOil: 1800, baseChain: 1400, baseBrake: 2200, baseTire: 900 },
        { id: 'ktm-duke250', brand: 'KTM', model: 'Duke 250', factor: 2.0, baseOil: 1600, baseChain: 1200, baseBrake: 2100, baseTire: 850 },
        
        // Hero
        { id: 'hero-splendor', brand: 'Hero', model: 'Splendor+', factor: 1.0, baseOil: 300, baseChain: 200, baseBrake: 350, baseTire: 180 },
        { id: 'hero-xpulse', brand: 'Hero', model: 'Xpulse 200', factor: 1.4, baseOil: 700, baseChain: 500, baseBrake: 800, baseTire: 400 },
        { id: 'hero-xtreme', brand: 'Hero', model: 'Xtreme 160R', factor: 1.3, baseOil: 600, baseChain: 400, baseBrake: 700, baseTire: 350 },
        
        // TVS (For RTR search)
        { id: 'tvs-apache200', brand: 'TVS', model: 'Apache RTR 200 4V', factor: 1.4, baseOil: 750, baseChain: 550, baseBrake: 900, baseTire: 450 },
        { id: 'tvs-apache180', brand: 'TVS', model: 'Apache RTR 180', factor: 1.3, baseOil: 700, baseChain: 500, baseBrake: 850, baseTire: 420 },
        { id: 'tvs-apache125', brand: 'TVS', model: 'Apache RTR 125', factor: 1.1, baseOil: 450, baseChain: 300, baseBrake: 450, baseTire: 250 },
        
        // Bajaj
        { id: 'bajaj-pulsar150', brand: 'Bajaj', model: 'Pulsar 150', factor: 1.1, baseOil: 400, baseChain: 300, baseBrake: 450, baseTire: 250 },
        { id: 'bajaj-pulsar220', brand: 'Bajaj', model: 'Pulsar 220F', factor: 1.3, baseOil: 600, baseChain: 450, baseBrake: 700, baseTire: 350 },
        { id: 'bajaj-dominar', brand: 'Bajaj', model: 'Dominar 400', factor: 1.7, baseOil: 1100, baseChain: 800, baseBrake: 1400, baseTire: 650 }
    ];

    // --- 2. DOM ELEMENTS ---
    const bikeSearch = document.getElementById('bikeSearch');
    const searchResults = document.getElementById('searchResults');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalCostSpan = document.getElementById('totalCost');
    const bikeNote = document.getElementById('bikeNote');
    const checkboxes = document.querySelectorAll('input[name="service"]');
    
    // Navbar & Contact Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');

    // Current Selected Bike Data
    let selectedBike = null;

    // --- 3. EVENT LISTENERS ---

    // A. Smart Search Input Logic
    if (bikeSearch && searchResults) {
        bikeSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // Clear if empty
            if (query.length === 0) {
                searchResults.classList.remove('active');
                return;
            }

            // Filter bikes: Matches Brand OR Model
            const filtered = allBikes.filter(bike => 
                bike.brand.toLowerCase().includes(query) || 
                bike.model.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                displayResults(filtered);
            } else {
                searchResults.innerHTML = '<div class="search-item">No bikes found</div>';
                searchResults.classList.add('active');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!bikeSearch.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    // Function to display search results
    function displayResults(bikes) {
        searchResults.innerHTML = '';
        bikes.forEach(bike => {
            const item = document.createElement('div');
            item.className = 'search-item';
            item.innerHTML = `<strong>${bike.brand}</strong> - ${bike.model}`;
            
            item.addEventListener('click', () => {
                bikeSearch.value = `${bike.brand} ${bike.model}`;
                selectBike(bike);
                searchResults.classList.remove('active');
            });
            
            searchResults.appendChild(item);
        });
        searchResults.classList.add('active');
    }

    // Function to select a bike
    function selectBike(bike) {
        selectedBike = bike;
        calculateBtn.disabled = false;
        bikeNote.textContent = `Selected: ${bike.brand} ${bike.model} (Factor x${bike.factor})`;
    }

    // B. Calculate Cost Logic (Continued)
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            if (!selectedBike) {
                alert("Please select a bike first!");
                return;
            }

            let total = 0;
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    let basePrice = 0;
                    const serviceType = cb.value;
                    
                    if (serviceType === 'base-oil') basePrice = selectedBike.baseOil;
                    else if (serviceType === 'base-chain') basePrice = selectedBike.baseChain;
                    else if (serviceType === 'base-brake') basePrice = selectedBike.baseBrake;
                    else if (serviceType === 'base-tire') basePrice = selectedBike.baseTire;

                    const finalPrice = Math.round(basePrice * selectedBike.factor);
                    total += finalPrice;
                }
            });

            // Animate the total
            animateValue(totalCostSpan, parseInt(totalCostSpan.textContent.replace('₹', '')), total, 1000);
        });
    }

    // C. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // D. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (navLinks) navLinks.classList.remove('active');
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // E. Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const bike = document.getElementById('contactBike').value;
            
            alert(`Thank you, ${name}! \nYour request for "${bike}" has been submitted.\nWe will contact you shortly.`);
            contactForm.reset();
        });
    }

    // Helper: Animate numbers
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.textContent = `₹${value}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.textContent = `₹${end}`;
            }
        };
        window.requestAnimationFrame(step);
    }

});