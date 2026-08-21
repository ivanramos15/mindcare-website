const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot");
const nav = document.querySelector(".site-nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        const id = entry.target.id;
        dots.forEach((dot) => {
          dot.classList.toggle("active", dot.dataset.target === id);
        });
      }
    });
  },
  { threshold: 0, rootMargin: "-15% 0px -15% 0px" }
);

sections.forEach((section) => observer.observe(section));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  },
  { threshold: 0.05 }
);

navObserver.observe(sections[0]);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = document.getElementById(dot.dataset.target);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    faqItems.forEach((other) => {
      other.classList.remove("open");
      other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});
