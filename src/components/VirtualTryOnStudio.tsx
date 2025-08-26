import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, ArrowLeft, ArrowRight, ShoppingCart, Download, Share2, Palette, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { VirtualMannequin } from "./tryOn/VirtualMannequin";
import { FabricSelector } from "./tryOn/FabricSelector";
import { ColorStudio } from "./tryOn/ColorStudio";
import { PatternDesigner } from "./tryOn/PatternDesigner";
import { StyleCustomizer } from "./tryOn/StyleCustomizer";

interface VirtualTryOnStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CustomizationState {
  // Core selections
  garmentType: string;
  modelSize: string;
  fabric: {
    type: string;
    texture: string;
    drape: string;
    price: number;
  };
  
  // Color system
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  
  // Design patterns
  patterns: {
    handwork: string[];
    prints: string[];
    borders: string[];
    opacity: number;
    scale: number;
    placement: string;
  };
  
  // Style elements
  styles: {
    neckline: string;
    sleeve: string;
    back: string;
    length: string;
    drape: number;
    flare: number;
    extras: string[];
  };
  
  // Additional elements
  embellishments: {
    zari: boolean;
    sequins: boolean;
    beadwork: boolean;
    mirror: boolean;
    embroidery: string[];
  };
}

const VirtualTryOnStudio = ({ isOpen, onClose }: VirtualTryOnStudioProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customization, setCustomization] = useState<CustomizationState>({
    garmentType: "",
    modelSize: "m",
    fabric: {
      type: "",
      texture: "",
      drape: "medium",
      price: 0
    },
    colors: {
      primary: "#8B0000",
      secondary: "#FFD700",
      accent: "#FF6B6B",
      border: "#D4AF37"
    },
    patterns: {
      handwork: [],
      prints: [],
      borders: [],
      opacity: 70,
      scale: 100,
      placement: "all-over"
    },
    styles: {
      neckline: "round",
      sleeve: "half",
      back: "closed",
      length: "regular",
      drape: 50,
      flare: 50,
      extras: []
    },
    embellishments: {
      zari: false,
      sequins: false,
      beadwork: false,
      mirror: false,
      embroidery: []
    }
  });

  const steps = [
    { id: "garment", title: "Choose Garment", icon: "👗", description: "Select your outfit type" },
    { id: "size", title: "Model Size", icon: "👤", description: "Pick your size & fit" },
    { id: "fabric", title: "Fabric Selection", icon: "🧵", description: "Choose material & texture" },
    { id: "colors", title: "Color Studio", icon: "🎨", description: "Unlimited color options" },
    { id: "patterns", title: "Design Patterns", icon: "✨", description: "Add patterns & prints" },
    { id: "styles", title: "Style Builder", icon: "✂️", description: "Customize cut & style" },
    { id: "preview", title: "Final Preview", icon: "👁️", description: "Review & purchase" }
  ];

  // Garment type options with detailed specifications
  const garmentTypes = [
    {
      id: "saree",
      name: "Saree",
      icon: "🥻",
      description: "Traditional 6-yard drape",
      basePrice: 25000,
      complexity: "advanced",
      styleOptions: ["pallu", "pleats", "border", "blouse"]
    },
    {
      id: "lehenga",
      name: "Lehenga",
      icon: "👑",
      description: "Elegant skirt with blouse",
      basePrice: 35000,
      complexity: "premium",
      styleOptions: ["flare", "length", "choli", "dupatta"]
    },
    {
      id: "anarkali",
      name: "Anarkali",
      icon: "👸",
      description: "Flowing asymmetrical kurta",
      basePrice: 18000,
      complexity: "medium",
      styleOptions: ["flare", "length", "yoke", "sleeves"]
    },
    {
      id: "kurta",
      name: "Kurta Set",
      icon: "🧥",
      description: "Traditional top with bottoms",
      basePrice: 12000,
      complexity: "basic",
      styleOptions: ["length", "sleeves", "bottoms", "dupatta"]
    },
    {
      id: "gown",
      name: "Indo-Western Gown",
      icon: "✨",
      description: "Fusion evening wear",
      basePrice: 28000,
      complexity: "premium",
      styleOptions: ["silhouette", "train", "neckline", "sleeves"]
    },
    {
      id: "kurti",
      name: "Designer Kurti",
      icon: "👔",
      description: "Contemporary tunic",
      basePrice: 8000,
      complexity: "basic",
      styleOptions: ["length", "fit", "sleeves", "hem"]
    }
  ];

  // Model sizes with body measurements
  const modelSizes = [
    { id: "xs", name: "XS", bust: "32", waist: "26", hips: "34", description: "Petite fit" },
    { id: "s", name: "S", bust: "34", waist: "28", hips: "36", description: "Small fit" },
    { id: "m", name: "M", bust: "36", waist: "30", hips: "38", description: "Medium fit" },
    { id: "l", name: "L", bust: "38", waist: "32", hips: "40", description: "Large fit" },
    { id: "xl", name: "XL", bust: "40", waist: "34", hips: "42", description: "Extra large fit" },
    { id: "xxl", name: "XXL", bust: "42", waist: "36", hips: "44", description: "Plus size fit" },
    { id: "xxxl", name: "XXXL", bust: "44", waist: "38", hips: "46", description: "Extended size fit" }
  ];

  const updateCustomization = (updates: Partial<CustomizationState>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
    toast("Design updated!");
  };

  const calculateProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const calculatePrice = () => {
    const baseGarment = garmentTypes.find(g => g.id === customization.garmentType);
    const basePrice = baseGarment?.basePrice || 15000;
    
    // Size multiplier
    const sizeMultiplier = customization.modelSize === 'xxxl' ? 1.3 : 
                         customization.modelSize === 'xxl' ? 1.2 : 1.0;
    
    // Fabric price
    const fabricPrice = customization.fabric.price || 0;
    
    // Pattern & embellishment pricing
    const patternPrice = customization.patterns.handwork.length * 3000 + 
                        customization.patterns.prints.length * 1500 +
                        customization.patterns.borders.length * 2000;
    
    const embellishmentPrice = Object.values(customization.embellishments)
      .filter(val => typeof val === 'boolean' && val).length * 2500;
    
    return Math.round((basePrice * sizeMultiplier) + fabricPrice + patternPrice + embellishmentPrice);
  };

  const exportDesign = () => {
    const designConfig = {
      id: `design_${Date.now()}`,
      timestamp: new Date().toISOString(),
      customization,
      pricing: {
        basePrice: calculatePrice(),
        breakdown: {
          garment: garmentTypes.find(g => g.id === customization.garmentType)?.basePrice || 0,
          fabric: customization.fabric.price,
          patterns: customization.patterns.handwork.length * 3000,
          embellishments: Object.values(customization.embellishments).filter(Boolean).length * 2500
        }
      },
      metadata: {
        version: "2.0",
        platform: "Srijna Virtual Try-On",
        complexity: garmentTypes.find(g => g.id === customization.garmentType)?.complexity || "basic"
      }
    };

    const dataStr = JSON.stringify(designConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `srijna-design-${customization.garmentType}-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast("Complete design configuration exported!");
  };

  const shareDesign = async () => {
    const shareData = {
      title: `My Custom ${customization.garmentType} Design`,
      text: `Check out my personalized ${customization.garmentType} with custom colors, patterns, and styling!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast("Design link copied to clipboard!");
    }
  };

  const addToCart = () => {
    const price = calculatePrice();
    const garmentName = garmentTypes.find(g => g.id === customization.garmentType)?.name || "Custom Garment";
    
    toast(`${garmentName} added to cart for ₹${price.toLocaleString()}!`);
    setTimeout(() => {
      toast("Redirecting to secure checkout...");
    }, 1000);
    
    // Simulate cart addition
    setTimeout(() => {
      onClose();
    }, 2000);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex">
      {/* Customization Sidebar */}
      <div className="w-96 bg-background overflow-y-auto shadow-luxury">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-luxury-deep">Virtual Try-On Studio</h2>
              <p className="text-sm text-luxury-charcoal">Design your perfect outfit</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-luxury-charcoal">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-luxury-charcoal">
                {Math.round(calculateProgress())}% Complete
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>

          {/* Current Step Content */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">{steps[currentStep].icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-luxury-deep">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-luxury-charcoal">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            {/* Step-specific content */}
            {currentStep === 0 && (
              <div className="space-y-3">
                {garmentTypes.map((garment) => (
                  <Card
                    key={garment.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      customization.garmentType === garment.id ? 'ring-2 ring-luxury-gold bg-luxury-cream' : ''
                    }`}
                    onClick={() => updateCustomization({ garmentType: garment.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{garment.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{garment.name}</h4>
                              <p className="text-sm text-luxury-charcoal">{garment.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">₹{garment.basePrice.toLocaleString()}</p>
                              <Badge variant="outline" className="text-xs">
                                {garment.complexity}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-3">
                {modelSizes.map((size) => (
                  <Card
                    key={size.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      customization.modelSize === size.id ? 'ring-2 ring-luxury-gold bg-luxury-cream' : ''
                    }`}
                    onClick={() => updateCustomization({ modelSize: size.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge variant="outline" className="mb-2">{size.name}</Badge>
                          <p className="text-sm text-luxury-charcoal">{size.description}</p>
                        </div>
                        <div className="text-sm text-luxury-charcoal">
                          <div>Bust: {size.bust}"</div>
                          <div>Waist: {size.waist}"</div>
                          <div>Hips: {size.hips}"</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <FabricSelector
                currentFabric={customization.fabric}
                onFabricChange={(fabric) => updateCustomization({ fabric })}
              />
            )}

            {currentStep === 3 && (
              <ColorStudio
                colors={customization.colors}
                onColorsChange={(colors) => updateCustomization({ colors })}
              />
            )}

            {currentStep === 4 && (
              <PatternDesigner
                patterns={customization.patterns}
                embellishments={customization.embellishments}
                onPatternsChange={(patterns) => updateCustomization({ patterns })}
                onEmbellishmentsChange={(embellishments) => updateCustomization({ embellishments })}
              />
            )}

            {currentStep === 5 && (
              <StyleCustomizer
                garmentType={customization.garmentType}
                styles={customization.styles}
                onStylesChange={(styles) => updateCustomization({ styles })}
              />
            )}

            {currentStep === 6 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-luxury-deep">Design Summary</h4>
                
                <Card className="p-4 bg-luxury-cream/30">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Garment:</span>
                      <span className="text-sm">
                        {garmentTypes.find(g => g.id === customization.garmentType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Size:</span>
                      <span className="text-sm">{customization.modelSize.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fabric:</span>
                      <span className="text-sm">{customization.fabric.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Price:</span>
                      <span className="text-lg font-bold text-luxury-deep">
                        ₹{calculatePrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button onClick={exportDesign} variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button onClick={shareDesign} variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  
                  <Button onClick={addToCart} className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart - ₹{calculatePrice().toLocaleString()}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-luxury-deep hover:bg-luxury-charcoal"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Virtual Mannequin Preview */}
      <div className="flex-1 bg-gradient-rose flex flex-col items-center justify-center p-8">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-luxury-deep mb-2">
            Live Virtual Try-On
          </h3>
          <p className="text-luxury-charcoal">
            Watch your design come to life in real-time
          </p>
        </div>

        <VirtualMannequin
          customization={customization}
          className="max-w-2xl w-full"
        />

        <div className="mt-6 text-center">
          <Badge variant="outline" className="text-luxury-charcoal">
            Real-time 2D layered preview • Advanced fabric rendering
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnStudio;