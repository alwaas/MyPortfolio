// TYPED TEXT
var typed = new Typed('.typed', {
  strings: ["A Front-End Developer", "A UI/UX Designer", "A Problem Solver"],
  typeSpeed: 70,
  backSpeed: 50,
  loop: true
});

// FORM VALIDATION
function validateForm() {
  const email = document.getElementById("email").value;
  if (!email.includes("@")) {
    alert("Enter a valid email address!");
    return false;
  }
  alert("Message Sent Successfully!");
  return true;
}

// DARK MODE
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = 
    document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
};

// PROJECT FILTERING
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    let filter = btn.getAttribute("data-filter");

    projects.forEach(project => {
      project.style.display =
        filter === "all" || project.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});

// SCROLL REVEAL
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// BACK TO TOP BUTTON
const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 350 ? "block" : "none";
});

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
