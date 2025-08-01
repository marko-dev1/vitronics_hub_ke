document.addEventListener('DOMContentLoaded', function() {
    // Carousel elements
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Carousel state
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // Initialize carousel
    function initCarousel() {
        // Set initial position
        updateCarousel();
        
        // Start auto-rotation
        startCarousel();
        
        // Add event listeners
        setupCarouselControls();
    }
    
    // Start auto-rotation
    function startCarousel() {
        // Clear existing interval if any
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set new interval
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        }, 8000);
    }
    
    // Setup controls
    function setupCarouselControls() {
        // Previous button
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateCarousel();
            startCarousel(); // Reset timer on manual interaction
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
            startCarousel(); // Reset timer on manual interaction
        });
        
        // Indicators
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                currentSlide = parseInt(this.getAttribute('data-slide'));
                updateCarousel();
                startCarousel(); // Reset timer on manual interaction
            });
        });
    }
    
    // Update carousel position and indicators
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Initialize the carousel
    initCarousel();
});