'use strict';

/**
 * Navbar toggle
 */
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

/**
 * Header sticky & go to top
 */
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

/**
 * Dynamically load popular destinations from data/popular.json
 */
document.addEventListener("DOMContentLoaded", function () {
  const popularList = document.querySelector(".popular-list");

  fetch("../data/popular.json")
    .then(response => response.json())
    .then(data => {
      popularList.innerHTML = ""; // Clear existing content

      data.forEach((dest, index) => {
        const popularItem = document.createElement("li");
        popularItem.classList.add("popular-item");
        popularItem.style.animationDelay = `${index * 0.2}s`; // Staggered animation

        popularItem.innerHTML = `
          <div class="popular-card">
            <figure class="card-img">
              <img src="${dest.image}" alt="${dest.title}" loading="lazy">
            </figure>
            <div class="card-content">
              <div class="card-rating">
                ${'<ion-icon name="star"></ion-icon>'.repeat(dest.rating)}
                ${'<ion-icon name="star-outline"></ion-icon>'.repeat(5 - dest.rating)}
              </div>
              <p class="card-subtitle">
                <a href="#">${dest.subtitle}</a>
              </p>
              <h3 class="h3 card-title">
                <a href="#">${dest.title}</a>
              </h3>
              <p class="card-text">
                ${dest.text}
              </p>
            </div>
          </div>
        `;
        popularList.appendChild(popularItem);
      });
    })
    .catch(error => console.error("Error loading popular destinations:", error));
});

/**
 * Dynamically load packages from data/packages.json
 */
document.addEventListener("DOMContentLoaded", function () {
  const packageList = document.querySelector(".package-list");

  fetch("../data/packages.json")
    .then(response => response.json())
    .then(data => {
      packageList.innerHTML = ""; // Clear existing content

      data.forEach((pkg, index) => {
        const packageItem = document.createElement("li");
        packageItem.classList.add("package-item");
        packageItem.style.animationDelay = `${index * 0.2}s`; // Staggered animation

        packageItem.innerHTML = `
          <div class="package-card">
            <figure class="card-banner">
              <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
            </figure>
            <div class="card-content">
              <h3 class="h3 card-title">${pkg.title}</h3>
              <p class="card-text">${pkg.description}</p>
              <ul class="card-meta-list">
                <li class="card-meta-item">
                  <div class="meta-box">
                    <ion-icon name="time"></ion-icon>
                    <p class="text">${pkg.duration}</p>
                  </div>
                </li>
                <li class="card-meta-item">
                  <div class="meta-box">
                    <ion-icon name="people"></ion-icon>
                    <p class="text">pax: ${pkg.pax}</p>
                  </div>
                </li>
                <li class="card-meta-item">
                  <div class="meta-box">
                    <ion-icon name="location"></ion-icon>
                    <p class="text">${pkg.location}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="card-price">
              <div class="wrapper">
                <p class="reviews">(${pkg.reviews} reviews)</p>
                <div class="card-rating">
                  ${'<ion-icon name="star"></ion-icon>'.repeat(pkg.rating)}
                  ${'<ion-icon name="star-outline"></ion-icon>'.repeat(5 - pkg.rating)}
                </div>
              </div>
              <p class="price">${pkg.price}<span>/ per person</span></p>
              <button class="btn btn-secondary">Book Now</button>
            </div>
          </div>
        `;
        packageList.appendChild(packageItem);
      });
    })
    .catch(error => console.error("Error loading packages:", error));
});

/**
 * Dynamically load gallery images from data/gallery.json
 */
document.addEventListener("DOMContentLoaded", function () {
  const galleryList = document.querySelector(".gallery-list");

  fetch("../data/gallery.json")
    .then(response => response.json())
    .then(data => {
      galleryList.innerHTML = ""; // Clear existing content

      data.forEach((item, index) => {
        const galleryItem = document.createElement("li");
        galleryItem.classList.add("gallery-item");
        galleryItem.style.animationDelay = `${index * 0.2}s`; // Staggered animation

        galleryItem.innerHTML = `
          <figure class="gallery-image">
            <img src="${item.image}" alt="${item.alt}">
          </figure>
        `;
        galleryList.appendChild(galleryItem);
      });
    })
    .catch(error => console.error("Error loading gallery images:", error));
});