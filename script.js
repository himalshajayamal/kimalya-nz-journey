// ===== GATE LOGIC =====
const gateResponses = {
    yes: {
        emoji: '🚀',
        title: 'The Future is Beginning Now!',
        text: 'Buckle up, Kimalya! Your adventure to New Zealand starts here. Great things await!'
    },
    no: {
        emoji: '😤',
        title: 'Too Bad, We\'re Doing This Anyway!',
        text: 'Nice try, but the visa is approved, the scholarship is secured, and Hamilton is calling! No backing out now! 😂'
    },
    maybe: {
        emoji: '🤨',
        title: 'Maybe? MAYBE?!',
        text: 'After all that hard work, PTE prep, and a $15,000 scholarship — you\'re "maybe" ready? Come on, you were born ready! Let\'s go! 💪'
    }
};

function openGate(choice) {
    const response = gateResponses[choice];
    document.getElementById('response-emoji').textContent = response.emoji;
    document.getElementById('response-title').textContent = response.title;
    document.getElementById('response-text').textContent = response.text;
    
    document.getElementById('gate-response').classList.add('show');
    
    // Small confetti burst
    for (let i = 0; i < 30; i++) {
        confettiPieces.push(new ConfettiPiece(confettiCanvas.width / 2, confettiCanvas.height / 2));
    }
}

function enterSite() {
    document.getElementById('gate').classList.add('hidden');
    document.getElementById('gate-response').classList.remove('show');
    document.getElementById('navbar').classList.add('visible');
    
    // Big confetti celebration
    launchCelebration();
}

// ===== PARTICLE SYSTEM =====
const particleCanvas = document.getElementById('particles');
const pCtx = particleCanvas.getContext('2d');

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();

const particles = [];
const particleColors = ['#fecaca', '#fde68a', '#bbf7d0', '#ddd6fe', '#fcd34d', '#fda4af'];

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;
        
        if (this.x < -50 || this.x > particleCanvas.width + 50) this.speedX *= -1;
        if (this.y < -50 || this.y > particleCanvas.height + 50) this.speedY *= -1;
    }
    
    draw() {
        const pulseSize = this.size + Math.sin(this.pulse) * 2;
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, Math.max(0, pulseSize), 0, Math.PI * 2);
        pCtx.fillStyle = this.color;
        pCtx.globalAlpha = this.opacity;
        pCtx.fill();
    }
}

for (let i = 0; i < 50; i++) particles.push(new Particle());

function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== CONFETTI SYSTEM =====
const confettiCanvas = document.getElementById('confetti');
const cCtx = confettiCanvas.getContext('2d');

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfettiCanvas();

let confettiPieces = [];
const confettiColors = ['#e11d48', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];

class ConfettiPiece {
    constructor(x, y) {
        this.x = x || Math.random() * confettiCanvas.width;
        this.y = y || -20;
        this.size = Math.random() * 10 + 5;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.opacity = 1;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.speedY += 0.1;
        this.opacity -= 0.003;
    }
    
    draw() {
        cCtx.save();
        cCtx.translate(this.x, this.y);
        cCtx.rotate((this.rotation * Math.PI) / 180);
        cCtx.globalAlpha = Math.max(0, this.opacity);
        cCtx.fillStyle = this.color;
        
        if (Math.random() > 0.5) {
            cCtx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        } else {
            cCtx.beginPath();
            cCtx.arc(0, 0, this.size/2, 0, Math.PI * 2);
            cCtx.fill();
        }
        
        cCtx.restore();
    }
}

function animateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces = confettiPieces.filter(p => p.opacity > 0 && p.y < confettiCanvas.height + 50);
    confettiPieces.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateConfetti);
}
animateConfetti();

function launchCelebration() {
    for (let i = 0; i < 100; i++) {
        const piece = new ConfettiPiece(confettiCanvas.width / 2, confettiCanvas.height / 2);
        piece.speedY = (Math.random() - 0.5) * 20;
        piece.speedX = (Math.random() - 0.5) * 20;
        confettiPieces.push(piece);
    }
    
    let count = 0;
    const rainInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            confettiPieces.push(new ConfettiPiece());
        }
        count++;
        if (count > 40) clearInterval(rainInterval);
    }, 50);
    
    const btn = document.querySelector('.celebrate-btn');
    if (btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 150);
    }
}

// ===== 3D CAROUSEL =====
let currentAngle = 0;
const totalCards = 5;
const angleStep = 360 / totalCards;

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.carousel-card');
    cards.forEach((card, i) => {
        const angle = currentAngle + (i * angleStep);
        const rad = (angle * Math.PI) / 180;
        const x = Math.sin(rad) * 320;
        const z = Math.cos(rad) * 320 - 320;
        const rotateY = -angle;
        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`;
        card.style.opacity = z > -150 ? 1 : 0.3;
        card.style.zIndex = Math.round(z + 320);
    });
}

function nextSlide() {
    currentAngle -= angleStep;
    updateCarousel();
}

function prevSlide() {
    currentAngle += angleStep;
    updateCarousel();
}

function rotateCarousel(index) {
    currentAngle = -index * angleStep;
    updateCarousel();
}

updateCarousel();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== FLIP CARDS =====
function flipCard(card) {
    card.classList.toggle('flipped');
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== WINDOW RESIZE =====
window.addEventListener('resize', () => {
    resizeParticleCanvas();
    resizeConfettiCanvas();
});

// ===== MUSIC NOTES ON CLICK =====
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.msg-card') || e.target.closest('.carousel-card') || e.target.closest('.gate-btn')) return;
    
    const notes = ['♪', '♫', '♬', '♩', '✨', '⭐'];
    const note = document.createElement('div');
    note.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 1.5rem;
        color: ${['#e11d48', '#f59e0b', '#22c55e', '#3b82f6'][Math.floor(Math.random()*4)]};
        pointer-events: none;
        z-index: 10001;
        animation: floatNote 3s ease-out forwards;
    `;
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    document.body.appendChild(note);
    
    setTimeout(() => note.remove(), 3000);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes floatNote {
        0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        100% { opacity: 0; transform: translateY(-150px) rotate(360deg) scale(0.5); }
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== HERO PARALLAX =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});