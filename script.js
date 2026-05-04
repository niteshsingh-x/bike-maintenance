// --- Bike Maintenance Website Logic ---
// Encapsulated to prevent global scope pollution (fixing "niteshsingh is not defined" errors)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BIKE DATABASE (Pricing Factors) ---
    // Multiplier based on bike type: 
    // 1.0 = Normal (100-125cc)
    // 1.3 = Premium (150-200cc)
    // 1.8 = Heavyweight (350cc+)
    // 2.0+ = Sport/Performance (KTM, etc.)
    
    const bikeData = {
        honda: {
            name: "Honda",
            models: {
                "activa-6g": { name: "Activa 6G", factor: 1.0, baseOil: 350, baseChain: 250, baseBrake: 400, baseTire: 200 },
                "shine": { name: "Honda Shine", factor: 1.0, baseOil: 400, baseChain: 250, baseBrake: 450, baseTire: 200 },
                "cbr150": { name: "CBR 150R", factor: 1.3, baseOil: 800, baseChain: 600, baseBrake: 900, baseTire: 400 },
                "sp125": { name: "SP 125", factor: 1.1, baseOil: 450, baseChain: 280, baseBrake: 480, baseTire: 220 }
            }
        },
        yamaha: {
            name: "Yamaha",
            models: {
                "fz-s": { name: "FZ-S FI", factor: 1.2, baseOil: 600, baseChain: 400, baseBrake: 700, baseTire: 350 },
                "r15": { name: "R15 V4", factor: 1.6, baseOil: 1200, baseChain: 900, baseBrake: 1500, baseTire: 600 },
                "mt15": { name: "MT-15", factor: 1.5, baseOil: 1100, baseChain: 850, baseBrake: 1400, baseTire: 550 }
            }
        },
        royal-enfield: {
            name: "Royal Enfield",
            models: {
                "classic-350": { name: "Classic 350", factor: 1.8, baseOil: 1200, baseChain: 800, baseBrake: 1500, baseTire: 700 },
                "hunter-350": { name: "Hunter 350", factor: 1.8, baseOil: 1100, baseChain: 800, baseBrake: 1500, baseTire: 700 },
                "meteor": { name: "Meteor 350", factor: 1.8, baseOil: 1250, baseChain: 850, baseBrake: 1600, baseTire: 750 }
            }
        },
        ktm: {
            name: "KTM",
            models: {
                "rc-200": { name: "RC 200", factor: 2.0, baseOil: 1500, baseChain: 1200, baseBrake: 2000, baseTire: 800 },
                "duke-390": { name: "Duke 390", factor: 2.2, baseOil: 1800, baseChain: 1400, baseBrake: 2200, baseTire: 900 },
                "duke-250": { name: "Duke 250", factor: 2.0, baseOil: 1600, baseChain: 1200, baseBrake: 2100, baseTire: 850 }
            }
        },
        hero: {
            name: "Hero",
            models: {
                "splendor": { name: "Splendor+", factor: 1.0, baseOil: 300, baseChain: 200, baseBrake: 350, baseTire: 180 },
                "xpulse": { name: "Xpulse 200", factor: 1.4, baseOil: 700, baseChain: 500, baseBrake: 800, baseTire: 400 },
                " Xtreme": { name: "Xtreme 160R", factor: 1.3, baseOil: 600, baseChain: 400, baseBrake: 700, baseTire: 350 }
            }
        }
    };

    // --- 2. DOM ELEMENTS ---
    const brandSelect = document.getElementById('brandSelect');
    const modelSelect = document.getElementById('modelSelect');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalCostSpan = document.getElementById('totalCost');
    const bikeNote = document.getElementById('bikeNote');
    const checkboxes = document.querySelectorAll('input[name="service"]');
    
    // Navbar & Contact Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');

    // --- 3. EVENT LISTENERS ---

    // A. Brand Change: Populate Models
    if (brandSelect && modelSelect) {
        brandSelect.addEventListener('change', () => {
            const selectedBrand = brandSelect.value;
            
            // Reset model dropdown
            modelSelect.innerHTML = '<option value="">-- Choose Model --</option>';
            
            if (selectedBrand && bikeData[selectedBrand]) {
                modelSelect.disabled = false;
                // Populate options
                Object.keys(bikeData[selectedBrand].models).forEach(modelKey => {
                    const option = document.createElement('option');
                    option.value = modelKey;
                    option.textContent = bikeData[selectedBrand].models[modelKey].name;
                    modelSelect.appendChild(option);
                });
                bikeNote.textContent = "Select a model to update prices.";
            } else {
                modelSelect.disabled = true;
                modelSelect.innerHTML = '<option value="">-- Select Brand First --</option>';
                bikeNote.textContent = "Select a brand first.";
                calculateBtn.disabled = true;
                totalCostSpan.textContent = "₹0";
            }
        });

        // B. Model Change: Enable Calculate Button
        modelSelect.addEventListener('change', () => {
            if (modelSelect.value) {
                calculateBtn.disabled = false;
                const brandName = bikeData[brandSelect.value].name;
                const modelName = bikeData[brandSelect.value].models[modelSelect.value].name;
                bikeNote.textContent = `Pricing updated for ${brandName} ${modelName}`;
            } else {
                calculateBtn.disabled = true;
                bikeNote.textContent = "Select a model.";
            }
        });

        // C. Calculate Cost
        calculateBtn.addEventListener('click', () => {
            const brand = brandSelect.value;
            const model = modelSelect.value;

            if (!brand || !model) {
                alert("Please select both Brand and Model first.");
                return;
            }

            const bikeDetails = bikeData[brand].models[model];
            let total = 0;

            checkboxes.forEach(cb => {
                if (cb.checked) {
                    let basePrice = 0;
                    const serviceType = cb.value; 

                    // Map service type to price key
                    if (serviceType === 'base-oil') basePrice = bikeDetails.baseOil;
                    else if (serviceType === 'base-chain') basePrice = bikeDetails.baseChain;
                    else if (serviceType === 'base-brake') basePrice = bikeDetails.baseBrake;
                    else if (serviceType === 'base-tire') basePrice = bikeDetails.baseTire;

                    // Apply factor
                    const finalPrice = Math.round(basePrice * bikeDetails.factor);
                    total += finalPrice;
                }
            });

            // Animate the total
            animateValue(totalCostSpan, parseInt(totalCostSpan.textContent.replace('₹', '')), total, 1000);
            
            bikeNote.textContent = `Calculation for: ${bikeData[brand].name} ${bikeDetails.name} (Factor x${bikeDetails.factor})`;
        });
    }

    // D. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // E. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('active');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // F. Contact Form Submission (Demo)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather data (in a real app, send to backend)
            const name = document.getElementById('contactName').value;
            const bike = document.getElementById('contactBike').value;
            
            alert(`Thank you, ${name}! \nYour request for "${bike}" service has been submitted.\nWe will contact you shortly.`);
            contactForm.reset();
        });
    }

    // --- 4. UTILITY FUNCTIONS ---

    // Helper to animate numbers
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