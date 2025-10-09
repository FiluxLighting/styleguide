/**
 * FILUX - Slider de Productos Recomendados
 * Funcionalidad responsive para navegación de productos con controles táctiles
 * 
 * @version 1.0.0
 * @author FILUX Lighting Team
 */

class RecommendedProductsSlider {
    constructor(sliderId = 'recommended-slider') {
        this.slider = document.getElementById(sliderId);
        this.track = document.getElementById('products-track');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        
        if (this.slider && this.track && this.prevBtn && this.nextBtn) {
            this.init();
        }
    }

    init() {
        this.currentIndex = 0;
        this.cards = this.track.children;
        this.totalCards = this.cards.length;
        this.cardsPerView = 5;
        
        this.setupEventListeners();
        this.updateCardsPerView();
        this.updateSliderPosition();
    }

    /**
     * Actualizar número de tarjetas visibles según el ancho de pantalla
     */
    updateCardsPerView() {
        if (window.innerWidth <= 480) {
            this.cardsPerView = 1;
        } else if (window.innerWidth <= 768) {
            this.cardsPerView = 2;
        } else if (window.innerWidth <= 1200) {
            this.cardsPerView = 4;
        } else {
            this.cardsPerView = 5;
        }
    }

    /**
     * Actualizar la posición del slider basada en el índice actual
     */
    updateSliderPosition() {
        const cardWidth = 100 / this.cardsPerView;
        const translateX = -(this.currentIndex * cardWidth);
        this.track.style.transform = `translateX(${translateX}%)`;
    }

    /**
     * Navegar al slide anterior
     */
    previousSlide() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateSliderPosition();
    }

    /**
     * Navegar al siguiente slide
     */
    nextSlide() {
        const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
        this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        this.updateSliderPosition();
    }

    /**
     * Configurar event listeners para navegación y responsive
     */
    setupEventListeners() {
        // Botones de navegación
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Responsive handler
        window.addEventListener('resize', () => {
            this.updateCardsPerView();
            this.currentIndex = 0; // Reset position on resize
            this.updateSliderPosition();
        });

        // Soporte para navegación con teclado
        this.slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });

        // Hacer el slider accesible por teclado
        this.slider.setAttribute('tabindex', '0');

        // Soporte para navegación táctil (swipe) en dispositivos móviles
        this.setupTouchNavigation();
    }

    /**
     * Configurar navegación táctil para dispositivos móviles
     */
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        const minSwipeDistance = 50;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            // Prevenir scroll vertical si el swipe es más horizontal que vertical
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(startX - currentX);
            const diffY = Math.abs(startY - currentY);
            
            if (diffX > diffY && diffX > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Solo procesar swipe horizontal si es más horizontal que vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe left - ir al siguiente
                    this.nextSlide();
                } else {
                    // Swipe right - ir al anterior
                    this.previousSlide();
                }
            }
            
            isDragging = false;
        }, { passive: true });
    }

    /**
     * Ir a un slide específico
     * @param {number} index - Índice del slide
     */
    goToSlide(index) {
        const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
        this.currentIndex = Math.max(0, Math.min(maxIndex, index));
        this.updateSliderPosition();
    }

    /**
     * Obtener información del estado actual
     */
    getStatus() {
        return {
            currentIndex: this.currentIndex,
            totalCards: this.totalCards,
            cardsPerView: this.cardsPerView,
            maxIndex: Math.max(0, this.totalCards - this.cardsPerView)
        };
    }
}

/**
 * Función para inicializar múltiples sliders si es necesario
 * @param {string[]} sliderIds - Array de IDs de sliders
 */
function initRecommendedProductsSliders(sliderIds = ['recommended-slider']) {
    const sliders = [];
    
    sliderIds.forEach(sliderId => {
        const slider = new RecommendedProductsSlider(sliderId);
        if (slider.slider) {
            sliders.push(slider);
        }
    });
    
    return sliders;
}

/**
 * Configuración específica para múltiples sliders con diferentes configuraciones
 */
function initSpecificSliders() {
    // Slider principal (demo-completa.html)
    const mainSlider = document.getElementById('recommended-slider');
    if (mainSlider) {
        window.recommendedProductsSlider = new RecommendedProductsSlider('recommended-slider');
    }
    
    // Slider demo (index.html) - manejo especial para IDs diferentes
    const demoSlider = document.getElementById('recommended-slider');
    const demoTrack = document.getElementById('products-track');
    const demoPrevBtn = document.getElementById('prev-btn-demo');
    const demoNextBtn = document.getElementById('next-btn-demo');
    
    if (demoSlider && demoTrack && demoPrevBtn && demoNextBtn) {
        // Crear instancia manual para el slider demo con IDs personalizados
        const sliderDemo = new RecommendedProductsSlider();
        sliderDemo.slider = demoSlider;
        sliderDemo.track = demoTrack;
        sliderDemo.prevBtn = demoPrevBtn;
        sliderDemo.nextBtn = demoNextBtn;
        sliderDemo.init();
        window.recommendedProductsSliderDemo = sliderDemo;
    }
}

// Auto-inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initSpecificSliders();
});

// Exportar para uso modular si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RecommendedProductsSlider, initRecommendedProductsSliders };
}