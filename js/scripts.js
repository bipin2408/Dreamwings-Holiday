'use strict';

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.popular-card, .package-card').forEach(card => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
    },
  });
});

// Mobile Nav Toggle
const navToggle = document.querySelector('#nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
navToggle?.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Theme Toggle
const themeToggle = document.querySelector('#theme-toggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load Theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Go to Top
const goTop = document.querySelector('.go-top');
window.addEventListener('scroll', () => {
  goTop.classList.toggle('active', window.scrollY >= 200);
});

// Inquiry Form Toggle
const inquiryToggle = document.querySelector('#inquiry-toggle');
const inquiryForm = document.querySelector('#inquiry-form');
inquiryToggle?.addEventListener('click', () => {
  inquiryForm.classList.toggle('hidden');
});

// Newsletter Modal
const newsletterToggle = document.querySelector('#newsletter-toggle');
const newsletterModal = document.querySelector('#newsletter-modal');
const newsletterClose = document.querySelector('#newsletter-close');
newsletterToggle?.addEventListener('click', () => {
  newsletterModal.classList.remove('hidden');
});
newsletterClose?.addEventListener('click', () => {
  newsletterModal.classList.add('hidden');
});

// Newsletter Form Validation
const newsletterForm = document.querySelector('#newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]').value;
  if (/^\S+@\S+\.\S+$/.test(email)) {
    alert('Thank you for subscribing!');
    newsletterForm.reset();
    newsletterModal.classList.add('hidden');
  } else {
    alert('Please enter a valid email address.');
  }
});

// Load Popular Destinations
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/popular.json')
    .then(response => response.json())
    .then(data => {
      const popularList = document.querySelector('.popular-list');
      popularList.innerHTML = '';
      data.forEach((dest, index) => {
        const item = document.createElement('li');
        item.classList.add('popular-card', 'bg-white', 'dark:bg-gray-700', 'rounded-lg', 'shadow-lg', 'overflow-hidden');
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', index * 100);
        item.innerHTML = `
          <div class="card-img">
            <img src="${dest.image}" alt="${dest.title}" class="w-full h-48 object-cover" loading="lazy" onerror="this.src='images/img8.jpg'">
          </div>
          <div class="p-6">
            <div class="card-rating mb-2">
              ${'<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(dest.rating)}
              ${'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"/></svg>'.repeat(5 - dest.rating)}
            </div>
            <p class="text-blue-600 dark:text-blue-400 text-sm uppercase mb-2">${dest.subtitle}</p>
            <h3 class="text-xl font-poppins font-semibold text-gray-800 dark:text-gray-100 mb-2">${dest.title}</h3>
            <p class="text-gray-600 dark:text-gray-300">${dest.text}</p>
          </div>
        `;
        popularList.appendChild(item);
      });
    })
    .catch(error => console.error('Error loading popular destinations:', error));
});

// Load Packages
let allPackages = [];
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/packages.json')
    .then(response => response.json())
    .then(data => {
      allPackages = data;
      renderPackages(data);
    })
    .catch(error => console.error('Error loading packages:', error));
});

// Package Filter
const packageFilter = document.querySelector('#package-filter');
packageFilter?.addEventListener('change', (e) => {
  const value = e.target.value;
  const filteredPackages = value === 'all' ? allPackages : allPackages.filter(pkg => pkg.location === value);
  renderPackages(filteredPackages);
});

function renderPackages(packages) {
  const packageList = document.querySelector('.package-list');
  packageList.innerHTML = '';
  packages.forEach((pkg, index) => {
    const item = document.createElement('li');
    item.classList.add('package-card', 'bg-white', 'dark:bg-gray-700', 'rounded-lg', 'shadow-lg', 'overflow-hidden');
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', index * 100);
    item.innerHTML = `
      <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-48 object-cover" loading="lazy" onerror="this.src='images/img8.jpg'">
      <div class="p-6">
        <h3 class="text-xl font-poppins font-semibold text-gray-800 dark:text-gray-100 mb-2">${pkg.title}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">${pkg.description}</p>
        <ul class="flex flex-wrap gap-2 mb-4 bg-gray-100 dark:bg-gray-600 p-2 rounded-lg">
          <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ${pkg.duration}
          </li>
          <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Pax: ${pkg.pax}
          </li>
          <li class="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ${pkg.location}
          </li>
        </ul>
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-600 dark:text-gray-300">(${pkg.reviews} reviews)</p>
          <div class="card-rating">
            ${'<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(pkg.rating)}
            ${'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"/></svg>'.repeat(5 - pkg.rating)}
          </div>
        </div>
        <p class="text-xl font-poppins font-semibold text-gray-800 dark:text-gray-100">${pkg.price} <span class="text-sm">/ per person</span></p>
        <button class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Book Now</button>
      </div>
    `;
    packageList.appendChild(item);
  });
}

// Load Gallery
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/gallery.json')
    .then(response => response.json())
    .then(data => {
      const galleryList = document.querySelector('.gallery-list');
      galleryList.innerHTML = '';
      data.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('swiper-slide');
        galleryItem.innerHTML = `
          <img src="${item.image}" alt="${item.alt}" class="w-full h-64 object-cover rounded-lg" loading="lazy" onerror="this.src='images/img8.jpg'">
        `;
        galleryList.appendChild(galleryItem);
      });
      new Swiper('.gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    })
    .catch(error => console.error('Error loading gallery:', error));
});