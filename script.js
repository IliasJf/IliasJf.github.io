document.getElementById("year").textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const targets = document.querySelectorAll(".section, .contact, .project");
targets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

targets.forEach((el) => observer.observe(el));
