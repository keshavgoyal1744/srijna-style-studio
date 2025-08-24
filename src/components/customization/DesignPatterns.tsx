import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Brush, Scissors, Gem } from "lucide-react";

interface DesignPatternsProps {
  selections: {
    handwork: string[];
    patterns: string[];
    borders: string[];
    opacity: number;
    scale: number;
  };
  onSelectionChange: (selections: any) => void;
}

export const DesignPatterns = ({ selections, onSelectionChange }: DesignPatternsProps) => {
  const [activeTab, setActiveTab] = useState<'handwork' | 'patterns' | 'borders'>('handwork');

  const handworkOptions = [
    { id: 'zari', name: 'Zari Work', icon: '🌟', description: 'Golden thread embroidery' },
    { id: 'zardozi', name: 'Zardozi', icon: '✨', description: 'Metallic wire embroidery' },
    { id: 'gota', name: 'Gota Patti', icon: '🎀', description: 'Metallic ribbon work' },
    { id: 'mirror', name: 'Mirror Work', icon: '💎', description: 'Reflective embellishments' },
    { id: 'sequin', name: 'Sequin Work', icon: '🔮', description: 'Shimmering disc decoration' },
    { id: 'beadwork', name: 'Beadwork', icon: '⚪', description: 'Intricate bead patterns' },
    { id: 'threadwork', name: 'Thread Work', icon: '🧵', description: 'Colorful thread embroidery' },
    { id: 'pearl', name: 'Pearl Work', icon: '🦪', description: 'Elegant pearl embellishments' }
  ];

  const patternOptions = [
    { id: 'floral', name: 'Floral', icon: '🌸', description: 'Flower and leaf motifs' },
    { id: 'paisley', name: 'Paisley', icon: '🌀', description: 'Traditional teardrop patterns' },
    { id: 'abstract', name: 'Abstract', icon: '🎨', description: 'Modern geometric designs' },
    { id: 'block', name: 'Block Print', icon: '🔲', description: 'Hand-blocked patterns' },
    { id: 'stripes', name: 'Stripes', icon: '📏', description: 'Linear stripe patterns' },
    { id: 'checks', name: 'Checks', icon: '🔲', description: 'Classic checkered design' },
    { id: 'mandala', name: 'Mandala', icon: '☸️', description: 'Circular spiritual symbols' },
    { id: 'geometric', name: 'Geometric', icon: '🔶', description: 'Sharp geometric forms' }
  ];

  const borderOptions = [
    { id: 'lace', name: 'Lace Border', icon: '🕸️', description: 'Delicate lace edging' },
    { id: 'embroidered', name: 'Embroidered', icon: '🌟', description: 'Handwork border' },
    { id: 'contrast', name: 'Contrast', icon: '🎨', description: 'Different color border' },
    { id: 'tassels', name: 'Tassels', icon: '🎏', description: 'Hanging tassel border' },
    { id: 'fringe', name: 'Fringe', icon: '〰️', description: 'Fabric fringe edging' },
    { id: 'piping', name: 'Piping', icon: '📏', description: 'Cord edge finish' }
  ];

  const toggleSelection = (category: 'handwork' | 'patterns' | 'borders', id: string) => {
    const currentSelections = selections[category];
    const newSelections = currentSelections.includes(id)
      ? currentSelections.filter(item => item !== id)
      : [...currentSelections, id];
    
    onSelectionChange({
      ...selections,
      [category]: newSelections
    });
  };

  const handleSliderChange = (category: 'opacity' | 'scale', value: number[]) => {
    onSelectionChange({
      ...selections,
      [category]: value[0]
    });
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'handwork': return <Sparkles className="h-4 w-4" />;
      case 'patterns': return <Brush className="h-4 w-4" />;
      case 'borders': return <Scissors className="h-4 w-4" />;
      default: return <Gem className="h-4 w-4" />;
    }
  };

  const getCurrentOptions = () => {
    switch (activeTab) {
      case 'handwork': return handworkOptions;
      case 'patterns': return patternOptions;
      case 'borders': return borderOptions;
      default: return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Gem className="h-5 w-5 text-luxury-deep" />
        <h3 className="text-lg font-semibold">Design & Embellishments</h3>
      </div>

      {/* Tabs */}
      <div className="flex bg-luxury-cream rounded-lg p-1">
        {(['handwork', 'patterns', 'borders'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all text-sm font-medium ${
              activeTab === tab 
                ? 'bg-background text-luxury-deep shadow-sm' 
                : 'text-luxury-charcoal hover:text-luxury-deep'
            }`}
          >
            {getTabIcon(tab)}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {getCurrentOptions().map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selections[activeTab].includes(option.id)
                ? 'ring-2 ring-luxury-gold bg-luxury-cream'
                : 'hover:bg-luxury-cream/50'
            }`}
            onClick={() => toggleSelection(activeTab, option.id)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{option.icon}</span>
                <h4 className="font-semibold text-sm">{option.name}</h4>
              </div>
              <p className="text-xs text-luxury-charcoal">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Adjustment Controls */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Pattern Opacity - {selections.opacity}%
          </Label>
          <Slider
            value={[selections.opacity]}
            onValueChange={(value) => handleSliderChange('opacity', value)}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Pattern Scale - {selections.scale}%
          </Label>
          <Slider
            value={[selections.scale]}
            onValueChange={(value) => handleSliderChange('scale', value)}
            max={200}
            min={50}
            step={10}
            className="w-full"
          />
        </div>
      </div>

      {/* Selection Summary */}
      {(selections.handwork.length > 0 || selections.patterns.length > 0 || selections.borders.length > 0) && (
        <Card className="p-3 bg-luxury-cream/30">
          <Label className="text-xs font-medium text-luxury-deep">Selected Elements:</Label>
          <div className="flex flex-wrap gap-1 mt-1">
            {[...selections.handwork, ...selections.patterns, ...selections.borders].map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};