/**
 * BENEFIT ROTATOR - Sistema de rotación responsive
 * ================================================
 * 
 * Funcionalidad por breakpoint:
 * - Desktop (> 1200px): 5 elementos visibles, sin rotación
 * - Tablet (481-1200px): 3 elementos con rotación cada 3s
 * - Mobile (≤ 480px): 1 elemento con rotación cada 3s
 * 
 * @author Filux Lighting
 * @version 1.0.0
 */

// Rotación responsive de benefit-items con animaciones
document.addEventListener('DOMContentLoaded', function() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    if (benefitItems.length < 5) return;
    
    let rotationInterval = null;
    let currentRotation = 0;
    
    // Patrones de rotación según breakpoints
    const rotationPatterns = {
        desktop: [
            [0, 1, 2], // Items 1, 2, 3
            [1, 2, 3], // Items 2, 3, 4
            [2, 3, 4], // Items 3, 4, 5
            [0, 3, 4], // Items 1, 4, 5
            [0, 1, 4]  // Items 1, 2, 5
        ],
        mobile: [
            [0], [1], [2], [3], [4] // Un elemento cada vez
        ]
    };
    
    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 1200) return 'tablet'; 
        return 'desktop';
    }
    
    function shouldRotate() {
        const breakpoint = getCurrentBreakpoint();
        return breakpoint === 'tablet' || breakpoint === 'mobile';
    }
    
    function getVisibleCount() {
        const breakpoint = getCurrentBreakpoint();
        if (breakpoint === 'mobile') return 1;
        if (breakpoint === 'tablet') return 3;
        return 5; // desktop - mostrar todos
    }
    
    async function animateOut(elements) {
        return new Promise(resolve => {
            elements.forEach(element => {
                element.style.animation = 'fadeOutDown 0.3s ease-out forwards';
            });
            setTimeout(() => {
                elements.forEach(element => {
                    element.classList.add('hidden');
                    element.classList.remove('visible');
                    element.style.animation = '';
                });
                resolve();
            }, 300);
        });
    }
    
    async function animateIn(elements) {
        return new Promise(resolve => {
            elements.forEach(element => {
                element.classList.remove('hidden');
                element.classList.add('visible');
                element.style.animation = 'fadeInUp 0.4s ease-out forwards';
            });
            setTimeout(() => {
                elements.forEach(element => {
                    element.style.animation = '';
                });
                resolve();
            }, 400);
        });
    }
    
    async function rotateBenefits() {
        if (!shouldRotate()) return;
        
        const breakpoint = getCurrentBreakpoint();
        const patterns = breakpoint === 'mobile' ? rotationPatterns.mobile : rotationPatterns.desktop;
        const visibleIndexes = patterns[currentRotation];
        
        // Elementos actuales visibles
        const currentVisible = Array.from(benefitItems).filter(item => 
            item.classList.contains('visible')
        );
        
        // Elementos que deben estar visibles
        const newVisible = visibleIndexes.map(index => benefitItems[index]);
        
        // Elementos que salen
        const elementsToHide = currentVisible.filter(item => 
            !newVisible.includes(item)
        );
        
        // Elementos que entran
        const elementsToShow = newVisible.filter(item => 
            !currentVisible.includes(item)
        );
        
        // Animar salida
        if (elementsToHide.length > 0) {
            await animateOut(elementsToHide);
        }
        
        // Animar entrada
        if (elementsToShow.length > 0) {
            await animateIn(elementsToShow);
        }
        
        if (window.location.search.includes('debug')) {
            console.log(`${breakpoint.toUpperCase()} - Rotación ${currentRotation + 1}: Items ${visibleIndexes.map(i => i + 1).join(', ')}`);
        }
        
        // Siguiente rotación
        currentRotation = (currentRotation + 1) % patterns.length;
    }
    
    function resetBenefits() {
        clearInterval(rotationInterval);
        currentRotation = 0;
        
        const breakpoint = getCurrentBreakpoint();
        
        if (!shouldRotate()) {
            // Mostrar todos los elementos (desktop)
            benefitItems.forEach(item => {
                item.classList.remove('hidden');
                item.classList.add('visible');
                item.style.animation = '';
            });
            return;
        }
        
        // Estado inicial según breakpoint
        const visibleCount = getVisibleCount();
        benefitItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.classList.add('visible');
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
            item.style.animation = '';
        });
        
        // Iniciar rotación
        rotationInterval = setInterval(rotateBenefits, 3000);
    }
    
    // Inicializar
    resetBenefits();
    
    // Escuchar cambios de tamaño de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resetBenefits, 250);
    });
    
    // Debug mode: añadir ?debug a la URL
    if (window.location.search.includes('debug')) {
        console.log('🔄 Benefit Rotator iniciado - Modo debug activo');
        setInterval(() => {
            const visibleCount = document.querySelectorAll('.benefit-item.visible').length;
            const breakpoint = getCurrentBreakpoint();
            console.log(`${breakpoint} - Elementos visibles: ${visibleCount}`);
        }, 2000);
    }
    
    // API pública para control externo (opcional)
    window.BenefitRotator = {
        pause: () => clearInterval(rotationInterval),
        resume: () => {
            clearInterval(rotationInterval);
            rotationInterval = setInterval(rotateBenefits, 3000);
        },
        reset: resetBenefits,
        getCurrentBreakpoint,
        getVisibleCount: () => document.querySelectorAll('.benefit-item.visible').length
    };
});