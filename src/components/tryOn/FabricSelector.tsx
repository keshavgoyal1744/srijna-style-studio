import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FabricSelectorProps {
  currentFabric: {
    type: string;
    texture: string;
    drape: string;
    price: number;
  };
  onFabricChange: (fabric: { type: string; texture: string; drape: string; price: number }) => void;
}

export const FabricSelector = ({ currentFabric, onFabricChange }: FabricSelectorProps) => {
  const fabrics = [
    {
      type: "silk",
      name: "Pure Silk",
      texture: "smooth",
      drape: "fluid",
      price: 8000,
      description: "Luxurious silk with natural sheen",
      icon: "🌟",
      weight: "Medium",
      care: "Dry clean only"
    },
    {
      type: "cotton",
      name: "Premium Cotton",
      texture: "soft",
      drape: "structured",
      price: 3000,
      description: "Breathable cotton with comfort",
      icon: "🌿",
      weight: "Light",
      care: "Machine washable"
    },
    {
      type: "chiffon",
      name: "Designer Chiffon",
      texture: "delicate",
      drape: "flowing",
      price: 5500,
      description: "Ethereal chiffon with movement",
      icon: "💨",
      weight: "Ultra Light",
      care: "Hand wash preferred"
    },
    {
      type: "georgette",
      name: "Elegant Georgette",
      texture: "textured",
      drape: "graceful",
      price: 6000,
      description: "Refined georgette with body",
      icon: "✨",
      weight: "Light-Medium",
      care: "Gentle wash"
    },
    {
      type: "crepe",
      name: "Rich Crepe",
      texture: "crinkled",
      drape: "structured",
      price: 4500,
      description: "Sophisticated crepe finish",
      icon: "🔮",
      weight: "Medium",
      care: "Dry clean recommended"
    },
    {
      type: "velvet",
      name: "Luxury Velvet",
      texture: "plush",
      drape: "heavy",
      price: 12000,
      description: "Opulent velvet with richness",
      icon: "👑",
      weight: "Heavy",
      care: "Professional clean only"
    },
    {
      type: "brocade",
      name: "Ornate Brocade",
      texture: "embossed",
      drape: "structured",
      price: 15000,
      description: "Regal brocade with patterns",
      icon: "🏺",
      weight: "Heavy",
      care: "Specialist care"
    },
    {
      type: "organza",
      name: "Sheer Organza",
      texture: "crisp",
      drape: "stiff",
      price: 7000,
      description: "Transparent organza with structure",
      icon: "🦋",
      weight: "Light",
      care: "Delicate wash"
    },
    {
      type: "net",
      name: "Embellished Net",
      texture: "mesh",
      drape: "structured",
      price: 9000,
      description: "Decorative net with embellishments",
      icon: "🕸️",
      weight: "Light",
      care: "Hand wash only"
    },
    {
      type: "satin",
      name: "Glossy Satin",
      texture: "glossy",
      drape: "fluid",
      price: 6500,
      description: "Lustrous satin with drape",
      icon: "💎",
      weight: "Medium",
      care: "Dry clean preferred"
    }
  ];

  const fabricCategories = [
    {
      name: "Traditional",
      fabrics: ["silk", "brocade", "cotton"]
    },
    {
      name: "Contemporary", 
      fabrics: ["georgette", "crepe", "satin"]
    },
    {
      name: "Ethereal",
      fabrics: ["chiffon", "organza", "net"]
    },
    {
      name: "Luxury",
      fabrics: ["velvet", "brocade", "silk"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-luxury-deep mb-2">
          Choose Your Fabric
        </h4>
        <p className="text-sm text-luxury-charcoal">
          Each fabric brings unique drape, texture, and elegance
        </p>
      </div>

      {/* Fabric Categories */}
      <div className="space-y-4">
        {fabricCategories.map((category) => (
          <div key={category.name}>
            <h5 className="font-medium text-luxury-charcoal mb-3 flex items-center">
              <div className="w-2 h-2 bg-luxury-gold rounded-full mr-2"></div>
              {category.name} Collection
            </h5>
            
            <div className="grid grid-cols-1 gap-3">
              {fabrics
                .filter(fabric => category.fabrics.includes(fabric.type))
                .map((fabric) => (
                  <Card
                    key={fabric.type}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      currentFabric.type === fabric.type 
                        ? 'ring-2 ring-luxury-gold bg-luxury-cream' 
                        : 'hover:bg-luxury-cream/30'
                    }`}
                    onClick={() => onFabricChange({
                      type: fabric.type,
                      texture: fabric.texture,
                      drape: fabric.drape,
                      price: fabric.price
                    })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-2xl">{fabric.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h6 className="font-semibold text-luxury-deep">
                                {fabric.name}
                              </h6>
                              <Badge variant="outline" className="text-xs">
                                {fabric.weight}
                              </Badge>
                            </div>
                            <p className="text-sm text-luxury-charcoal mb-2">
                              {fabric.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {fabric.texture} texture
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {fabric.drape} drape
                              </Badge>
                            </div>
                            <p className="text-xs text-luxury-charcoal/70 mt-1">
                              Care: {fabric.care}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-luxury-deep">
                            +₹{fabric.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-luxury-charcoal">
                            fabric cost
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            
            {category !== fabricCategories[fabricCategories.length - 1] && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}
      </div>

      {/* Selected Fabric Summary */}
      {currentFabric.type && (
        <Card className="p-4 bg-luxury-cream/50 border-luxury-gold">
          <div className="text-center">
            <h6 className="font-semibold text-luxury-deep mb-2">
              Selected Fabric
            </h6>
            <div className="flex justify-center items-center gap-4">
              <div className="text-2xl">
                {fabrics.find(f => f.type === currentFabric.type)?.icon}
              </div>
              <div>
                <p className="font-medium">
                  {fabrics.find(f => f.type === currentFabric.type)?.name}
                </p>
                <div className="flex gap-2 text-xs text-luxury-charcoal mt-1">
                  <span>{currentFabric.texture} • {currentFabric.drape}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-luxury-deep">
                  +₹{currentFabric.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};