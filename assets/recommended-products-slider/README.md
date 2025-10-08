# Recommended Products Slider System

Sistema de slider responsive para productos recomendados con navegación por flechas y soporte táctil.

## 📁 Estructura

```
assets/recommended-products-slider/
├── recommended-products-slider.js    # Lógica JavaScript principal
├── recommended-products-slider.css   # Estilos específicos del slider
└── README.md                        # Esta documentación
```

## 🎯 Funcionalidad por Breakpoint

### Desktop Grande (> 1200px)
- **5 productos visibles** simultáneamente
- **Navegación con flechas** laterales
- **Hover effects** en productos y controles
- **Grid de 5 columnas** responsive

### Desktop (481-1200px)
- **4 productos visibles** con navegación
- **Flechas de navegación** activas
- **Transiciones suaves** entre slides
- **Responsive flex layout**

### Tablet (481-768px)
- **2 productos visibles** por slide
- **Navegación oculta** en móvil
- **Touch/swipe ready** para futuras mejoras
- **Padding reducido** para optimizar espacio

### Mobile (≤ 480px)
- **1 producto visible** por slide
- **Sin controles de navegación** (scroll natural)
- **Diseño compacto** optimizado
- **Full width** en cada tarjeta

## 🚀 Características Técnicas

### CSS Features
- **CSS Variables** para theming consistente
- **Flexbox layout** responsive
- **Smooth transitions** (transform, box-shadow)
- **Hover animations** (translateY, scale)
- **Aspect ratio** control para imágenes

### JavaScript Features
- **Class-based architecture** para reutilización
- **Event delegation** para performance
- **Keyboard navigation** (flechas izquierda/derecha)
- **Responsive breakpoints** automáticos
- **Multiple slider instances** support

### Accesibilidad
- **Navegación por teclado** (ArrowLeft, ArrowRight)
- **Focus management** para controles
- **ARIA-friendly** structure ready
- **Semantic HTML** structure

## 📋 API Pública

### Constructor
```javascript
const slider = new RecommendedProductsSlider('slider-id');
```

### Métodos Principales
```javascript
slider.previousSlide()    // Ir al slide anterior
slider.nextSlide()        // Ir al siguiente slide
slider.goToSlide(index)   // Ir a slide específico
slider.getStatus()        // Obtener estado actual
```

### Auto-inicialización
```javascript
// Se inicializa automáticamente al cargar el DOM
// Busca elementos con IDs: recommended-slider, prev-btn, next-btn, products-track
```

## 🔧 Instalación

### HTML Structure
```html
<div class="recommended-products-slider" id="recommended-slider">
    <div class="recommended-products-track" id="products-track">
        <!-- Productos aquí -->
    </div>
    <button class="slider-nav slider-nav-prev" id="prev-btn">←</button>
    <button class="slider-nav slider-nav-next" id="next-btn">→</button>
</div>
```

### CSS Import
```html
<link rel="stylesheet" href="assets/recommended-products-slider/recommended-products-slider.css">
```

### JavaScript Import
```html
<script src="assets/recommended-products-slider/recommended-products-slider.js"></script>
```

## 🎨 Customización

### Variables CSS Principales
```css
--color-white          /* Background de tarjetas */
--color-gray-900       /* Color de botones */
--border-radius-lg     /* Radio de bordes */
--shadow-sm, --shadow-lg /* Sombras */
--transition-base      /* Duración de transiciones */
```

### Configuración Responsive
Los breakpoints se configuran en JavaScript:
- Mobile: ≤ 480px → 1 tarjeta
- Tablet: ≤ 768px → 2 tarjetas  
- Desktop: ≤ 1200px → 4 tarjetas
- Large: > 1200px → 5 tarjetas

## 🔄 Integración con FILUX

### Dependencias
- Requiere variables CSS del sistema de diseño FILUX
- Compatible con `filux-premium-unified.css`
- Uso de design tokens existentes

### Uso en Páginas
- **demo-completa.html**: Slider principal de productos
- **index.html**: Demo en guía de estilos con IDs personalizados
- **Extensible**: Para catálogos, relacionados, ofertas, etc.