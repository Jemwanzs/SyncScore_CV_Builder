export interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

export const colorPresets: ColorPreset[] = [
  {
    name: 'Emerald Pro',
    primary: '#059669',
    secondary: '#0d9488',
    accent: '#f97316'
  },
  {
    name: 'Navy Classic',
    primary: '#1e3a5f',
    secondary: '#2563eb',
    accent: '#fbbf24'
  },
  {
    name: 'Burgundy',
    primary: '#7f1d1d',
    secondary: '#dc2626',
    accent: '#f59e0b'
  },
  {
    name: 'Forest',
    primary: '#14532d',
    secondary: '#15803d',
    accent: '#84cc16'
  },
  {
    name: 'Slate Modern',
    primary: '#334155',
    secondary: '#64748b',
    accent: '#06b6d4'
  },
  {
    name: 'Purple Reign',
    primary: '#581c87',
    secondary: '#7c3aed',
    accent: '#ec4899'
  },
  {
    name: 'Ocean Blue',
    primary: '#0c4a6e',
    secondary: '#0284c7',
    accent: '#22d3ee'
  },
  {
    name: 'Charcoal',
    primary: '#1f2937',
    secondary: '#4b5563',
    accent: '#f59e0b'
  }
];
