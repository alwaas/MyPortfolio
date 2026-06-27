const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const loader = document.getElementById("loading");
const successMsg = document.getElementById("successMsg");

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
  localStorage.setItem("portfolio-theme", theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  });
}

if (typeof Typed !== "undefined") {
  new Typed(".typed", {
    strings: ["a Front-End Developer", "a UI/UX Designer", "a Problem Solver"],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
  });
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("active"));
  }
}

function initFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      projects.forEach((project) => {
        const matches = filter === "all" || project.dataset.category === filter;
        project.style.display = matches ? "flex" : "none";
      });
    });
  });
}

function toggleBackToTop() {
  if (backToTop) {
    backToTop.style.display = window.scrollY > 320 ? "block" : "none";
  }
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (loader) {
      loader.style.display = "block";
    }
    if (successMsg) {
      successMsg.style.display = "none";
    }

    const formData = new FormData(this);
    const name = formData.get("from_name")?.toString().trim() || "";
    const email = formData.get("from_email")?.toString().trim() || "";

    if (!name || !email.includes("@")) {
      if (loader) {
        loader.style.display = "none";
      }
      if (successMsg) {
        successMsg.textContent = "Please provide a valid name and email.";
        successMsg.style.display = "block";
      }
      return;
    }

    if (window.emailjs && typeof window.emailjs.sendForm === "function") {
      window.emailjs.init("HYkii9n-oDCPmXW6v");
      window.emailjs
        .sendForm("service_d6g670l", "template_f7rafcl", this)
        .then(() => {
          if (loader) {
            loader.style.display = "none";
          }
          if (successMsg) {
            successMsg.textContent = "Message sent successfully.";
            successMsg.style.display = "block";
          }
          this.reset();
          setTimeout(() => {
            if (successMsg) {
              successMsg.style.display = "none";
            }
          }, 4000);
        })
        .catch(() => {
          if (loader) {
            loader.style.display = "none";
          }
          if (successMsg) {
            successMsg.textContent = "The message could not be sent right now. Please email me directly.";
            successMsg.style.display = "block";
          }
        });
    } else {
      if (loader) {
        loader.style.display = "none";
      }
      if (successMsg) {
        successMsg.textContent = "The contact form is ready. Please email me directly for now.";
        successMsg.style.display = "block";
      }
    }
  });
}

window.addEventListener("scroll", toggleBackToTop);
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initReveal();
  initFilters();
  toggleBackToTop();
});

