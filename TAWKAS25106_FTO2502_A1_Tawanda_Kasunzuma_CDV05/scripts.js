// Typewriter

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

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('reveal');
    }
});
}, { threshold: 0.2 });

document.querySelectorAll('.icon-wrap').forEach(el => observer.observe(el));

// Magnetic hover
document.querySelectorAll('.icon-wrap').forEach(icon => {
icon.addEventListener('mousemove', e => {
    const rect = icon.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    icon.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.2)`;
});

icon.addEventListener('mouseleave', () => {
    icon.style.transform = '';
});
});

const allWraps = document.querySelectorAll(".icon-wrap");
const techNameDisplay = document.querySelector(".tech-name-display");

allWraps.forEach(wrap => {
    wrap.addEventListener("mouseover", () => {
        const icon = wrap.querySelector(".icon");
        techNameDisplay.style.color = "rgba(16, 0, 16, 0.625)";
        techNameDisplay.style.opacity = "1";
        techNameDisplay.textContent = icon.alt;

    });
    wrap.addEventListener("mouseout", () => {
        techNameDisplay.style.color = "rgba(128, 0, 128, 0.75)";
        techNameDisplay.style.opacity = "0.5";
        
    });
})

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
          }, index * 600); // staggered effect
        });
        aboutObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

// Watch one of the cards or a wrapper element (like about-container)
aboutObserver.observe(document.querySelector(".about-container"));
