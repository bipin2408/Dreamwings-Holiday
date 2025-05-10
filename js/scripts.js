'use strict';

// Navbar Toggle
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navToggleEvent = (elem) => {
  elem.forEach(el => el.addEventListener("click", () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  }));
};
navToggleEvent([navOpenBtn, navCloseBtn, overlay, ...navLinks]);

// Load Packages
fetch('./data/packages.json')
  .then(response => response.json())
  .then(data => {
    const packageList = document.getElementById('package-list');
    data.forEach(pkg => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="package-card">
          <figure class="card-banner"><img src="${pkg.image}" alt="${pkg.title}" loading="lazy"></figure>
          <div class="card-content">
            <h3 class="h3 card-title">${pkg.title}</h3>
            <p class="card-text">${pkg.description}</p>
            <p class="card-text">Duration: ${pkg.duration}</p>
            <p class="card-text">Location: ${pkg.location}</p>
            <p class="card-text">Price: ${pkg.price}</p>
            <button class="btn btn-secondary">Book Now</button>
          </div>
        </div>
      `;
      packageList.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading packages:', error));

// Sticky Header & Go to Top
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});