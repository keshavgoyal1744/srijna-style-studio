import { useState, useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface CustomizationStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizationStudio = ({ isOpen, onClose }: CustomizationStudioProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    garmentType: "",
    modelSize: "",
    fabric: "",
    color: "",
    design: "",
    extras: []
  });

  const steps = [
    "Choose Garment",
    "Model Size", 
    "Fabric & Color",
    "Design Pattern",
    "Customizations",
    "Preview"
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
    { id: "xs", name: "XS", description: "Extra Small (32-34)" },
    { id: "s", name: "S", description: "Small (34-36)" },
    { id: "m", name: "M", description: "Medium (36-38)" },
    { id: "l", name: "L", description: "Large (38-40)" },
    { id: "xl", name: "XL", description: "Extra Large (40-42)" },
    { id: "xxl", name: "XXL", description: "Double XL (42-44)" }
  ];

  const fabrics = [
    { id: "silk", name: "Silk", colors: ["#8B0000", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"] },
    { id: "cotton", name: "Cotton", colors: ["#F4F4F4", "#FFE4E1", "#E6E6FA", "#F0F8FF", "#FFF8DC"] },
    { id: "chiffon", name: "Chiffon", colors: ["#FF69B4", "#DDA0DD", "#98FB98", "#F0E68C", "#FFB6C1"] },
    { id: "georgette", name: "Georgette", colors: ["#DC143C", "#FF1493", "#00CED1", "#32CD32", "#FF8C00"] },
    { id: "crepe", name: "Crepe", colors: ["#2F4F4F", "#8FBC8F", "#D2691E", "#CD853F", "#A0522D"] }
  ];

  const designs = [
    { id: "zari", name: "Zari Work", preview: "🌟" },
    { id: "mirror", name: "Mirror Work", preview: "✨" },
    { id: "floral", name: "Floral Print", preview: "🌸" },
    { id: "paisley", name: "Paisley", preview: "🌀" },
    { id: "embroidery", name: "Hand Embroidery", preview: "🧵" },
    { id: "sequin", name: "Sequin Work", preview: "💎" }
  ];

  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: "#f8f9fa",
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!fabricCanvas) return;
    updatePreview();
  }, [selections, fabricCanvas]);

  const updatePreview = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.clear();
    
    // Base garment shape
    if (selections.garmentType) {
      const baseShape = new Rect({
        left: 150,
        top: 100,
        width: 100,
        height: 200,
        fill: selections.color || "#e0e0e0",
        rx: 10,
        ry: 10,
        selectable: false
      });
      fabricCanvas.add(baseShape);
    }

    // Add design pattern overlay
    if (selections.design && selections.color) {
      const pattern = new Rect({
        left: 160,
        top: 120,
        width: 80,
        height: 50,
        fill: `${selections.color}88`,
        opacity: 0.7,
        selectable: false
      });
      fabricCanvas.add(pattern);
    }

    fabricCanvas.renderAll();
  };

  const handleSelection = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    toast(`Selected ${value}`);
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

  const addToCart = () => {
    toast("Added to cart! Redirecting to checkout...");
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
              <h3 className="text-lg font-semibold mb-4">Choose Fabric & Color</h3>
              {fabrics.map((fabric) => (
                <div key={fabric.id} className="mb-4">
                  <h4 className="font-medium mb-2">{fabric.name}</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {fabric.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-12 h-12 rounded-lg cursor-pointer border-2 transition-all ${
                          selections.color === color ? 'border-luxury-gold scale-110' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          handleSelection('fabric', fabric.id);
                          handleSelection('color', color);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Design Pattern</h3>
              <div className="grid grid-cols-2 gap-3">
                {designs.map((design) => (
                  <Card 
                    key={design.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selections.design === design.id ? 'ring-2 ring-luxury-gold bg-luxury-cream' : ''
                    }`}
                    onClick={() => handleSelection('design', design.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{design.preview}</div>
                      <h4 className="font-semibold text-sm">{design.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Customizations</h3>
              <div className="space-y-3">
                <Card className="p-3">
                  <h4 className="font-medium">Neckline Style</h4>
                  <div className="flex gap-2 mt-2">
                    {["Round", "V-Neck", "Boat", "High"].map((style) => (
                      <Badge key={style} variant="outline" className="cursor-pointer hover:bg-luxury-cream">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </Card>
                <Card className="p-3">
                  <h4 className="font-medium">Sleeve Type</h4>
                  <div className="flex gap-2 mt-2">
                    {["Full", "3/4", "Half", "Sleeveless"].map((style) => (
                      <Badge key={style} variant="outline" className="cursor-pointer hover:bg-luxury-cream">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Selections</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Garment:</strong> {selections.garmentType}</p>
                <p><strong>Size:</strong> {selections.modelSize}</p>
                <p><strong>Fabric:</strong> {selections.fabric}</p>
                <p><strong>Design:</strong> {selections.design}</p>
              </div>
              <Button onClick={addToCart} className="w-full mt-4" variant="luxury">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ₹15,000
              </Button>
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
        <h3 className="text-2xl font-bold text-luxury-deep mb-6">Live Preview</h3>
        <Card className="p-6 bg-background shadow-luxury">
          <canvas ref={canvasRef} className="border border-luxury-rose rounded-lg" />
        </Card>
        <p className="text-luxury-charcoal mt-4 text-center max-w-md">
          Watch your creation come to life! Each selection updates the preview in real-time.
        </p>
      </div>
    </div>
  );
};

export default CustomizationStudio;