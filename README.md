# 🏍️ Pro Bike Care - Smart Maintenance Estimator

A modern, responsive web application designed to help bike owners estimate accurate maintenance costs based on their specific **Brand** and **Model**. Built with HTML, CSS, and vanilla JavaScript (No frameworks).

![Project Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Tech Stack](https://img.shields.io/badge/HTML-CSS-JS-blue)

## 🚀 Key Features

- **🛠️ Dynamic Cost Calculator**: 
  - **Smart Pricing**: Costs adjust automatically based on the selected bike model (e.g., KTM service costs more than a Hero Splendor).
  - **Real-Time Updates**: No page refresh required; calculations happen instantly in the browser.
  - **Model-Specific Data**: Includes pricing factors for Honda, Yamaha, Royal Enfield, KTM, and Hero.
- **📅 Service Booking**: Simple form to submit service requests.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop.
- **🎨 Modern UI**: Dark theme with neon accents and smooth animations.
- **⚡ Zero Dependencies**: Pure JavaScript (ES6+) with no global variable conflicts.

## 🛠️ Technical Highlights

- **No Global Scope Pollution**: Logic is encapsulated within `DOMContentLoaded` to prevent `ReferenceError` issues (fixing common "variable not defined" errors).
- **Dynamic DOM Manipulation**: Dropdowns populate instantly based on user selection.
- **Animated Calculations**: CSS/JS animation for cost display.

## 📂 Project Structure

```text
bike-maintenance/
│
├── index.html          # Main landing page with calculator
├── style.css           # Dark theme, responsive grid, animations
├── script.js           # Logic: Bike DB, Calculator, Form handling
└── README.md           # This file