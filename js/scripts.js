'use strict';

// Navbar toggle
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

// Smooth scrolling
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Header sticky & go to top
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

// Loader
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// Load JSON data
async function loadJSON(url) {
  const response = await fetch(url);
  return await response.json();
}

// Popular Destinations
async function loadPopularDestinations() {
  const data = await loadJSON('popular.json');
  const popularList = document.getElementById('popular-list');
  popularList.innerHTML = data.map(item => `
    <li>
      <div class="popular-card">
        <figure class="card-img">
          <img src="${item.image}" alt="${item.alt}" loading="lazy">
        </figure>
        <div class="card-content">
          <div class="card-rating">
            ${'<ion-icon name="star"></ion-icon>'.repeat(item.rating)}
          </div>
          <p class="card-subtitle"><a href="#">${item.subtitle}</a></p>
          <h3 class="h3 card-title"><a href="#">${item.title}</a></h3>
          <p class="card-text">${item.text}</p>
        </div>
      </div>
    </li>
  `).join('');
}

// Packages
async function loadPackages() {
  const data = await loadJSON('packages.json');
  const packageList = document.getElementById('package-list');
  packageList.innerHTML = data.map(item => `
    <li>
      <div class="package-card">
        <figure class="card-banner">
          <img src="${item.image}" alt="${item.alt}" loading="lazy">
        </figure>
        <div class="card-content">
          <h3 class="h3 card-title">${item.title}</h3>
          <p class="card-text">${item.text}</p>
          <ul class="card-meta-list">
            <li class="card-meta-item">
              <div class="meta-box">
                <ion-icon name="time"></ion-icon>
                <p>${item.duration}</p>
              </div>
            </li>
            <li class="card-meta-item">
              <div class="meta-box">
                <ion-icon name="people"></ion-icon>
                <p>pax: ${item.pax}</p>
              </div>
            </li>
            <li class="card-meta-item">
              <div class="meta-box">
                <ion-icon name="location"></ion-icon>
                <p>${item.location}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="card-price">
          <div class="wrapper">
            <p class="reviews">(${item.reviews} reviews)</p>
            <div class="card-rating">
              ${'<ion-icon name="star"></ion-icon>'.repeat(item.rating)}
            </div>
          </div>
          <p class="price">${item.price}<span>/ per person</span></p>
          <a href="#package" class="btn btn-primary">Book Now</a>
        </div>
      </div>
    </li>
  `).join('');
}

// Gallery
async function loadGallery() {
  const data = await loadJSON('gallery.json');
  const galleryList = document.getElementById('gallery-list');
  galleryList.innerHTML = data.map((item, index) => `
    <li class="gallery-item">
      <figure class="gallery-image">
        <img src="${item.image}" alt="${item.alt}" loading="lazy">
      </figure>
    </li>
  `).join('');
}

// Newsletter Signup
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('input[name="email"]').value;
  if (email) {
    alert('Thank you for subscribing to Dreamwingz Holiday!');
    this.reset();
  }
});

// Initialize
loadPopularDestinations();
loadPackages();
loadGallery();