document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

const observerOptions = {
  threshold: 0,
  rootMargin: "-20px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.style.filter = "blur(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".project-card, .flip-card, .contact-card, .hero-content, .nav-item, .social-links a"
  );

  animatedElements.forEach((el, index) => {
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.filter = "blur(3px)";
      el.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      el.style.transitionDelay = `${index * 0.05}s`;
      observer.observe(el);
    }
  });
}

function typeWriter(element, text, speed = 100) {
  let charIndex = 0;
  element.innerHTML = "";

  function type() {
    if (charIndex < text.length) {
      element.innerHTML += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    } else {
      // Remove typewriter class and add final static text
      element.classList.remove("typewriter");
      element.classList.add("static-text");
      // Display full text without animation
      element.innerHTML = text;
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.getElementById("heroText");
  if (heroText) {
    heroText.classList.add("typewriter");
    typeWriter(heroText, "FULL STACK DEVELOPER", 100);
  }

  initializeScrollAnimations();

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
      card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    });
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.style.backgroundPositionY = scrolled * 0.5 + "px";
  }

  const scrollProgress =
    (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.documentElement.style.setProperty(
    "--scroll-progress",
    `${scrollProgress}%`
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all navbar links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Check if the link has a hash/anchor
      if (this.hash !== "") {
        e.preventDefault();

        // Get the target section
        const targetSection = document.querySelector(this.hash);

        // Get navbar height for offset
        const navHeight = document.querySelector(".navbar").offsetHeight;

        // Calculate position to scroll to (subtracting navbar height and adding some padding)
        const position = targetSection.offsetTop - navHeight - 20;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    });
  });
});

// Add this to your existing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Previous scroll code remains...

  // Highlight active section in navbar
  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Adjust offset as needed
      const sectionId = section.getAttribute("id");

      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add("active");
      } else {
        navLink?.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // Optional: Update active state on page load
  highlightNavLink();
});

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  let isVisible = false;

  // Show cursors only when mouse moves
  document.addEventListener("mousemove", function (e) {
    if (!isVisible) {
      cursor.style.opacity = "1";
      cursorDot.style.opacity = "1";
      isVisible = true;
    }

    // Update cursor positions
    requestAnimationFrame(() => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });
  });

  // Hide cursors when mouse leaves the window
  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0";
    cursorDot.style.opacity = "0";
    isVisible = false;
  });

  // Click animation
  document.addEventListener("mousedown", function () {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
  });

  document.addEventListener("mouseup", function () {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });

  // Add hover effect for all clickable elements
  const clickables = document.querySelectorAll(
    "a, button, .nav-link, .project-card, .skill-card"
  );
  clickables.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.borderWidth = "1px";
      cursor.style.backgroundColor = "rgba(52, 152, 219, 0.1)";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.borderWidth = "2px";
      cursor.style.backgroundColor = "transparent";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    });
  });
});
