import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Flower, 
  Star, 
  Crown, 
  Gem, 
  Zap,
  Circle,
  Square,
  Triangle,
  Heart
} from "lucide-react";

interface PatternDesignerProps {
  patterns: {
    handwork: string[];
    prints: string[];
    borders: string[];
    opacity: number;
    scale: number;
    placement: string;
  };
  embellishments: {
    zari: boolean;
    sequins: boolean;
    beadwork: boolean;
    mirror: boolean;
    embroidery: string[];
  };
  onPatternsChange: (patterns: any) => void;
  onEmbellishmentsChange: (embellishments: any) => void;
}

export const PatternDesigner = ({ 
  patterns, 
  embellishments, 
  onPatternsChange, 
  onEmbellishmentsChange 
}: PatternDesignerProps) => {
  const [activeTab, setActiveTab] = useState("handwork");

  // Handwork options
  const handworkOptions = [
    { 
      id: "zari", 
      name: "Zari Work", 
      icon: <Crown className="h-4 w-4" />, 
      description: "Gold & silver thread embroidery",
      complexity: "premium",
      price: 5000
    },
    { 
      id: "zardozi", 
      name: "Zardozi", 
      icon: <Star className="h-4 w-4" />, 
      description: "Raised metallic thread work",
      complexity: "luxury",
      price: 8000
    },
    { 
      id: "gota", 
      name: "Gota Patti", 
      icon: <Gem className="h-4 w-4" />, 
      description: "Gold ribbon appliqué work",
      complexity: "premium",
      price: 4000
    },
    { 
      id: "mirror", 
      name: "Mirror Work", 
      icon: <Circle className="h-4 w-4" />, 
      description: "Reflective mirror embellishments",
      complexity: "medium",
      price: 3000
    },
    { 
      id: "sequin", 
      name: "Sequin Work", 
      icon: <Sparkles className="h-4 w-4" />, 
      description: "Shimmering sequin patterns",
      complexity: "medium",
      price: 2500
    },
    { 
      id: "beadwork", 
      name: "Bead Work", 
      icon: <Circle className="h-4 w-4" />, 
      description: "Intricate bead embroidery",
      complexity: "premium",
      price: 6000
    },
    { 
      id: "threadwork", 
      name: "Thread Work", 
      icon: <Zap className="h-4 w-4" />, 
      description: "Colored thread embroidery",
      complexity: "basic",
      price: 1500
    },
    { 
      id: "stonework", 
      name: "Stone Work", 
      icon: <Gem className="h-4 w-4" />, 
      description: "Crystal & stone embellishments",
      complexity: "luxury",
      price: 10000
    }
  ];

  // Print pattern options
  const printOptions = [
    { 
      id: "floral", 
      name: "Floral", 
      icon: <Flower className="h-4 w-4" />, 
      description: "Traditional flower motifs",
      style: "classic"
    },
    { 
      id: "paisley", 
      name: "Paisley", 
      icon: <Heart className="h-4 w-4" />, 
      description: "Elegant paisley patterns",
      style: "traditional"
    },
    { 
      id: "geometric", 
      name: "Geometric", 
      icon: <Square className="h-4 w-4" />, 
      description: "Modern geometric designs",
      style: "contemporary"
    },
    { 
      id: "abstract", 
      name: "Abstract", 
      icon: <Triangle className="h-4 w-4" />, 
      description: "Artistic abstract patterns",
      style: "modern"
    },
    { 
      id: "blockprint", 
      name: "Block Print", 
      icon: <Square className="h-4 w-4" />, 
      description: "Hand-blocked patterns",
      style: "artisanal"
    },
    { 
      id: "tribal", 
      name: "Tribal", 
      icon: <Triangle className="h-4 w-4" />, 
      description: "Indigenous tribal motifs",
      style: "ethnic"
    },
    { 
      id: "mandala", 
      name: "Mandala", 
      icon: <Circle className="h-4 w-4" />, 
      description: "Circular mandala designs",
      style: "spiritual"
    },
    { 
      id: "vintage", 
      name: "Vintage", 
      icon: <Crown className="h-4 w-4" />, 
      description: "Retro vintage patterns",
      style: "classic"
    }
  ];

  // Border options
  const borderOptions = [
    { 
      id: "simple", 
      name: "Simple Border", 
      description: "Clean simple border line",
      width: "thin"
    },
    { 
      id: "ornate", 
      name: "Ornate Border", 
      description: "Detailed decorative border",
      width: "thick"
    },
    { 
      id: "lace", 
      name: "Lace Border", 
      description: "Delicate lace edging",
      width: "medium"
    },
    { 
      id: "scalloped", 
      name: "Scalloped Edge", 
      description: "Curved scalloped border",
      width: "medium"
    },
    { 
      id: "embroidered", 
      name: "Embroidered Border", 
      description: "Thread work border",
      width: "thick"
    },
    { 
      id: "beaded", 
      name: "Beaded Edge", 
      description: "Beaded border trim",
      width: "thin"
    }
  ];

  const placementOptions = [
    { id: "all-over", name: "All Over", description: "Full garment coverage" },
    { id: "yoke", name: "Yoke Only", description: "Upper chest area" },
    { id: "border", name: "Border Only", description: "Edges and hems" },
    { id: "panel", name: "Front Panel", description: "Central front section" },
    { id: "sleeves", name: "Sleeves", description: "Sleeve decoration" },
    { id: "dupatta", name: "Dupatta", description: "Dupatta/scarf only" }
  ];

  const toggleSelection = (category: 'handwork' | 'prints' | 'borders', item: string) => {
    const currentSelections = patterns[category];
    const updated = currentSelections.includes(item)
      ? currentSelections.filter(i => i !== item)
      : [...currentSelections, item];
    
    onPatternsChange({
      ...patterns,
      [category]: updated
    });
  };

  const toggleEmbellishment = (type: keyof typeof embellishments) => {
    if (typeof embellishments[type] === 'boolean') {
      onEmbellishmentsChange({
        ...embellishments,
        [type]: !embellishments[type]
      });
    }
  };

  const updatePatternSettings = (key: string, value: number | string) => {
    onPatternsChange({
      ...patterns,
      [key]: value
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "basic": return "bg-green-100 text-green-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "premium": return "bg-purple-100 text-purple-800";
      case "luxury": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculatePatternPrice = () => {
    let total = 0;
    
    // Handwork pricing
    patterns.handwork.forEach(work => {
      const option = handworkOptions.find(opt => opt.id === work);
      if (option) total += option.price;
    });
    
    // Print pricing (base cost)
    total += patterns.prints.length * 1500;
    
    // Border pricing
    total += patterns.borders.length * 800;
    
    return total;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-luxury-deep" />
          <h3 className="text-lg font-semibold text-luxury-deep">Pattern Designer</h3>
        </div>
        <Badge variant="outline" className="text-luxury-charcoal">
          +₹{calculatePatternPrice().toLocaleString()}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="handwork">Handwork</TabsTrigger>
          <TabsTrigger value="prints">Prints</TabsTrigger>
          <TabsTrigger value="borders">Borders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="handwork" className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {handworkOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  patterns.handwork.includes(option.id) 
                    ? 'ring-2 ring-luxury-gold bg-luxury-cream' 
                    : ''
                }`}
                onClick={() => toggleSelection('handwork', option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-luxury-deep">{option.icon}</div>
                      <div>
                        <h6 className="font-semibold">{option.name}</h6>
                        <p className="text-sm text-luxury-charcoal">{option.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getComplexityColor(option.complexity)}>
                        {option.complexity}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">+₹{option.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prints" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {printOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  patterns.prints.includes(option.id) 
                    ? 'ring-2 ring-luxury-gold bg-luxury-cream' 
                    : ''
                }`}
                onClick={() => toggleSelection('prints', option.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-luxury-deep mb-2">{option.icon}</div>
                  <h6 className="font-semibold text-sm">{option.name}</h6>
                  <p className="text-xs text-luxury-charcoal mb-2">{option.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {option.style}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borders" className="space-y-4">
          <div className="space-y-3">
            {borderOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  patterns.borders.includes(option.id) 
                    ? 'ring-2 ring-luxury-gold bg-luxury-cream' 
                    : ''
                }`}
                onClick={() => toggleSelection('borders', option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h6 className="font-semibold">{option.name}</h6>
                      <p className="text-sm text-luxury-charcoal">{option.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {option.width}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Pattern Opacity */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Pattern Opacity: {patterns.opacity}%
            </Label>
            <Slider
              value={[patterns.opacity]}
              onValueChange={(value) => updatePatternSettings('opacity', value[0])}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          {/* Pattern Scale */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Pattern Scale: {patterns.scale}%
            </Label>
            <Slider
              value={[patterns.scale]}
              onValueChange={(value) => updatePatternSettings('scale', value[0])}
              max={200}
              min={50}
              step={10}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Pattern Placement */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Pattern Placement</Label>
            <div className="grid grid-cols-2 gap-2">
              {placementOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={patterns.placement === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => updatePatternSettings('placement', option.id)}
                  className="text-xs"
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick Embellishment Toggles */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Quick Embellishments</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={embellishments.zari ? "default" : "outline"}
                size="sm"
                onClick={() => toggleEmbellishment('zari')}
                className="flex items-center gap-2"
              >
                <Crown className="h-3 w-3" />
                Zari
              </Button>
              <Button
                variant={embellishments.sequins ? "default" : "outline"}
                size="sm"
                onClick={() => toggleEmbellishment('sequins')}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-3 w-3" />
                Sequins
              </Button>
              <Button
                variant={embellishments.beadwork ? "default" : "outline"}
                size="sm"
                onClick={() => toggleEmbellishment('beadwork')}
                className="flex items-center gap-2"
              >
                <Circle className="h-3 w-3" />
                Beadwork
              </Button>
              <Button
                variant={embellishments.mirror ? "default" : "outline"}
                size="sm"
                onClick={() => toggleEmbellishment('mirror')}
                className="flex items-center gap-2"
              >
                <Gem className="h-3 w-3" />
                Mirror
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selection Summary */}
      {(patterns.handwork.length > 0 || patterns.prints.length > 0 || patterns.borders.length > 0) && (
        <Card className="p-4 bg-luxury-cream/30 border-luxury-gold">
          <h6 className="font-semibold mb-3 text-center">Selected Patterns & Embellishments</h6>
          <div className="space-y-2">
            {patterns.handwork.length > 0 && (
              <div>
                <Label className="text-xs text-luxury-charcoal">Handwork:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patterns.handwork.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {handworkOptions.find(opt => opt.id === item)?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {patterns.prints.length > 0 && (
              <div>
                <Label className="text-xs text-luxury-charcoal">Prints:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patterns.prints.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {printOptions.find(opt => opt.id === item)?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {patterns.borders.length > 0 && (
              <div>
                <Label className="text-xs text-luxury-charcoal">Borders:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patterns.borders.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {borderOptions.find(opt => opt.id === item)?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-2 mt-3 border-t border-luxury-gold/30 text-center">
              <p className="text-sm font-bold text-luxury-deep">
                Pattern Cost: +₹{calculatePatternPrice().toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};