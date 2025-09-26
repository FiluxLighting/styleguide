/**
 * Footer Lighting Professional - JavaScript Interactions
 * Estilo sobrio y profesional para el sector de iluminación
 */

(function($) {
    'use strict';
    
    // Configuración
    const config = {
        animationDuration: 400,
        hoverDelay: 100,
        fadeInThreshold: 0.2
    };
    
    // Inicialización cuando el DOM esté listo
    $(document).ready(function() {
        initFooterAnimations();
        initIntersectionObserver();
        initAccessibilityFeatures();
    });
    
    /**
     * Inicializa las animaciones del footer
     */
    function initFooterAnimations() {
        const $featureCards = $('#footer_before_container .feature-card');
        
        // Animación de entrada escalonada
        $featureCards.each(function(index) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(30px)'
            });
        });
        
        // Efectos hover mejorados
        $featureCards.on('mouseenter', function() {
            const $this = $(this);
            const $dot = $this.find('.icon-dot');
            
            // Animación suave del hover
            $this.addClass('card-hover-active');
            
            // Efecto en el dot
            setTimeout(function() {
                $dot.css('transform', 'scale(1.3) rotate(45deg)');
            }, config.hoverDelay);
        });
        
        $featureCards.on('mouseleave', function() {
            const $this = $(this);
            const $dot = $this.find('.icon-dot');
            
            $this.removeClass('card-hover-active');
            $dot.css('transform', 'scale(1) rotate(0deg)');
        });
        
        // Efecto de click suave
        $featureCards.on('click', function() {
            const $this = $(this);
            $this.addClass('card-clicked');
            
            setTimeout(function() {
                $this.removeClass('card-clicked');
            }, 200);
        });
    }
    
    /**
     * Inicializa el Intersection Observer para animaciones al scroll
     */
    function initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: config.fadeInThreshold,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateFooterEntry(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observar el contenedor principal
            const footerContainer = document.getElementById('footer_before_container');
            if (footerContainer) {
                observer.observe(footerContainer);
            }
        } else {
            // Fallback para navegadores sin soporte
            animateFooterEntry(document.getElementById('footer_before_container'));
        }
    }
    
    /**
     * Anima la entrada del footer cuando se hace visible
     */
    function animateFooterEntry(container) {
        const $container = $(container);
        const $header = $container.find('.header-section');
        const $cards = $container.find('.feature-card');
        
        // Animar header primero
        $header.animate({
            opacity: 1,
            transform: 'translateY(0)'
        }, config.animationDuration);
        
        // Animar cards con delay escalonado
        $cards.each(function(index) {
            const $card = $(this);
            const delay = index * 150;
            
            setTimeout(function() {
                $card.animate({
                    opacity: 1,
                    transform: 'translateY(0)'
                }, config.animationDuration);
            }, delay);
        });
    }
    
    /**
     * Inicializa características de accesibilidad
     */
    function initAccessibilityFeatures() {
        const $cards = $('#footer_before_container .feature-card');
        
        // Navegación por teclado
        $cards.attr('tabindex', '0');
        
        $cards.on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
        
        // Mejorar focus
        $cards.on('focus', function() {
            $(this).addClass('card-focused');
        });
        
        $cards.on('blur', function() {
            $(this).removeClass('card-focused');
        });
    }
    
    /**
     * Utilidad para detectar si un elemento está en viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    /**
     * Optimización de performance para animaciones
     */
    function optimizeAnimations() {
        // Reducir animaciones si el usuario prefiere menos movimiento
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            $('*').css({
                'animation-duration': '0.01ms !important',
                'animation-iteration-count': '1 !important',
                'transition-duration': '0.01ms !important'
            });
        }
    }
    
    // Inicializar optimizaciones
    $(window).on('load', function() {
        optimizeAnimations();
    });
    
    // Cleanup y event handlers
    $(window).on('beforeunload', function() {
        $(document).off('.footerLighting');
    });
    
})(jQuery);