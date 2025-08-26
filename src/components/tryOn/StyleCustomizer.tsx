import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, Shirt, Users } from "lucide-react";

interface StyleCustomizerProps {
  garmentType: string;
  styles: {
    neckline: string;
    sleeve: string;
    back: string;
    length: string;
    drape: number;
    flare: number;
    extras: string[];
  };
  onStylesChange: (styles: any) => void;
}

export const StyleCustomizer = ({ garmentType, styles, onStylesChange }: StyleCustomizerProps) => {
  
  // Neckline options based on garment type
  const getNecklineOptions = () => {
    const baseOptions = [
      { id: "round", name: "Round", description: "Classic round neckline" },
      { id: "v-neck", name: "V-Neck", description: "Elegant V-shaped neckline" },
      { id: "boat", name: "Boat Neck", description: "Wide horizontal neckline" },
      { id: "sweetheart", name: "Sweetheart", description: "Romantic curved neckline" }
    ];

    if (garmentType === "saree" || garmentType === "lehenga") {
      return [
        ...baseOptions,
        { id: "halter", name: "Halter", description: "Backless halter style" },
        { id: "off-shoulder", name: "Off-Shoulder", description: "Shoulder-baring style" },
        { id: "deep-back", name: "Deep Back", description: "Low back design" }
      ];
    }

    if (garmentType === "kurti" || garmentType === "kurta") {
      return [
        ...baseOptions,
        { id: "mandarin", name: "Mandarin", description: "Stand-up collar" },
        { id: "keyhole", name: "Keyhole", description: "Small front opening" }
      ];
    }

    return baseOptions;
  };

  // Sleeve options
  const getSleeveOptions = () => {
    const baseOptions = [
      { id: "sleeveless", name: "Sleeveless", description: "No sleeves" },
      { id: "cap", name: "Cap Sleeve", description: "Short cap sleeves" },
      { id: "short", name: "Short", description: "Short sleeves" },
      { id: "three-quarter", name: "3/4 Sleeve", description: "Three-quarter length" },
      { id: "full", name: "Full", description: "Full-length sleeves" }
    ];

    if (garmentType === "anarkali" || garmentType === "gown") {
      return [
        ...baseOptions,
        { id: "bell", name: "Bell Sleeve", description: "Flared bell sleeves" },
        { id: "bishop", name: "Bishop", description: "Puffy gathered sleeves" },
        { id: "cold-shoulder", name: "Cold Shoulder", description: "Shoulder cutouts" }
      ];
    }

    return baseOptions;
  };

  // Back design options
  const getBackOptions = () => {
    const baseOptions = [
      { id: "closed", name: "Closed Back", description: "Standard closed back" },
      { id: "keyhole", name: "Keyhole", description: "Small back opening" },
      { id: "deep-v", name: "Deep V", description: "Deep V-back design" }
    ];

    if (garmentType === "saree" || garmentType === "lehenga" || garmentType === "gown") {
      return [
        ...baseOptions,
        { id: "tie-back", name: "Tie-Back", description: "Adjustable tie closure" },
        { id: "lace-up", name: "Lace-Up", description: "Corset-style lacing" },
        { id: "sheer", name: "Sheer Panel", description: "Transparent back panel" },
        { id: "cut-out", name: "Cut-Out", description: "Decorative cutouts" }
      ];
    }

    return baseOptions;
  };

  // Length options based on garment type
  const getLengthOptions = () => {
    if (garmentType === "kurti" || garmentType === "kurta") {
      return [
        { id: "short", name: "Short", description: "Hip length" },
        { id: "regular", name: "Regular", description: "Mid-thigh length" },
        { id: "long", name: "Long", description: "Knee length" },
        { id: "extra-long", name: "Extra Long", description: "Below knee" }
      ];
    }

    if (garmentType === "anarkali") {
      return [
        { id: "short", name: "Short Anarkali", description: "Above knee" },
        { id: "regular", name: "Regular", description: "Knee length" },
        { id: "long", name: "Long", description: "Ankle length" },
        { id: "floor", name: "Floor Length", description: "Floor sweeping" }
      ];
    }

    if (garmentType === "gown") {
      return [
        { id: "cocktail", name: "Cocktail", description: "Knee length" },
        { id: "tea", name: "Tea Length", description: "Mid-calf" },
        { id: "floor", name: "Floor Length", description: "Full length" },
        { id: "train", name: "With Train", description: "Extended train" }
      ];
    }

    return [
      { id: "regular", name: "Regular", description: "Standard length" },
      { id: "long", name: "Long", description: "Extended length" }
    ];
  };

  // Extra style options based on garment type
  const getExtraOptions = () => {
    const commonExtras = [
      { id: "dupatta", name: "Dupatta", description: "Add matching dupatta" },
      { id: "contrast", name: "Contrast Trim", description: "Contrasting border" },
      { id: "tassels", name: "Tassels", description: "Decorative tassels" }
    ];

    if (garmentType === "lehenga") {
      return [
        ...commonExtras,
        { id: "cancan", name: "Cancan", description: "Volume underneath" },
        { id: "trail", name: "Trail", description: "Extended trail" },
        { id: "side-slit", name: "Side Slit", description: "Side opening" }
      ];
    }

    if (garmentType === "saree") {
      return [
        { id: "pre-stitched", name: "Pre-Stitched", description: "Ready-to-wear style" },
        { id: "belt", name: "Waist Belt", description: "Decorative belt" },
        { id: "attached-blouse", name: "Attached Blouse", description: "Connected blouse" }
      ];
    }

    if (garmentType === "anarkali" || garmentType === "gown") {
      return [
        ...commonExtras,
        { id: "jacket", name: "Jacket", description: "Matching jacket/shrug" },
        { id: "cape", name: "Cape", description: "Dramatic cape detail" },
        { id: "belt", name: "Belt", description: "Waist belt" }
      ];
    }

    return commonExtras;
  };

  const updateStyle = (key: string, value: any) => {
    onStylesChange({
      ...styles,
      [key]: value
    });
  };

  const toggleExtra = (extra: string) => {
    const updated = styles.extras.includes(extra)
      ? styles.extras.filter(e => e !== extra)
      : [...styles.extras, extra];
    
    updateStyle('extras', updated);
  };

  const showDrapeSlider = garmentType === "saree" || garmentType === "anarkali";
  const showFlareSlider = garmentType === "lehenga" || garmentType === "anarkali" || garmentType === "gown";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Scissors className="h-5 w-5 text-luxury-deep" />
        <h3 className="text-lg font-semibold text-luxury-deep">Style Customizer</h3>
        <Badge variant="outline" className="ml-auto text-luxury-charcoal">
          {garmentType.charAt(0).toUpperCase() + garmentType.slice(1)} Specific
        </Badge>
      </div>

      <Tabs defaultValue="cut" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cut">Cut & Style</TabsTrigger>
          <TabsTrigger value="fit">Fit & Drape</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
        </TabsList>

        <TabsContent value="cut" className="space-y-6">
          {/* Neckline */}
          <div>
            <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <Shirt className="h-4 w-4" />
              Neckline Style
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {getNecklineOptions().map((option) => (
                <Button
                  key={option.id}
                  variant={styles.neckline === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateStyle('neckline', option.id)}
                  className="text-xs h-auto p-3"
                >
                  <div className="text-center">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs opacity-70 mt-1">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sleeve */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Sleeve Style
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {getSleeveOptions().map((option) => (
                <Button
                  key={option.id}
                  variant={styles.sleeve === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateStyle('sleeve', option.id)}
                  className="text-xs h-auto p-3"
                >
                  <div className="text-center">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs opacity-70 mt-1">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Back Design */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Back Design
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {getBackOptions().map((option) => (
                <Button
                  key={option.id}
                  variant={styles.back === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateStyle('back', option.id)}
                  className="text-xs justify-start h-auto p-3"
                >
                  <div className="text-left">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs opacity-70 mt-1">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Length */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Length
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {getLengthOptions().map((option) => (
                <Button
                  key={option.id}
                  variant={styles.length === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateStyle('length', option.id)}
                  className="text-xs h-auto p-3"
                >
                  <div className="text-center">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs opacity-70 mt-1">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fit" className="space-y-6">
          {/* Drape Slider */}
          {showDrapeSlider && (
            <div>
              <Label className="text-sm font-medium mb-3 block">
                {garmentType === "saree" ? "Pallu Drape" : "Drape Style"}: {styles.drape}%
              </Label>
              <Slider
                value={[styles.drape]}
                onValueChange={(value) => updateStyle('drape', value[0])}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-luxury-charcoal mt-2">
                <span>Minimal</span>
                <span>Flowing</span>
                <span>Dramatic</span>
              </div>
            </div>
          )}

          {/* Flare Slider */}
          {showFlareSlider && (
            <div>
              <Label className="text-sm font-medium mb-3 block">
                {garmentType === "lehenga" ? "Lehenga Flare" : "Flare Amount"}: {styles.flare}%
              </Label>
              <Slider
                value={[styles.flare]}
                onValueChange={(value) => updateStyle('flare', value[0])}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-luxury-charcoal mt-2">
                <span>Straight</span>
                <span>A-Line</span>
                <span>Full Circle</span>
              </div>
            </div>
          )}

          {/* Fit Information */}
          <Card className="p-4 bg-luxury-cream/30">
            <h6 className="font-semibold text-luxury-deep mb-2">Fit Notes</h6>
            <div className="text-sm text-luxury-charcoal space-y-1">
              {garmentType === "saree" && (
                <p>• Traditional drape with modern styling options</p>
              )}
              {garmentType === "lehenga" && (
                <p>• Flare affects the overall silhouette and volume</p>
              )}
              {garmentType === "anarkali" && (
                <p>• Balance between fitted bodice and flowing skirt</p>
              )}
              <p>• All measurements are customizable during fitting</p>
              <p>• Professional tailoring ensures perfect fit</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="extras" className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <Users className="h-4 w-4" />
              Additional Elements
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {getExtraOptions().map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    styles.extras.includes(option.id) 
                      ? 'ring-2 ring-luxury-gold bg-luxury-cream' 
                      : ''
                  }`}
                  onClick={() => toggleExtra(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h6 className="font-semibold">{option.name}</h6>
                        <p className="text-sm text-luxury-charcoal">{option.description}</p>
                      </div>
                      {styles.extras.includes(option.id) && (
                        <Badge variant="default" className="text-xs">
                          Added
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Extras Summary */}
          {styles.extras.length > 0 && (
            <Card className="p-4 bg-luxury-cream/30 border-luxury-gold">
              <h6 className="font-semibold mb-3 text-center">Selected Extras</h6>
              <div className="flex flex-wrap gap-2 justify-center">
                {styles.extras.map((extra) => {
                  const option = getExtraOptions().find(opt => opt.id === extra);
                  return (
                    <Badge key={extra} variant="secondary" className="text-xs">
                      {option?.name}
                    </Badge>
                  );
                })}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Style Summary */}
      <Card className="p-4 bg-luxury-cream/50 border-luxury-gold">
        <h6 className="font-semibold text-center mb-3">Current Style Configuration</h6>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-luxury-charcoal">Neckline:</span>
            <span className="font-medium capitalize">{styles.neckline.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-luxury-charcoal">Sleeve:</span>
            <span className="font-medium capitalize">{styles.sleeve.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-luxury-charcoal">Back:</span>
            <span className="font-medium capitalize">{styles.back.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-luxury-charcoal">Length:</span>
            <span className="font-medium capitalize">{styles.length.replace('-', ' ')}</span>
          </div>
          {showDrapeSlider && (
            <div className="flex justify-between">
              <span className="text-luxury-charcoal">Drape:</span>
              <span className="font-medium">{styles.drape}%</span>
            </div>
          )}
          {showFlareSlider && (
            <div className="flex justify-between">
              <span className="text-luxury-charcoal">Flare:</span>
              <span className="font-medium">{styles.flare}%</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};