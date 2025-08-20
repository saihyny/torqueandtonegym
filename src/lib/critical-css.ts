// PERFORMANCE OPTIMIZED: Critical CSS utilities
// Extracts and inlines critical above-the-fold CSS for faster rendering
// Reduces First Contentful Paint (FCP) and Largest Contentful Paint (LCP)

export const criticalCSS = `
/* CRITICAL CSS - Above the fold styles only */
/* This CSS is inlined in the HTML head for immediate rendering */

/* Reset and base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  font-feature-settings: normal;
  font-variation-settings: normal;
}

body {
  margin: 0;
  line-height: inherit;
  background-color: rgb(7 7 7);
  color: rgb(250 250 250);
  font-family: 'Inter', 'Inter-Fallback', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Critical layout styles */
.min-h-screen {
  min-height: 100vh;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-0 {
  inset: 0px;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-center {
  text-align: center;
}

.overflow-hidden {
  overflow: hidden;
}

/* Critical typography */
.font-oswald {
  font-family: 'Oswald', 'Oswald-Fallback', ui-sans-serif, system-ui, sans-serif;
}

.font-inter {
  font-family: 'Inter', 'Inter-Fallback', ui-sans-serif, system-ui, sans-serif;
}

.font-extrabold {
  font-weight: 800;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.leading-tight {
  line-height: 1.25;
}

.text-white {
  color: rgb(255 255 255);
}

/* Critical hero text sizes */
.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}

@media (min-width: 768px) {
  .md\\:text-8xl {
    font-size: 6rem;
    line-height: 1;
  }
}

@media (min-width: 1024px) {
  .lg\\:text-9xl {
    font-size: 8rem;
    line-height: 1;
  }
}

/* Critical background styles */
.bg-black {
  background-color: rgb(0 0 0);
}

.bg-background {
  background-color: rgb(7 7 7);
}

/* Critical spacing */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 1024px) {
  .lg\\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.max-w-4xl {
  max-width: 56rem;
}

.space-y-10 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 2.5rem;
}

/* Critical image styles */
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.object-cover {
  object-fit: cover;
}

/* Critical gradient and effects */
.text-gradient {
  background: linear-gradient(to right, rgb(220 38 38), rgb(255 255 255));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.text-glow {
  text-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
}

/* Critical button styles */
.btn-hero {
  position: relative;
  overflow: hidden;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgb(220 38 38) 0%, rgb(239 68 68) 50%, rgb(220 38 38) 100%);
  color: rgb(255 255 255);
  font-family: 'Oswald', 'Oswald-Fallback', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-hero:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
}

/* Critical loading states */
.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Critical animation classes */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Critical responsive utilities */
@media (min-width: 768px) {
  .md\\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

/* Performance optimization: Prevent layout shifts */
.aspect-video {
  aspect-ratio: 16 / 9;
}

.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}
`;

// Function to inject critical CSS
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById('critical-css');
  if (existingStyle) return; // Already injected
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

// Function to preload non-critical CSS
export const preloadNonCriticalCSS = () => {
  if (typeof document === 'undefined') return;
  
  // Preload the main CSS file
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = '/src/index.css';
  link.onload = () => {
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

// CSS optimization utilities
export const cssUtils = {
  // Remove unused CSS classes at runtime (for dynamic content)
  removeUnusedClasses: (element: HTMLElement, usedClasses: string[]) => {
    const allClasses = Array.from(element.classList);
    const unusedClasses = allClasses.filter(cls => !usedClasses.includes(cls));
    unusedClasses.forEach(cls => element.classList.remove(cls));
  },
  
  // Optimize CSS custom properties
  setCSSVariable: (property: string, value: string, element: HTMLElement = document.documentElement) => {
    element.style.setProperty(property, value);
  },
  
  // Batch CSS updates to prevent layout thrashing
  batchCSSUpdates: (updates: Array<{ element: HTMLElement; property: string; value: string }>) => {
    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
      updates.forEach(({ element, property, value }) => {
        element.style.setProperty(property, value);
      });
    });
  },
  
  // Check if CSS feature is supported
  supportsCSS: (property: string, value: string): boolean => {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports(property, value);
  }
};

export default {
  criticalCSS,
  injectCriticalCSS,
  preloadNonCriticalCSS,
  cssUtils
};
