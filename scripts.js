import { techStack } from "./tech-stack.js"

/* ====================
   TYPEWRITER EFFECT
==================== */

const text = `I'm a passionate front-end developer who enjoys turning ideas into clean, creative websites and web apps. I started with JavaScript and have grown into building responsive interfaces with modern tools. I love learning new things, solving problems, and working with others to bring great ideas to life.`;
const target = document.getElementById('typewriter');
let index = 0;
function typeWriter() {
    if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 30);
    }
}
typeWriter();

/* ====================
   REVEAL ELEMENTS ON SCROLL
==================== */

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('reveal');
    }
});
}, { threshold: 0.2 });
document.querySelectorAll('.icon-wrap').forEach(el => observer.observe(el));

const projectCards = document.querySelectorAll(".reveal-on-scroll");

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

projectCards.forEach(card => projectObserver.observe(card));

/* ====================
   SHOW TECH NAME ON HOVER
==================== */

const allWraps = document.querySelectorAll(".icon-wrap");
const techNameDisplay = document.querySelector(".tech-name-display");
allWraps.forEach(wrap => {
    wrap.addEventListener("mouseover", () => {
        const icon = wrap.querySelector(".icon");
        techNameDisplay.style.color = "rgba(16, 0, 16, 0.75)";
        techNameDisplay.style.backgroundColor = "rgba(16, 0, 16, 0.05)";
        techNameDisplay.style.opacity = "1";
        techNameDisplay.textContent = icon.alt;

    });
    wrap.addEventListener("mouseout", () => {
        techNameDisplay.style.color = "rgba(16, 0, 16, 0.75)";
        techNameDisplay.style.opacity = "0.75";
        
    });
})

/* ====================
   ABOUT SECTION SLIDE-IN
==================== */

const aboutCards = document.querySelectorAll(
  ".personal-info-container, .fun-facts-container, .tech-journey-container"
);

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("slide-in");
          }, index * 600);
        });
        aboutObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

aboutObserver.observe(document.querySelector(".about-container"));

/* ====================
   TECH STACK HOVER INFO
==================== */

const icons = document.querySelectorAll(".icon");
const techDescription = document.getElementById("tech-description");
const techPercentage = document.querySelector(".tech-percentage");

icons.forEach(icon => {
  icon.addEventListener("mouseover", () => {
    for (let i = 0; i < techStack.length; i++) {

      // Update description
      if (techStack[i].name === icon.alt) {
        techDescription.textContent = techStack[i].description;
        document.querySelector(".tech-percentage-description").style.opacity = "1";

        // Update percentage
        techPercentage.textContent = `${techStack[i].level}%`;

        // Update color of percentage
        if (techStack[i].level === 25) {
          techPercentage.style.backgroundColor = "rgb(252, 165, 165)";
        } else if (techStack[i].level === 50) {
          techPercentage.style.backgroundColor = "rgb(252, 211, 77)";
        } else if (techStack[i].level === 75) {
          techPercentage.style.backgroundColor = "rgb(110, 231, 183)";
        } else {
          techPercentage.style.backgroundColor = "rgb(74, 222, 128)";
        }

        break;
      }
    }
  })
  icon.addEventListener("mouseout", () => {
    document.querySelector(".tech-percentage-description").style.opacity = "0.75";
  })
})

/* ====================
   CONTACT FORM SUBMISSION
==================== */

const form = document.querySelector('.form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  if (res.ok) {
    form.innerHTML = '<p>Thanks! Your message has been sent.</p>';
  } else {
    form.insertAdjacentHTML('beforeend', '<p>Oops! There was an error.</p>');
  }
});
