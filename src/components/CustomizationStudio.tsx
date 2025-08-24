import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, ArrowLeft, ArrowRight, ShoppingCart, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { ColorPicker } from "./customization/ColorPicker";
import { StyleBuilder } from "./customization/StyleBuilder";
import { DesignPatterns } from "./customization/DesignPatterns";
import { EnhancedCanvas } from "./customization/EnhancedCanvas";

interface CustomizationStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizationStudio = ({ isOpen, onClose }: CustomizationStudioProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    garmentType: "",
    modelSize: "m",
    fabric: "",
    colors: {
      primary: "#8B0000",
      secondary: "#FF6B6B", 
      border: "#FFD700"
    },
    patterns: {
      handwork: [] as string[],
      patterns: [] as string[],
      borders: [] as string[],
      opacity: 70,
      scale: 100
    },
    styles: {
      neckline: "Round",
      sleeve: "Half",
      back: "Closed",
      drape: 50,
      flare: 50
    }
  });

  const steps = [
    "Choose Garment",
    "Model Size", 
    "Choose Fabric",
    "Unlimited Colors",
    "Design & Embellishments",
    "Style Builder",
    "Preview & Export"
  ];

  const garmentTypes = [
    { id: "saree", name: "Saree", icon: "👘", description: "Traditional draped garment" },
    { id: "lehenga", name: "Lehenga", icon: "👗", description: "Skirt with blouse and dupatta" },
    { id: "anarkali", name: "Anarkali", icon: "👚", description: "Flowing kurta with fitted bodice" },
    { id: "kurta", name: "Kurta Set", icon: "🥻", description: "Traditional top with bottom" },
    { id: "gown", name: "Indo-Western Gown", icon: "👑", description: "Fusion evening wear" },
    { id: "kurti", name: "Kurti", icon: "🎽", description: "Modern Indian tunic" }
  ];

  const modelSizes = [
    { id: "xs", name: "XS", description: "Extra Small (32-34)", avatar: "👤" },
    { id: "s", name: "S", description: "Small (34-36)", avatar: "👤" },
    { id: "m", name: "M", description: "Medium (36-38)", avatar: "👤" },
    { id: "l", name: "L", description: "Large (38-40)", avatar: "👥" },
    { id: "xl", name: "XL", description: "Extra Large (40-42)", avatar: "👥" },
    { id: "xxl", name: "XXL", description: "Double XL (42-44)", avatar: "👥" },
    { id: "xxxl", name: "XXXL", description: "Triple XL (44-46)", avatar: "👥" }
  ];

  const fabrics = [
    { id: "silk", name: "Silk", texture: "🌟", description: "Luxurious silk fabric", drape: "fluid" },
    { id: "cotton", name: "Cotton", texture: "🌿", description: "Breathable cotton", drape: "structured" },
    { id: "chiffon", name: "Chiffon", texture: "💨", description: "Light, flowing chiffon", drape: "flowing" },
    { id: "georgette", name: "Georgette", texture: "✨", description: "Elegant georgette", drape: "graceful" },
    { id: "crepe", name: "Crepe", texture: "🔮", description: "Textured crepe fabric", drape: "structured" },
    { id: "velvet", name: "Velvet", texture: "👑", description: "Rich velvet finish", drape: "heavy" },
    { id: "brocade", name: "Brocade", texture: "🏺", description: "Ornate brocade", drape: "structured" },
    { id: "organza", name: "Organza", texture: "🦋", description: "Sheer organza", drape: "stiff" }
  ];



  const handleSelection = (key: string, value: any) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    if (typeof value === 'string') {
      toast(`Selected ${value}`);
    }
  };

  const exportConfiguration = () => {
    const config = {
      timestamp: new Date().toISOString(),
      garment: selections.garmentType,
      size: selections.modelSize,
      fabric: selections.fabric,
      colors: selections.colors,
      patterns: selections.patterns,
      styles: selections.styles,
      metadata: {
        version: "1.0",
        platform: "Srijna Customizer"
      }
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `srijna-design-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast("Design configuration exported!");
  };

  const shareDesign = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Srijna Design',
          text: `Check out my custom ${selections.garmentType} design!`,
          url: window.location.href
        });
      } catch (error) {
        toast("Sharing cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Design link copied to clipboard!");
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculatePrice = () => {
    const basePrice = 15000;
    const sizeMultiplier = selections.modelSize === 'xxxl' ? 1.2 : 1.0;
    const fabricMultiplier = selections.fabric === 'silk' || selections.fabric === 'brocade' ? 1.5 : 1.0;
    const embellishmentPrice = (selections.patterns.handwork.length * 2000) + (selections.patterns.patterns.length * 1000);
    
    return Math.round((basePrice * sizeMultiplier * fabricMultiplier) + embellishmentPrice);
  };

  const addToCart = () => {
    const price = calculatePrice();
    toast(`Added to cart for ₹${price.toLocaleString()}! Redirecting to checkout...`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-background p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-luxury-deep">Customize Your Outfit</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === currentStep ? 'bg-luxury-gold text-luxury-deep' :
                index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-3 ${index === currentStep ? 'text-luxury-deep font-semibold' : 'text-luxury-charcoal'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* Step Content */}
        <div className="space-y-4">
          {currentStep === 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Garment Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {garmentTypes.map((garment) => (
                  <Card 
                    key={garment.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selections.garmentType === garment.id ? 'ring-2 ring-luxury-gold bg-luxury-cream' : ''
                    }`}
                    onClick={() => handleSelection('garmentType', garment.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{garment.icon}</div>
                      <h4 className="font-semibold text-sm">{garment.name}</h4>
                      <p className="text-xs text-luxury-charcoal">{garment.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Model Size</h3>
              <div className="space-y-2">
                {modelSizes.map((size) => (
                  <Card 
                    key={size.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selections.modelSize === size.id ? 'ring-2 ring-luxury-gold bg-luxury-cream' : ''
                    }`}
                    onClick={() => handleSelection('modelSize', size.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{size.name}</Badge>
                        <span className="text-sm text-luxury-charcoal">{size.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Fabric</h3>
              <div className="grid grid-cols-2 gap-3">
                {fabrics.map((fabric) => (
                  <Card 
                    key={fabric.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selections.fabric === fabric.id ? 'ring-2 ring-luxury-gold bg-luxury-cream' : ''
                    }`}
                    onClick={() => handleSelection('fabric', fabric.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{fabric.texture}</div>
                      <h4 className="font-semibold text-sm">{fabric.name}</h4>
                      <p className="text-xs text-luxury-charcoal">{fabric.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {fabric.drape} drape
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <ColorPicker
              colors={selections.colors}
              onColorsChange={(colors) => handleSelection('colors', colors)}
            />
          )}

          {currentStep === 4 && (
            <DesignPatterns
              selections={selections.patterns}
              onSelectionChange={(patterns) => handleSelection('patterns', patterns)}
            />
          )}

          {currentStep === 5 && (
            <StyleBuilder
              garmentType={selections.garmentType}
              styles={selections.styles}
              onStyleChange={(styles) => handleSelection('styles', styles)}
            />
          )}

          {currentStep === 6 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Design Summary</h3>
              <div className="space-y-3 text-sm">
                <Card className="p-3 bg-luxury-cream/30">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Garment:</strong> {selections.garmentType}</div>
                    <div><strong>Size:</strong> {selections.modelSize.toUpperCase()}</div>
                    <div><strong>Fabric:</strong> {selections.fabric}</div>
                    <div><strong>Neckline:</strong> {selections.styles.neckline}</div>
                  </div>
                </Card>
                
                <Card className="p-3 bg-luxury-cream/30">
                  <div className="mb-2"><strong>Colors:</strong></div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: selections.colors.primary }}></div>
                      <span className="text-xs">Primary</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: selections.colors.secondary }}></div>
                      <span className="text-xs">Secondary</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: selections.colors.border }}></div>
                      <span className="text-xs">Border</span>
                    </div>
                  </div>
                </Card>

                {(selections.patterns.handwork.length > 0 || selections.patterns.patterns.length > 0) && (
                  <Card className="p-3 bg-luxury-cream/30">
                    <div className="mb-2"><strong>Embellishments:</strong></div>
                    <div className="flex flex-wrap gap-1">
                      {[...selections.patterns.handwork, ...selections.patterns.patterns].map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <Button onClick={exportConfiguration} variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export Config
                  </Button>
                  <Button onClick={shareDesign} variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Design
                  </Button>
                </div>
                
                <Button onClick={addToCart} className="w-full" variant="luxury">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart - ₹{calculatePrice().toLocaleString()}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            variant="luxury" 
            onClick={nextStep} 
            disabled={currentStep === steps.length - 1}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gradient-rose p-6 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-luxury-deep mb-6">Live 2D Preview</h3>
        <Card className="p-6 bg-background shadow-luxury">
          <EnhancedCanvas
            garmentType={selections.garmentType}
            modelSize={selections.modelSize}
            fabric={selections.fabric}
            colors={selections.colors}
            patterns={selections.patterns}
            styles={selections.styles}
          />
        </Card>
        <p className="text-luxury-charcoal mt-4 text-center max-w-md">
          Advanced 2D layered preview system. Each customization updates in real-time with proper layer rendering.
        </p>
      </div>
    </div>
  );
};

export default CustomizationStudio;