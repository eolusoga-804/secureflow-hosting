/* ==========================================================
   SECUREFLOW
   JAVASCRIPT
   Theme Toggle
   Mobile Menu
   FAQ Accordion
   Pricing Toggle
   Scroll Progress
   Jump To Top
   Pointer Glow
   Navbar Effects
========================================================== */

"use strict";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const closeMenu = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const mobileBackdrop = document.getElementById("mobileMenuBackdrop");

const scrollTopButton = document.getElementById("scrollTop");

const pricingButtons = document.querySelectorAll("[data-pricing]");

const faqItems = document.querySelectorAll(".faq-item");

const mobileLinks = document.querySelectorAll(".mobile-menu__link");

const navbar = document.querySelector(".navbar");

const yearlyPrices = document.querySelectorAll(".price--yearly");

const monthlyPrices = document.querySelectorAll(".price--monthly");

const progressCircle = document.querySelector(".scroll-top__indicator");

/* ==========================================================
   THEME TOGGLE
========================================================== */

const THEME_KEY = "secureflow-theme";

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);

  const icon = themeToggle?.querySelector("i");

  if (!icon) return;

  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme) {
    applyTheme(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(prefersDark ? "dark" : "light");
}

themeToggle?.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  localStorage.setItem(THEME_KEY, nextTheme);
});

/* ==========================================================
   MOBILE MENU
========================================================== */

function openMobileMenu() {
  mobileMenu?.classList.add("mobile-menu--active");

  mobileBackdrop?.classList.add("mobile-menu-backdrop--active");

  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mobileMenu?.classList.remove("mobile-menu--active");

  mobileBackdrop?.classList.remove("mobile-menu-backdrop--active");

  document.body.style.overflow = "";
}

menuToggle?.addEventListener("click", openMobileMenu);

closeMenu?.addEventListener("click", closeMobileMenu);

mobileBackdrop?.addEventListener("click", closeMobileMenu);

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* ==========================================================
   FAQ ACCORDION
========================================================== */

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-item__question");

  const answer = item.querySelector(".faq-item__answer");

  button?.addEventListener("click", () => {
    const isActive = item.classList.contains("faq-item--active");

    faqItems.forEach((faq) => {
      faq.classList.remove("faq-item--active");

      const content = faq.querySelector(".faq-item__answer");

      if (content) {
        content.style.maxHeight = null;
      }
    });

    if (!isActive) {
      item.classList.add("faq-item--active");

      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

/* ==========================================================
   PRICING TOGGLE
========================================================== */

function setPricing(mode) {
  pricingButtons.forEach((button) => {
    button.classList.remove("pricing-toggle__button--active");

    if (button.dataset.pricing === mode) {
      button.classList.add("pricing-toggle__button--active");
    }
  });

  if (mode === "yearly") {
    yearlyPrices.forEach((price) => {
      price.style.display = "block";
    });

    monthlyPrices.forEach((price) => {
      price.style.display = "none";
    });
  } else {
    yearlyPrices.forEach((price) => {
      price.style.display = "none";
    });

    monthlyPrices.forEach((price) => {
      price.style.display = "block";
    });
  }
}

pricingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPricing(button.dataset.pricing);
  });
});

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

const CIRCLE_LENGTH = 283;

if (progressCircle) {
  progressCircle.style.strokeDasharray = CIRCLE_LENGTH;

  progressCircle.style.strokeDashoffset = CIRCLE_LENGTH;
}

function updateScrollProgress() {
  const scrollTop = window.pageYOffset;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;

  const dashOffset = CIRCLE_LENGTH - progress * CIRCLE_LENGTH;

  if (progressCircle) {
    progressCircle.style.strokeDashoffset = dashOffset;
  }

  if (scrollTop > 300) {
    scrollTopButton?.classList.add("scroll-top--visible");
  } else {
    scrollTopButton?.classList.remove("scroll-top--visible");
  }
}

/* ==========================================================
   JUMP TO TOP
========================================================== */

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */

function updateNavbarState() {
  const scrollY = window.scrollY;

  if (!navbar) return;

  if (scrollY > 40) {
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.boxShadow = "none";
  }
}

/* ==========================================================
   POINTER GLOW
========================================================== */

function updatePointerGlow(event) {
  document.body.style.setProperty("--mouse-x", `${event.clientX}px`);

  document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
}

window.addEventListener("pointermove", updatePointerGlow, {
  passive: true,
});

/* ==========================================================
   INTERSECTION OBSERVER
========================================================== */

const observerOptions = {
  threshold: 0.15,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");

      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const revealElements = document.querySelectorAll(
  ".feature-card, .pricing-card, .floating-panel, .glass-card, .faq-item, .hero__stat",
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ==========================================================
   SMOOTH ANCHOR LINKS
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const href = this.getAttribute("href");

    if (href === "#" || href.length <= 1) {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();

    const navbarHeight = navbar?.offsetHeight || 0;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* ==========================================================
   ESC KEY CLOSES MENU
========================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

/* ==========================================================
   RESIZE SAFETY
========================================================== */

window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    closeMobileMenu();
  }
});

/* ==========================================================
   WINDOW SCROLL EVENTS
========================================================== */

window.addEventListener(
  "scroll",
  () => {
    updateScrollProgress();

    updateNavbarState();
  },
  {
    passive: true,
  },
);

/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  setPricing("monthly");

  updateScrollProgress();

  updateNavbarState();

  document.body.classList.add("app-loaded");
});
