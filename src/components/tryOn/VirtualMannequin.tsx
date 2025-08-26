import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Image as FabricImage, Rect, Circle, Path } from "fabric";
import { CustomizationState } from "../VirtualTryOnStudio";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface VirtualMannequinProps {
  customization: CustomizationState;
  className?: string;
}

export const VirtualMannequin = ({ customization, className }: VirtualMannequinProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 800,
      backgroundColor: "#f8f9fa",
      preserveObjectStacking: true,
    });

    setFabricCanvas(canvas);
    setIsLoading(false);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Update mannequin and garment based on customization
  useEffect(() => {
    if (!fabricCanvas || isLoading) return;

    updateMannequinDisplay();
  }, [fabricCanvas, customization, isLoading]);

  const updateMannequinDisplay = async () => {
    if (!fabricCanvas) return;

    try {
      // Clear canvas
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "#f8f9fa";

      // Render mannequin base
      await renderMannequinBase();
      
      // Render garment if selected
      if (customization.garmentType) {
        await renderGarment();
      }

      fabricCanvas.renderAll();
    } catch (error) {
      console.error("Error updating mannequin display:", error);
    }
  };

  const renderMannequinBase = async () => {
    if (!fabricCanvas) return;

    // Create a simple mannequin silhouette based on size
    const sizeMultiplier = getSizeMultiplier(customization.modelSize);
    
    // Body base (torso)
    const torso = new Rect({
      left: 250 - (40 * sizeMultiplier),
      top: 150,
      width: 80 * sizeMultiplier,
      height: 200 * sizeMultiplier,
      fill: "#e8e8e8",
      stroke: "#d0d0d0",
      strokeWidth: 1,
      rx: 15,
      ry: 15,
      selectable: false,
      evented: false
    });

    // Head
    const head = new Circle({
      left: 275 - (20 * sizeMultiplier),
      top: 80,
      radius: 35 * sizeMultiplier,
      fill: "#e8e8e8",
      stroke: "#d0d0d0",
      strokeWidth: 1,
      selectable: false,
      evented: false
    });

    // Arms
    const leftArm = new Rect({
      left: 180 - (20 * sizeMultiplier),
      top: 160,
      width: 70 * sizeMultiplier,
      height: 25 * sizeMultiplier,
      fill: "#e8e8e8",
      stroke: "#d0d0d0",
      strokeWidth: 1,
      rx: 12,
      selectable: false,
      evented: false
    });

    const rightArm = new Rect({
      left: 350,
      top: 160,
      width: 70 * sizeMultiplier,
      height: 25 * sizeMultiplier,
      fill: "#e8e8e8",
      stroke: "#d0d0d0",
      strokeWidth: 1,
      rx: 12,
      selectable: false,
      evented: false
    });

    // Legs
    const leftLeg = new Rect({
      left: 260 - (15 * sizeMultiplier),
      top: 350,
      width: 30 * sizeMultiplier,
      height: 180 * sizeMultiplier,
      fill: "#e8e8e8",
      stroke: "#d0d0d0",
      strokeWidth: 1,
      rx: 15,
      selectable: false,
      evented: false
    });

    const rightLeg = new Rect({
      left: 310,
      top: 350,
      width: 30 * sizeMultiplier,
      height: 180 * sizeMultiplier,
      fill: "#e8e8e8",
      stroke: "#d0d0d0",
      strokeWidth: 1,
      rx: 15,
      selectable: false,
      evented: false
    });

    fabricCanvas.add(torso, head, leftArm, rightArm, leftLeg, rightLeg);
  };

  const renderGarment = async () => {
    if (!fabricCanvas) return;

    const sizeMultiplier = getSizeMultiplier(customization.modelSize);
    
    switch (customization.garmentType) {
      case "saree":
        await renderSaree(sizeMultiplier);
        break;
      case "lehenga":
        await renderLehenga(sizeMultiplier);
        break;
      case "anarkali":
        await renderAnarkali(sizeMultiplier);
        break;
      case "kurta":
        await renderKurtaSet(sizeMultiplier);
        break;
      case "gown":
        await renderGown(sizeMultiplier);
        break;
      case "kurti":
        await renderKurti(sizeMultiplier);
        break;
    }

    // Apply fabric texture if selected
    if (customization.fabric.type) {
      await applyFabricTexture();
    }

    // Apply colors
    await applyColors();

    // Apply patterns and embellishments
    if (customization.patterns.handwork.length > 0 || customization.patterns.prints.length > 0) {
      await applyPatterns();
    }

    // Apply style modifications
    await applyStyleModifications();
  };

  const renderSaree = async (sizeMultiplier: number) => {
    if (!fabricCanvas) return;

    // Blouse
    const blouse = new Rect({
      left: 240 - (30 * sizeMultiplier),
      top: 150,
      width: 120 * sizeMultiplier,
      height: 80 * sizeMultiplier,
      fill: customization.colors.primary,
      stroke: customization.colors.border,
      strokeWidth: 2,
      rx: 8,
      selectable: false,
      evented: false
    });

    // Saree drape (main body)
    const sareerDrape = new Rect({
      left: 230 - (40 * sizeMultiplier),
      top: 220,
      width: 140 * sizeMultiplier,
      height: 300 * sizeMultiplier,
      fill: customization.colors.secondary,
      stroke: customization.colors.border,
      strokeWidth: 1,
      rx: 5,
      opacity: 0.9,
      selectable: false,
      evented: false
    });

    // Pallu (shoulder drape)
    const pallu = new Path(
      `M ${280} 160 Q ${200} 120 ${180} 200 Q ${190} 280 ${250} 300 Q ${280} 250 ${280} 160`,
      {
        fill: customization.colors.accent,
        stroke: customization.colors.border,
        strokeWidth: 1,
        opacity: 0.8,
        selectable: false,
        evented: false
      }
    );

    fabricCanvas.add(sareerDrape, blouse, pallu);
  };

  const renderLehenga = async (sizeMultiplier: number) => {
    if (!fabricCanvas) return;

    // Choli (blouse)
    const choli = new Rect({
      left: 245 - (25 * sizeMultiplier),
      top: 150,
      width: 110 * sizeMultiplier,
      height: 90 * sizeMultiplier,
      fill: customization.colors.primary,
      stroke: customization.colors.border,
      strokeWidth: 2,
      rx: 8,
      selectable: false,
      evented: false
    });

    // Lehenga skirt with flare
    const flareAmount = customization.styles.flare / 100;
    const skirtWidth = 160 * sizeMultiplier * (1 + flareAmount * 0.5);
    
    const lehenga = new Path(
      `M ${300 - skirtWidth/2} 240 L ${300 + skirtWidth/2} 240 Q ${300 + skirtWidth/2 + 20} 400 ${300 + skirtWidth/2 + 40} 550 L ${300 - skirtWidth/2 - 40} 550 Q ${300 - skirtWidth/2 - 20} 400 ${300 - skirtWidth/2} 240`,
      {
        fill: customization.colors.secondary,
        stroke: customization.colors.border,
        strokeWidth: 1,
        selectable: false,
        evented: false
      }
    );

    // Dupatta
    const dupatta = new Path(
      `M ${280} 160 Q ${200} 120 ${180} 200 Q ${190} 280 ${250} 300 Q ${400} 320 ${420} 200 Q ${400} 120 ${320} 160`,
      {
        fill: customization.colors.accent,
        stroke: customization.colors.border,
        strokeWidth: 1,
        opacity: 0.7,
        selectable: false,
        evented: false
      }
    );

    fabricCanvas.add(lehenga, choli, dupatta);
  };

  const renderAnarkali = async (sizeMultiplier: number) => {
    if (!fabricCanvas) return;

    const flareAmount = customization.styles.flare / 100;
    const anarkaliWidth = 120 * sizeMultiplier * (1 + flareAmount * 0.3);
    
    const anarkali = new Path(
      `M ${300 - anarkaliWidth/2} 150 L ${300 + anarkaliWidth/2} 150 Q ${300 + anarkaliWidth/2 + 10} 300 ${300 + anarkaliWidth/2 + 30} 500 L ${300 - anarkaliWidth/2 - 30} 500 Q ${300 - anarkaliWidth/2 - 10} 300 ${300 - anarkaliWidth/2} 150`,
      {
        fill: customization.colors.primary,
        stroke: customization.colors.border,
        strokeWidth: 1,
        selectable: false,
        evented: false
      }
    );

    fabricCanvas.add(anarkali);
  };

  const renderKurtaSet = async (sizeMultiplier: number) => {
    if (!fabricCanvas) return;

    // Kurta
    const kurta = new Rect({
      left: 240 - (35 * sizeMultiplier),
      top: 150,
      width: 130 * sizeMultiplier,
      height: 200 * sizeMultiplier,
      fill: customization.colors.primary,
      stroke: customization.colors.border,
      strokeWidth: 1,
      rx: 5,
      selectable: false,
      evented: false
    });

    // Pants/Salwar
    const pants = new Rect({
      left: 250 - (30 * sizeMultiplier),
      top: 340,
      width: 100 * sizeMultiplier,
      height: 180 * sizeMultiplier,
      fill: customization.colors.secondary,
      stroke: customization.colors.border,
      strokeWidth: 1,
      rx: 5,
      selectable: false,
      evented: false
    });

    fabricCanvas.add(kurta, pants);
  };

  const renderGown = async (sizeMultiplier: number) => {
    if (!fabricCanvas) return;

    const gown = new Path(
      `M ${270} 150 L ${330} 150 Q ${360} 200 ${380} 300 Q ${390} 450 ${400} 550 L ${200} 550 Q ${210} 450 ${220} 300 Q ${240} 200 ${270} 150`,
      {
        fill: customization.colors.primary,
        stroke: customization.colors.border,
        strokeWidth: 1,
        selectable: false,
        evented: false
      }
    );

    fabricCanvas.add(gown);
  };

  const renderKurti = async (sizeMultiplier: number) => {
    if (!fabricCanvas) return;

    const kurti = new Rect({
      left: 240 - (35 * sizeMultiplier),
      top: 150,
      width: 130 * sizeMultiplier,
      height: 160 * sizeMultiplier,
      fill: customization.colors.primary,
      stroke: customization.colors.border,
      strokeWidth: 1,
      rx: 8,
      selectable: false,
      evented: false
    });

    fabricCanvas.add(kurti);
  };

  const applyFabricTexture = async () => {
    // Simulate fabric texture with pattern overlays
    if (!fabricCanvas) return;

    const fabricPattern = getFabricPattern(customization.fabric.type);
    if (fabricPattern) {
      // Apply texture overlay to all garment pieces
      const objects = fabricCanvas.getObjects();
      objects.forEach(obj => {
        if (obj.fill && typeof obj.fill === 'string') {
          // Add subtle pattern overlay
          obj.set('stroke', customization.colors.border);
          obj.set('strokeDashArray', fabricPattern.dash);
        }
      });
    }
  };

  const applyColors = async () => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    objects.forEach((obj, index) => {
      if (obj.fill && typeof obj.fill === 'string' && obj.fill !== "#e8e8e8") {
        // Apply colors based on object index and type
        if (index % 3 === 0) obj.set('fill', customization.colors.primary);
        else if (index % 3 === 1) obj.set('fill', customization.colors.secondary);
        else obj.set('fill', customization.colors.accent);
      }
    });
  };

  const applyPatterns = async () => {
    if (!fabricCanvas) return;

    // Add pattern overlays
    customization.patterns.handwork.forEach((pattern, index) => {
      const patternElement = createPatternElement(pattern, index);
      if (patternElement) {
        fabricCanvas.add(patternElement);
      }
    });

    customization.patterns.prints.forEach((print, index) => {
      const printElement = createPrintElement(print, index);
      if (printElement) {
        fabricCanvas.add(printElement);
      }
    });
  };

  const applyStyleModifications = async () => {
    if (!fabricCanvas) return;

    // Apply neckline changes
    if (customization.styles.neckline !== "round") {
      // Modify neckline of existing garment pieces
      // This would involve path manipulation in a real implementation
    }

    // Apply sleeve modifications
    if (customization.styles.sleeve !== "half") {
      // Modify sleeve appearance
    }
  };

  const getSizeMultiplier = (size: string): number => {
    const multipliers: { [key: string]: number } = {
      xs: 0.8,
      s: 0.9,
      m: 1.0,
      l: 1.1,
      xl: 1.2,
      xxl: 1.3,
      xxxl: 1.4
    };
    return multipliers[size] || 1.0;
  };

  const getFabricPattern = (fabricType: string) => {
    const patterns: { [key: string]: { dash: number[] } } = {
      silk: { dash: [] },
      cotton: { dash: [2, 2] },
      chiffon: { dash: [1, 3] },
      georgette: { dash: [3, 1] },
      velvet: { dash: [] },
      brocade: { dash: [5, 2, 1, 2] }
    };
    return patterns[fabricType];
  };

  const createPatternElement = (pattern: string, index: number) => {
    const x = 280 + (index * 30);
    const y = 200 + (index * 40);

    switch (pattern) {
      case "zari":
        return new Circle({
          left: x,
          top: y,
          radius: 3,
          fill: customization.colors.border,
          opacity: 0.8,
          selectable: false,
          evented: false
        });
      case "sequins":
        return new Circle({
          left: x,
          top: y,
          radius: 2,
          fill: "#FFD700",
          opacity: 0.9,
          selectable: false,
          evented: false
        });
      default:
        return null;
    }
  };

  const createPrintElement = (print: string, index: number) => {
    const x = 260 + (index * 25);
    const y = 180 + (index * 35);

    switch (print) {
      case "floral":
        return new Circle({
          left: x,
          top: y,
          radius: 8,
          fill: customization.colors.accent,
          opacity: 0.6,
          selectable: false,
          evented: false
        });
      case "paisley":
        return new Path(
          `M ${x} ${y} Q ${x + 10} ${y - 5} ${x + 15} ${y + 10} Q ${x + 5} ${y + 15} ${x} ${y}`,
          {
            fill: customization.colors.accent,
            opacity: 0.7,
            selectable: false,
            evented: false
          }
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card className={`${className} p-8 flex items-center justify-center`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-luxury-deep" />
          <p className="text-luxury-charcoal">Loading virtual mannequin...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${className} p-6 bg-white shadow-luxury`}>
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border border-luxury-cream rounded-lg shadow-elegant"
        />
        <div className="mt-4 text-center">
          <p className="text-sm text-luxury-charcoal">
            {customization.garmentType
              ? `${customization.garmentType.charAt(0).toUpperCase() + customization.garmentType.slice(1)} - Size ${customization.modelSize.toUpperCase()}`
              : "Select a garment to begin customization"
            }
          </p>
        </div>
      </div>
    </Card>
  );
};