const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("animate");
    }
  });
});
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 20;
    const rotateY = (x / rect.width - 0.5) * -20;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0) scale(1)";
  });
});
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.5,
    dy: Math.random() * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x > canvas.width) p.x = 0;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(r => {
    const top = r.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      r.classList.add("active");
    }
  });
});
const hoverSound = document.getElementById("hoverSound");

document.querySelectorAll("a, .btn, .card").forEach(element => {
  element.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});
const form = document.getElementById("contactForm");
const sendBtn = document.querySelector(".sendBtn");
const successMessage = document.querySelector(".successMessage");
const sendSound = document.getElementById("sendSound");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  sendBtn.classList.add("loading");

  const formData = new FormData(form);

  fetch("https://formsubmit.co/ajax/ahmadolanrewaju01@gmail.com", {
    method: "POST",
    headers: { 'Accept': 'application/json' },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    sendBtn.classList.remove("loading");
    successMessage.classList.add("show");
    sendSound.play();
    form.reset();
  })
  .catch(error => {
    sendBtn.classList.remove("loading");
    alert("Something went wrong!");
  });
});