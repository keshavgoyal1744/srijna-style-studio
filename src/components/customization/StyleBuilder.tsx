import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Shirt, Scissors, ChevronDown } from "lucide-react";

interface StyleBuilderProps {
  garmentType: string;
  styles: {
    neckline: string;
    sleeve: string;
    back: string;
    drape: number;
    flare: number;
  };
  onStyleChange: (styles: any) => void;
}

export const StyleBuilder = ({ garmentType, styles, onStyleChange }: StyleBuilderProps) => {
  const necklineOptions = {
    saree: ["Round", "V-Neck", "Boat", "Sweetheart", "Halter"],
    lehenga: ["Round", "V-Neck", "Sweetheart", "Off-Shoulder", "High-Neck"],
    gown: ["Round", "V-Neck", "Sweetheart", "Boat", "Halter", "Off-Shoulder"],
    default: ["Round", "V-Neck", "Boat", "High-Neck", "Mandarin"]
  };

  const sleeveOptions = {
    saree: ["Sleeveless", "Cap", "Half", "3/4", "Full"],
    lehenga: ["Sleeveless", "Cap", "Half", "3/4", "Full", "Puff", "Bell"],
    gown: ["Sleeveless", "Cap", "Half", "3/4", "Full", "Off-Shoulder"],
    default: ["Sleeveless", "Cap", "Half", "3/4", "Full"]
  };

  const backOptions = {
    saree: ["Closed", "Keyhole", "Deep V", "Tie-Back", "Button"],
    lehenga: ["Closed", "Keyhole", "Deep V", "Tie-Back", "Sheer Panel"],
    gown: ["Closed", "Keyhole", "Deep V", "Tie-Back", "Open Back"],
    default: ["Closed", "Keyhole", "Deep V", "Button"]
  };

  const getCurrentOptions = (type: string, category: 'neckline' | 'sleeve' | 'back') => {
    const options = {
      neckline: necklineOptions,
      sleeve: sleeveOptions,
      back: backOptions
    }[category];
    
    return options[garmentType as keyof typeof options] || options.default;
  };

  const handleStyleSelect = (category: string, value: string) => {
    onStyleChange({
      ...styles,
      [category]: value
    });
  };

  const handleSliderChange = (category: string, value: number[]) => {
    onStyleChange({
      ...styles,
      [category]: value[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shirt className="h-5 w-5 text-luxury-deep" />
        <h3 className="text-lg font-semibold">Style Builder</h3>
      </div>

      {/* Neckline */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Neckline Style</Label>
        <div className="grid grid-cols-3 gap-2">
          {getCurrentOptions(garmentType, 'neckline').map((style) => (
            <Badge
              key={style}
              variant={styles.neckline === style ? "default" : "outline"}
              className="cursor-pointer hover:bg-luxury-cream justify-center py-2"
              onClick={() => handleStyleSelect('neckline', style)}
            >
              {style}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sleeve */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Sleeve Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {getCurrentOptions(garmentType, 'sleeve').map((style) => (
            <Badge
              key={style}
              variant={styles.sleeve === style ? "default" : "outline"}
              className="cursor-pointer hover:bg-luxury-cream justify-center py-2"
              onClick={() => handleStyleSelect('sleeve', style)}
            >
              {style}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Back Design */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Back Design</Label>
        <div className="grid grid-cols-3 gap-2">
          {getCurrentOptions(garmentType, 'back').map((style) => (
            <Badge
              key={style}
              variant={styles.back === style ? "default" : "outline"}
              className="cursor-pointer hover:bg-luxury-cream justify-center py-2"
              onClick={() => handleStyleSelect('back', style)}
            >
              {style}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Drape & Flare */}
      {(garmentType === 'saree' || garmentType === 'lehenga' || garmentType === 'gown') && (
        <>
          <div>
            <Label className="text-sm font-medium mb-3 block">
              {garmentType === 'saree' ? 'Pallu Drape' : 'Flare'} - {styles.flare}%
            </Label>
            <Slider
              value={[styles.flare]}
              onValueChange={(value) => handleSliderChange('flare', value)}
              max={100}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-luxury-charcoal mt-1">
              <span>Minimal</span>
              <span>Maximum</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Drape Style - {styles.drape}%
            </Label>
            <Slider
              value={[styles.drape]}
              onValueChange={(value) => handleSliderChange('drape', value)}
              max={100}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-luxury-charcoal mt-1">
              <span>Straight</span>
              <span>Flowing</span>
            </div>
          </div>
        </>
      )}

      {/* Garment-Specific Options */}
      {garmentType === 'lehenga' && (
        <Card className="p-3 bg-luxury-cream/50">
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="h-4 w-4" />
            <Label className="text-sm font-medium">Lehenga Specifics</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-background justify-center py-2">
              A-Line
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-background justify-center py-2">
              Mermaid
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-background justify-center py-2">
              Fish Cut
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-background justify-center py-2">
              Circular
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
};