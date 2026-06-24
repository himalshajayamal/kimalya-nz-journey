// ===== DEVICE DETECTION =====
function getDeviceType() {
    const detector = document.getElementById('device-detector');
    if (!detector) return 'desktop';
    const zIndex = parseInt(window.getComputedStyle(detector).zIndex, 10);
    return zIndex === 2 ? 'mobile' : 'desktop';
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ===== CONFETTI SYSTEM (moved before gate functions) =====
const confettiCanvas = document.getElementById('confetti');
const cCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
if (confettiCanvas) resizeConfettiCanvas();

let confettiPieces = [];
const confettiColors = ['#e11d48', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];

class ConfettiPiece {
    constructor(x, y) {
        this.x = x || Math.random() * (confettiCanvas ? confettiCanvas.width : window.innerWidth);
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
        if (!cCtx) return;
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
    if (!cCtx || !confettiCanvas) return;
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces = confettiPieces.filter(p => p.opacity > 0 && p.y < (confettiCanvas ? confettiCanvas.height : window.innerHeight) + 50);
    confettiPieces.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateConfetti);
}
animateConfetti();

function launchCelebration() {
    const cx = confettiCanvas ? confettiCanvas.width / 2 : window.innerWidth / 2;
    const cy = confettiCanvas ? confettiCanvas.height / 2 : window.innerHeight / 2;

    for (let i = 0; i < 100; i++) {
        const piece = new ConfettiPiece(cx, cy);
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

// ===== PARTICLE SYSTEM =====
const particleCanvas = document.getElementById('particles');
const pCtx = particleCanvas ? particleCanvas.getContext('2d') : null;

function resizeParticleCanvas() {
    if (!particleCanvas) return;
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
        this.x = Math.random() * (particleCanvas ? particleCanvas.width : window.innerWidth);
        this.y = Math.random() * (particleCanvas ? particleCanvas.height : window.innerHeight);
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

        const w = particleCanvas ? particleCanvas.width : window.innerWidth;
        const h = particleCanvas ? particleCanvas.height : window.innerHeight;
        if (this.x < -50 || this.x > w + 50) this.speedX *= -1;
        if (this.y < -50 || this.y > h + 50) this.speedY *= -1;
    }

    draw() {
        if (!pCtx) return;
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
    if (!pCtx || !particleCanvas) return;
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

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

    // Show response overlay on TOP of gate (gate stays visible underneath)
    const responseOverlay = document.getElementById('gate-response');
    responseOverlay.style.display = 'flex';
    // Force reflow for transition
    void responseOverlay.offsetWidth;
    responseOverlay.classList.add('show');

    // Small confetti burst from center (safe now that confetti is initialized)
    const cx = confettiCanvas ? confettiCanvas.width / 2 : window.innerWidth / 2;
    const cy = confettiCanvas ? confettiCanvas.height / 2 : window.innerHeight / 2;
    for (let i = 0; i < 30; i++) {
        confettiPieces.push(new ConfettiPiece(cx, cy));
    }
}

function enterSite() {
    const gate = document.getElementById('gate');
    const responseOverlay = document.getElementById('gate-response');

    // Hide response first
    responseOverlay.classList.remove('show');

    // Then hide gate with transition
    setTimeout(() => {
        gate.classList.add('hidden');
        responseOverlay.style.display = 'none';
        document.getElementById('navbar').classList.add('visible');

        // Big confetti celebration
        launchCelebration();
    }, 300);
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
    if (e.target.closest('button') || e.target.closest('.msg-card') || e.target.closest('.carousel-card') || e.target.closest('.gate-btn') || e.target.closest('.video-play-btn') || e.target.closest('.video-wrapper')) return;

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

// ===== FAMILY VIDEO CONTROLS =====
let familyVideo = null;
let videoOverlay = null;
let isVideoPlaying = false;

function initFamilyVideo() {
    familyVideo = document.getElementById('family-video');
    videoOverlay = document.querySelector('.video-overlay');

    if (!familyVideo) return;

    // Ensure muted autoplay works
    familyVideo.muted = true;
    familyVideo.play().catch(err => {
        console.log('Autoplay prevented, waiting for interaction');
    });

    // On mobile, show overlay until user interacts
    if (isTouchDevice()) {
        familyVideo.addEventListener('play', () => {
            isVideoPlaying = true;
        });
    } else {
        // Desktop: hide overlay once playing
        familyVideo.addEventListener('play', () => {
            if (videoOverlay) videoOverlay.classList.add('hidden');
            isVideoPlaying = true;
        });
    }

    familyVideo.addEventListener('pause', () => {
        isVideoPlaying = false;
        if (videoOverlay) videoOverlay.classList.remove('hidden');
    });

    familyVideo.addEventListener('ended', () => {
        isVideoPlaying = false;
        if (videoOverlay) videoOverlay.classList.remove('hidden');
    });
}

function toggleFamilyVideo() {
    if (!familyVideo) {
        familyVideo = document.getElementById('family-video');
        videoOverlay = document.querySelector('.video-overlay');
    }

    if (!familyVideo) return;

    if (familyVideo.paused) {
        familyVideo.muted = false;
        familyVideo.play().then(() => {
            if (videoOverlay) videoOverlay.classList.add('hidden');
            isVideoPlaying = true;
        }).catch(err => {
            console.log('Playback failed:', err);
            // Fallback: try muted
            familyVideo.muted = true;
            familyVideo.play();
        });
    } else {
        familyVideo.pause();
        if (videoOverlay) videoOverlay.classList.remove('hidden');
        isVideoPlaying = false;
    }

    updatePlayButton();
}

function updatePlayButton() {
    const btn = document.getElementById('play-icon');
    if (!btn || !familyVideo) return;
    btn.textContent = familyVideo.paused ? '▶' : '⏸';
}

// Initialize video when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFamilyVideo);
} else {
    initFamilyVideo();
}