# Benefit Rotator System

Sistema de rotación responsive para elementos benefit-item con animaciones suaves.

## 📁 Estructura

```
assets/benefit-rotator/
├── benefit-rotator.js    # Lógica JavaScript principal
├── benefit-rotator.css   # Estilos específicos del sistema
└── README.md            # Esta documentación
```

## 🎯 Funcionalidad por Breakpoint

### Desktop (> 1200px)
- **5 elementos visibles** siempre
- **Sin rotación** - contenido estático
- **Grid completo** en 5 columnas

### Tablet (481-1200px)
- **3 elementos visibles** con rotación
- **Rotación cada 3 segundos**
- **5 patrones diferentes**: 1,2,3 → 2,3,4 → 3,4,5 → 1,4,5 → 1,2,5

### Mobile (≤ 480px)
- **1 elemento visible** con rotación
- **Rotación cada 3 segundos**
- **Secuencia lineal**: 1 → 2 → 3 → 4 → 5 → 1

## 🚀 Implementación

### 1. Incluir archivos CSS y JS

```html
<link rel="stylesheet" href="assets/benefit-rotator/benefit-rotator.css">
<script src="assets/benefit-rotator/benefit-rotator.js"></script>
```

### 2. Estructura HTML requerida

```html
<div class="benefits-grid">
    <div class="benefit-item">...</div>
    <div class="benefit-item">...</div>
    <div class="benefit-item">...</div>
    <div class="benefit-item">...</div>
    <div class="benefit-item">...</div>
</div>
```

## 🎨 Animaciones

- **Entrada**: `fadeInUp` - aparece desde abajo (0.4s)
- **Salida**: `fadeOutDown` - se desvanece hacia arriba (0.3s)
- **Transiciones**: Cubic-bezier para suavidad natural

## 🔧 Control Programático

```javascript
// API disponible en window.BenefitRotator
BenefitRotator.pause();     // Pausar rotación
BenefitRotator.resume();    // Reanudar rotación  
BenefitRotator.reset();     // Reiniciar sistema
BenefitRotator.getCurrentBreakpoint(); // Obtener breakpoint actual
BenefitRotator.getVisibleCount(); // Contar elementos visibles
```

## 🐛 Debug Mode

Añade `?debug` a la URL para ver logs detallados en consola:

```
https://tu-sitio.com/demo-completa.html?debug
```

## ⚡ Características Técnicas

- **Responsive automático** - Se adapta a cambios de ventana
- **Performante** - Solo ejecuta rotación cuando es necesario
- **Animaciones asíncronas** - Entrada y salida coordinadas
- **Fallback robusto** - Funciona incluso si falta algún elemento
- **Sin dependencias** - JavaScript vanilla puro

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🔄 Versiones

**v1.0.0** - Implementación inicial con sistema responsive completo