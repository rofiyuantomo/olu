/* ============================================
   OLU — Pro Player Profile Website JS
   ============================================ */

// Particle Animation Background
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 120;
    let mouseX = -999;
    let mouseY = -999;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
                const force = (mouseRadius - dist) / mouseRadius;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Typewriter Effect (only on homepage)
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const roles = ['Pro Player', 'Streamer', 'Caster', 'IGL', 'Commander Halal'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typewrite() {
        const current = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typewrite, speed);
    }

    typewrite();
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Active nav link on scroll (only for pages with sections)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length > 1) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.remove('active');
                    if (href === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
        navLinksEl.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinksEl.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close mobile nav on link click
    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksEl.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Scroll reveal
const revealElements = document.querySelectorAll(
    '.achievement-card, .role-card, .social-card, .about-photo-card, .about-right, .weapon-card'
);

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Skill bars animation
const skillsOverlay = document.querySelector('.skills-overlay');
if (skillsOverlay) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillObserver.observe(skillsOverlay);
}

// Smooth scroll for same-page anchor links only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
