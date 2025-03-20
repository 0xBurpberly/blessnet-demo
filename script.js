document.addEventListener('DOMContentLoaded', function() {
    // Add light transition effect to body
    document.body.classList.add('light-transition');
    
    // Create cursor light effect
    const cursorLight = document.createElement('div');
    cursorLight.classList.add('cursor-light');
    document.body.appendChild(cursorLight);
    
    // Track mouse movement for light effect
    document.addEventListener('mousemove', function(e) {
        cursorLight.style.opacity = '1';
        cursorLight.style.left = e.clientX + 'px';
        cursorLight.style.top = e.clientY + 'px';
        
        // Timeout to fade the cursor light when not moving
        clearTimeout(window.cursorTimeout);
        window.cursorTimeout = setTimeout(() => {
            cursorLight.style.opacity = '0';
        }, 2000);
    });
    
    // Create floating particles
    createParticles();
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('section, .quote, .cta, h2, h3');
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Check which elements are in viewport on load and scroll
    checkReveal();
    window.addEventListener('scroll', checkReveal);
    
    // Logo dots subtle animation
    animateLogoDots();
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        particlesContainer.appendChild(particle);
        
        // Animate particle
        animateParticle(particle);
    }
}

// Animate individual particles
function animateParticle(particle) {
    // Create keyframes for smooth random movement
    const keyframes = [];
    const steps = 5;
    
    for (let i = 0; i <= steps; i++) {
        keyframes.push({
            left: Math.random() * 100 + 'vw',
            top: Math.random() * 100 + 'vh',
            opacity: Math.random() * 0.2
        });
    }
    
    // Duration between 20-40 seconds
    const duration = Math.random() * 20000 + 20000;
    
    // Apply animation
    const animation = particle.animate(keyframes, {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
    
    // Start each particle at a random point in its animation
    animation.currentTime = Math.random() * duration;
}

// Check which elements should be revealed based on scroll position
function checkReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // How many pixels from the bottom of the viewport to start showing the element
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Subtle animation for logo dots
function animateLogoDots() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        // Different timing for each dot
        const delay = index * 1500;
        
        // Subtle pulse animation every few seconds
        setInterval(() => {
            dot.style.transform = 'scale(1.3)';
            dot.style.opacity = '0.7';
            
            setTimeout(() => {
                dot.style.transform = '';
                dot.style.opacity = '';
            }, 600);
        }, 6000 + delay);
    });
}

// Add subtle letter animation to headings
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('h2, h3');
    
    headings.forEach(heading => {
        // Store the original text content
        const originalText = heading.textContent;
        
        heading.addEventListener('mouseover', function() {
            animateHeadingLetters(heading, originalText);
        });
    });
});

// Animate letters in headings on hover
function animateHeadingLetters(element, text) {
    // No animation already in progress
    if (element.getAttribute('data-animating') === 'true') return;
    element.setAttribute('data-animating', 'true');
    
    // Split text into array of characters
    const chars = text.split('');
    
    // Clear current text
    const originalHtml = element.innerHTML;
    
    // Animate each letter with a small delay
    let html = '';
    chars.forEach((char, index) => {
        if (char === ' ') {
            html += ' ';
        } else {
            html += `<span style="display: inline-block; animation: letterWiggle 0.5s ${index * 50}ms;">${char}</span>`;
        }
    });
    
    element.innerHTML = html;
    
    // Add animation style if not already added
    if (!document.getElementById('letterWiggleStyle')) {
        const style = document.createElement('style');
        style.id = 'letterWiggleStyle';
        style.textContent = `
            @keyframes letterWiggle {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-3px); }
                75% { transform: translateY(2px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Reset after animation completes
    setTimeout(() => {
        element.innerHTML = originalHtml;
        element.setAttribute('data-animating', 'false');
    }, chars.length * 50 + 500);
}
