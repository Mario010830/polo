let isExterior = true;
const flayer = document.querySelector('.flayer');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
let startX = 0;
let isDragging = false;

// Crear los dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Eventos táctiles
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
        isDragging = false;
    }
});

slider.addEventListener('touchend', () => {
    isDragging = false;
});

// Botones de navegación
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
    }
});

function toggleView() {
    const panels = document.querySelectorAll('.panel img');
    isExterior = !isExterior;
    
    panels.forEach(panel => {
        panel.src = isExterior ? 'Cara exterior.png' : 'Cara interior.png';
    });
} 