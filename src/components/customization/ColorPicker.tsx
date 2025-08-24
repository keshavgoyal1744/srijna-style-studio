import { useState } from "react";
import { SketchPicker, ChromePicker } from "react-color";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Palette, Pipette } from "lucide-react";

interface ColorPickerProps {
  colors: {
    primary: string;
    secondary: string;
    border: string;
  };
  onColorsChange: (colors: { primary: string; secondary: string; border: string }) => void;
}

export const ColorPicker = ({ colors, onColorsChange }: ColorPickerProps) => {
  const [activeSlot, setActiveSlot] = useState<'primary' | 'secondary' | 'border'>('primary');
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color: any) => {
    const hexColor = color.hex;
    onColorsChange({
      ...colors,
      [activeSlot]: hexColor
    });
  };

  const handleHexInput = (value: string, slot: 'primary' | 'secondary' | 'border') => {
    if (value.match(/^#[0-9A-F]{6}$/i)) {
      onColorsChange({
        ...colors,
        [slot]: value
      });
    }
  };

  const presetColors = [
    '#8B0000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#DC143C', '#FF1493', '#00CED1', '#32CD32', '#FF8C00',
    '#2F4F4F', '#8FBC8F', '#D2691E', '#CD853F', '#A0522D',
    '#FF69B4', '#DDA0DD', '#98FB98', '#F0E68C', '#FFB6C1'
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-luxury-deep" />
        <h3 className="text-lg font-semibold">Unlimited Colors</h3>
      </div>

      {/* Color Slots */}
      <div className="grid grid-cols-3 gap-3">
        <Card 
          className={`cursor-pointer transition-all ${activeSlot === 'primary' ? 'ring-2 ring-luxury-gold' : ''}`}
          onClick={() => setActiveSlot('primary')}
        >
          <CardContent className="p-3 text-center">
            <div 
              className="w-full h-12 rounded-lg mb-2 border-2 border-gray-200"
              style={{ backgroundColor: colors.primary }}
            />
            <Label className="text-xs">Primary</Label>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${activeSlot === 'secondary' ? 'ring-2 ring-luxury-gold' : ''}`}
          onClick={() => setActiveSlot('secondary')}
        >
          <CardContent className="p-3 text-center">
            <div 
              className="w-full h-12 rounded-lg mb-2 border-2 border-gray-200"
              style={{ backgroundColor: colors.secondary }}
            />
            <Label className="text-xs">Secondary</Label>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${activeSlot === 'border' ? 'ring-2 ring-luxury-gold' : ''}`}
          onClick={() => setActiveSlot('border')}
        >
          <CardContent className="p-3 text-center">
            <div 
              className="w-full h-12 rounded-lg mb-2 border-2 border-gray-200"
              style={{ backgroundColor: colors.border }}
            />
            <Label className="text-xs">Border/Trim</Label>
          </CardContent>
        </Card>
      </div>

      {/* Preset Colors */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Quick Colors</Label>
        <div className="grid grid-cols-10 gap-1">
          {presetColors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => onColorsChange({ ...colors, [activeSlot]: color })}
            />
          ))}
        </div>
      </div>

      {/* Color Picker Toggle */}
      <Button 
        variant="outline" 
        onClick={() => setShowPicker(!showPicker)}
        className="w-full"
      >
        <Pipette className="mr-2 h-4 w-4" />
        {showPicker ? 'Hide' : 'Show'} Advanced Picker
      </Button>

      {/* Advanced Color Picker */}
      {showPicker && (
        <div className="border rounded-lg p-4 bg-background">
          <ChromePicker
            color={colors[activeSlot]}
            onChange={handleColorChange}
            className="mx-auto"
          />
        </div>
      )}

      {/* Hex Input */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Manual Input</Label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs text-luxury-charcoal">Primary</Label>
            <Input
              value={colors.primary}
              onChange={(e) => handleHexInput(e.target.value, 'primary')}
              placeholder="#000000"
              className="text-xs"
            />
          </div>
          <div>
            <Label className="text-xs text-luxury-charcoal">Secondary</Label>
            <Input
              value={colors.secondary}
              onChange={(e) => handleHexInput(e.target.value, 'secondary')}
              placeholder="#000000"
              className="text-xs"
            />
          </div>
          <div>
            <Label className="text-xs text-luxury-charcoal">Border</Label>
            <Input
              value={colors.border}
              onChange={(e) => handleHexInput(e.target.value, 'border')}
              placeholder="#000000"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};