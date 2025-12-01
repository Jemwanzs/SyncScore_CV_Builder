// Converts hex color to HSL format for CSS variables
export const hexToHSL = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    const lValue = Math.round(l * 100);
    
    return `${h} ${s}% ${lValue}%`;
  };
  
  // Apply CV colors to global CSS variables
  export const syncColorsToTheme = (colors: { primary: string; secondary: string; accent: string }) => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary', hexToHSL(colors.primary));
    root.style.setProperty('--secondary', hexToHSL(colors.secondary));
    root.style.setProperty('--accent', hexToHSL(colors.accent));
  };