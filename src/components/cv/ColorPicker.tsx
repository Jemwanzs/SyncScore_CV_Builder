import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ColorScheme } from '@/types/cv';
import { colorPresets } from '@/lib/colorPresets';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  colorScheme: ColorScheme;
  onChange: (colors: ColorScheme) => void;
}

export const ColorPicker = ({ colorScheme, onChange }: ColorPickerProps) => {
  const isPresetActive = (preset: typeof colorPresets[0]) => {
    return preset.primary === colorScheme.primary &&
           preset.secondary === colorScheme.secondary &&
           preset.accent === colorScheme.accent;
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange({
                primary: preset.primary,
                secondary: preset.secondary,
                accent: preset.accent
              })}
              className="relative group"
            >
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary"
                   style={{ borderColor: isPresetActive(preset) ? preset.primary : 'transparent' }}>
                <div className="flex gap-1">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.primary }} />
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.secondary }} />
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.accent }} />
                </div>
                <span className="text-xs font-medium">{preset.name}</span>
                {isPresetActive(preset) && (
                  <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Custom Colors</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary">Primary</Label>
            <div className="flex gap-2">
              <Input
                id="primary"
                type="color"
                value={colorScheme.primary}
                onChange={(e) => onChange({ ...colorScheme, primary: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colorScheme.primary}
                onChange={(e) => onChange({ ...colorScheme, primary: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondary">Secondary</Label>
            <div className="flex gap-2">
              <Input
                id="secondary"
                type="color"
                value={colorScheme.secondary}
                onChange={(e) => onChange({ ...colorScheme, secondary: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colorScheme.secondary}
                onChange={(e) => onChange({ ...colorScheme, secondary: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accent">Accent</Label>
            <div className="flex gap-2">
              <Input
                id="accent"
                type="color"
                value={colorScheme.accent}
                onChange={(e) => onChange({ ...colorScheme, accent: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colorScheme.accent}
                onChange={(e) => onChange({ ...colorScheme, accent: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
