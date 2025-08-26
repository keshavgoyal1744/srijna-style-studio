import { useState } from "react";
import { ChromePicker, CompactPicker } from "react-color";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Pipette, Sparkles, Eye } from "lucide-react";

interface ColorStudioProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  onColorsChange: (colors: { primary: string; secondary: string; accent: string; border: string }) => void;
}

export const ColorStudio = ({ colors, onColorsChange }: ColorStudioProps) => {
  const [activeSlot, setActiveSlot] = useState<'primary' | 'secondary' | 'accent' | 'border'>('primary');
  const [showAdvancedPicker, setShowAdvancedPicker] = useState(false);

  const handleColorChange = (color: any) => {
    const hexColor = color.hex;
    onColorsChange({
      ...colors,
      [activeSlot]: hexColor
    });
  };

  const handleHexInput = (value: string, slot: keyof typeof colors) => {
    if (value.match(/^#[0-9A-F]{6}$/i)) {
      onColorsChange({
        ...colors,
        [slot]: value
      });
    }
  };

  // Curated color palettes for Indian fashion
  const fashionPalettes = [
    {
      name: "Royal Elegance",
      colors: ["#8B0000", "#FFD700", "#800080", "#4B0082"],
      description: "Deep reds, golds, and regal purples"
    },
    {
      name: "Sunset Romance",
      colors: ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5"],
      description: "Warm oranges and vibrant contrasts"
    },
    {
      name: "Ocean Breeze",
      colors: ["#006A6B", "#40E0D0", "#0077BE", "#B19CD9"],
      description: "Cool blues and tranquil tones"
    },
    {
      name: "Garden Bloom",
      colors: ["#228B22", "#32CD32", "#FF69B4", "#FFB6C1"],
      description: "Fresh greens with floral pinks"
    },
    {
      name: "Monsoon Magic",
      colors: ["#2F4F4F", "#708090", "#4682B4", "#E6E6FA"],
      description: "Stormy grays and soft lavenders"
    },
    {
      name: "Festival Joy",
      colors: ["#FF1493", "#FF4500", "#FFFF00", "#00FF7F"],
      description: "Vibrant celebration colors"
    }
  ];

  // Quick color swatches
  const quickColors = [
    // Reds
    "#8B0000", "#DC143C", "#FF6347", "#FF69B4",
    // Golds & Yellows
    "#FFD700", "#FFA500", "#FFFF00", "#F0E68C",
    // Blues
    "#000080", "#4169E1", "#00BFFF", "#87CEEB",
    // Greens
    "#006400", "#32CD32", "#00FF7F", "#98FB98",
    // Purples
    "#4B0082", "#8A2BE2", "#9370DB", "#DDA0DD",
    // Earth tones
    "#8B4513", "#D2691E", "#CD853F", "#F4A460",
    // Neutrals
    "#000000", "#696969", "#C0C0C0", "#FFFFFF"
  ];

  const applyPalette = (palette: string[]) => {
    onColorsChange({
      primary: palette[0],
      secondary: palette[1],
      accent: palette[2],
      border: palette[3]
    });
  };

  const getColorInfo = (hex: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
    };
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-luxury-deep" />
        <h3 className="text-lg font-semibold text-luxury-deep">Color Studio</h3>
        <Badge variant="outline" className="ml-auto">Unlimited Colors</Badge>
      </div>

      <Tabs defaultValue="slots" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slots">Color Slots</TabsTrigger>
          <TabsTrigger value="palettes">Palettes</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="slots" className="space-y-4">
          {/* Color Slots */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(colors).map(([key, color]) => (
              <Card
                key={key}
                className={`cursor-pointer transition-all ${
                  activeSlot === key ? 'ring-2 ring-luxury-gold' : ''
                }`}
                onClick={() => setActiveSlot(key as keyof typeof colors)}
              >
                <CardContent className="p-3 text-center">
                  <div
                    className="w-full h-16 rounded-lg mb-2 border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <Label className="text-xs font-medium capitalize">{key}</Label>
                  <p className="text-xs text-luxury-charcoal mt-1">{color}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Colors */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Quick Colors</Label>
            <div className="grid grid-cols-8 gap-2">
              {quickColors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded cursor-pointer border-2 border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => onColorsChange({ ...colors, [activeSlot]: color })}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Compact Picker */}
          <Card className="p-4">
            <CompactPicker
              color={colors[activeSlot]}
              onChange={handleColorChange}
              className="mx-auto"
            />
          </Card>
        </TabsContent>

        <TabsContent value="palettes" className="space-y-4">
          <div className="space-y-4">
            {fashionPalettes.map((palette, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h6 className="font-semibold text-luxury-deep">{palette.name}</h6>
                    <p className="text-xs text-luxury-charcoal">{palette.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => applyPalette(palette.colors)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                </div>
                <div className="flex gap-2">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-12 h-12 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => onColorsChange({ ...colors, [activeSlot]: color })}
                      title={color}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          {/* Advanced Color Picker */}
          <Button
            variant="outline"
            onClick={() => setShowAdvancedPicker(!showAdvancedPicker)}
            className="w-full"
          >
            <Pipette className="mr-2 h-4 w-4" />
            {showAdvancedPicker ? 'Hide' : 'Show'} Advanced Picker
          </Button>

          {showAdvancedPicker && (
            <Card className="p-4">
              <ChromePicker
                color={colors[activeSlot]}
                onChange={handleColorChange}
                className="mx-auto"
              />
            </Card>
          )}

          {/* Manual Color Input */}
          <Card className="p-4">
            <h6 className="font-semibold mb-3 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Manual Input
            </h6>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(colors).map(([key, color]) => (
                <div key={key}>
                  <Label className="text-xs text-luxury-charcoal capitalize mb-1 block">
                    {key}
                  </Label>
                  <Input
                    value={color}
                    onChange={(e) => handleHexInput(e.target.value, key as keyof typeof colors)}
                    placeholder="#000000"
                    className="text-xs font-mono"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Color Information */}
          <Card className="p-4">
            <h6 className="font-semibold mb-3">Active Color Info</h6>
            <div className="space-y-2">
              {(() => {
                const colorInfo = getColorInfo(colors[activeSlot]);
                return (
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-luxury-charcoal">HEX:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {colorInfo.hex}
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-charcoal">RGB:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {colorInfo.rgb}
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-charcoal">HSL:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {colorInfo.hsl}
                      </code>
                    </div>
                  </div>
                );
              })()}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Color Preview */}
      <Card className="p-4 bg-luxury-cream/30 border-luxury-gold">
        <h6 className="font-semibold text-center mb-3">Color Combination Preview</h6>
        <div className="flex items-center justify-center gap-2">
          {Object.entries(colors).map(([key, color]) => (
            <div key={key} className="text-center">
              <div
                className="w-12 h-12 rounded border-2 border-white shadow-md"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs text-luxury-charcoal mt-1 capitalize">{key}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};