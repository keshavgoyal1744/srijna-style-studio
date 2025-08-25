import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Path } from "fabric";

interface CanvasLayer {
  id: string;
  type: 'background' | 'model' | 'garment' | 'fabric' | 'color' | 'pattern' | 'embellishment' | 'border' | 'style';
  visible: boolean;
  opacity: number;
  zIndex: number;
}

interface EnhancedCanvasProps {
  garmentType: string;
  modelSize: string;
  fabric: string;
  colors: {
    primary: string;
    secondary: string;
    border: string;
  };
  patterns: {
    handwork: string[];
    patterns: string[];
    borders: string[];
    opacity: number;
    scale: number;
  };
  styles: {
    neckline: string;
    sleeve: string;
    back: string;
    drape: number;
    flare: number;
  };
}

export const EnhancedCanvas = ({
  garmentType,
  modelSize,
  fabric,
  colors,
  patterns,
  styles
}: EnhancedCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [layers, setLayers] = useState<CanvasLayer[]>([
    { id: 'background', type: 'background', visible: true, opacity: 1, zIndex: 0 },
    { id: 'model', type: 'model', visible: true, opacity: 1, zIndex: 1 },
    { id: 'garment', type: 'garment', visible: true, opacity: 1, zIndex: 2 },
    { id: 'fabric', type: 'fabric', visible: true, opacity: 1, zIndex: 3 },
    { id: 'color', type: 'color', visible: true, opacity: 0.8, zIndex: 4 },
    { id: 'pattern', type: 'pattern', visible: true, opacity: 0.7, zIndex: 5 },
    { id: 'embellishment', type: 'embellishment', visible: true, opacity: 0.9, zIndex: 6 },
    { id: 'border', type: 'border', visible: true, opacity: 1, zIndex: 7 },
    { id: 'style', type: 'style', visible: true, opacity: 1, zIndex: 8 }
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: "#f8f9fa",
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;
    renderLayers();
  }, [fabricCanvas, garmentType, modelSize, fabric, colors, patterns, styles]);

  const renderLayers = () => {
    if (!fabricCanvas) return;

    fabricCanvas.clear();
    
    // Layer 1: Background
    renderBackground();
    
    // Layer 2: Model Avatar
    renderModel();
    
    // Layer 3: Garment Base
    renderGarmentBase();
    
    // Layer 4: Fabric Texture
    renderFabricTexture();
    
    // Layer 5: Color Overlay
    renderColorOverlay();
    
    // Layer 6: Patterns
    renderPatterns();
    
    // Layer 7: Embellishments
    renderEmbellishments();
    
    // Layer 8: Borders
    renderBorders();
    
    // Layer 9: Style Elements
    renderStyleElements();

    fabricCanvas.renderAll();
  };

  const renderBackground = () => {
    const bgRect = new Rect({
      left: 0,
      top: 0,
      width: 400,
      height: 500,
      fill: colors.primary + '0A',
      selectable: false
    });
    fabricCanvas?.add(bgRect);
  };

  const renderModel = () => {
    // Model silhouette based on size
    const sizeMultipliers = {
      'xs': 0.85, 's': 0.9, 'm': 1.0, 'l': 1.1, 'xl': 1.2, 'xxl': 1.3, 'xxxl': 1.4
    };
    
    const multiplier = sizeMultipliers[modelSize as keyof typeof sizeMultipliers] || 1.0;
    
    const modelShape = new Rect({
      left: 150,
      top: 80,
      width: 100 * multiplier,
      height: 300 * multiplier,
      fill: '#f5f5f5',
      rx: 20,
      ry: 20,
      selectable: false,
      opacity: 0.3
    });
    
    fabricCanvas?.add(modelShape);
  };

  const renderGarmentBase = () => {
    if (!garmentType) return;
    
    const garmentShapes = {
      saree: () => createSareeShape(),
      lehenga: () => createLehengaShape(),
      anarkali: () => createAnarkaliShape(),
      kurta: () => createKurtaShape(),
      gown: () => createGownShape(),
      kurti: () => createKurtiShape()
    };

    const shapeCreator = garmentShapes[garmentType as keyof typeof garmentShapes];
    if (shapeCreator) {
      const shape = shapeCreator();
      fabricCanvas?.add(shape);
    }
  };

  const createSareeShape = () => {
    // Saree draping simulation
    const blouse = new Rect({
      left: 160,
      top: 120,
      width: 80,
      height: 60,
      fill: colors.primary,
      rx: 5,
      selectable: false
    });

    const saree = new Path('M 140 180 Q 200 180 260 180 Q 280 200 270 250 Q 260 300 200 350 L 140 350 Z', {
      fill: colors.primary,
      selectable: false,
      opacity: 0.8
    });

    fabricCanvas?.add(blouse);
    return saree;
  };

  const createLehengaShape = () => {
    const blouse = new Rect({
      left: 160,
      top: 120,
      width: 80,
      height: 60,
      fill: colors.primary,
      rx: 5,
      selectable: false
    });

    const lehenga = new Path('M 130 180 Q 200 180 270 180 Q 290 220 285 280 Q 280 340 275 400 L 125 400 Q 120 340 125 280 Q 130 220 130 180 Z', {
      fill: colors.primary,
      selectable: false,
      opacity: 0.9
    });

    fabricCanvas?.add(blouse);
    return lehenga;
  };

  const createAnarkaliShape = () => {
    return new Path('M 150 120 L 250 120 Q 260 140 255 180 Q 250 220 245 260 Q 240 300 235 340 Q 230 380 225 420 L 175 420 Q 170 380 165 340 Q 160 300 155 260 Q 150 220 145 180 Q 140 140 150 120 Z', {
      fill: colors.primary,
      selectable: false
    });
  };

  const createKurtaShape = () => {
    return new Rect({
      left: 150,
      top: 120,
      width: 100,
      height: 200,
      fill: colors.primary,
      rx: 10,
      ry: 10,
      selectable: false
    });
  };

  const createGownShape = () => {
    return new Path('M 160 120 L 240 120 Q 250 140 245 180 Q 240 220 235 260 Q 230 300 225 340 Q 220 380 215 420 L 185 420 Q 180 380 175 340 Q 170 300 165 260 Q 160 220 155 180 Q 150 140 160 120 Z', {
      fill: colors.primary,
      selectable: false
    });
  };

  const createKurtiShape = () => {
    return new Rect({
      left: 160,
      top: 120,
      width: 80,
      height: 150,
      fill: colors.primary,
      rx: 8,
      ry: 8,
      selectable: false
    });
  };

  const renderFabricTexture = () => {
    // Simulate fabric texture with subtle patterns
    if (fabric) {
      const texturePattern = new Rect({
        left: 150,
        top: 120,
        width: 100,
        height: 200,
        fill: `${colors.primary}20`,
        selectable: false,
        opacity: 0.3
      });
      fabricCanvas?.add(texturePattern);
    }
  };

  const renderColorOverlay = () => {
    // Primary color overlay
    const primaryOverlay = new Rect({
      left: 150,
      top: 120,
      width: 100,
      height: 200,
      fill: colors.primary,
      selectable: false,
      opacity: 0.7
    });
    fabricCanvas?.add(primaryOverlay);

    // Secondary color accents
    if (colors.secondary !== colors.primary) {
      const secondaryAccent = new Rect({
        left: 160,
        top: 130,
        width: 80,
        height: 20,
        fill: colors.secondary,
        selectable: false,
        opacity: 0.8
      });
      fabricCanvas?.add(secondaryAccent);
    }
  };

  const renderPatterns = () => {
    patterns.patterns.forEach((pattern, index) => {
      const patternShape = new Circle({
        left: 170 + (index * 15),
        top: 140 + (index * 20),
        radius: 8,
        fill: colors.secondary,
        selectable: false,
        opacity: patterns.opacity / 100
      });
      fabricCanvas?.add(patternShape);
    });
  };

  const renderEmbellishments = () => {
    patterns.handwork.forEach((work, index) => {
      const embellishment = new Circle({
        left: 180 + (index * 10),
        top: 160 + (index * 15),
        radius: 3,
        fill: '#FFD700',
        selectable: false,
        opacity: 0.9
      });
      fabricCanvas?.add(embellishment);
    });
  };

  const renderBorders = () => {
    if (patterns.borders.length > 0) {
      const border = new Rect({
        left: 148,
        top: 118,
        width: 104,
        height: 204,
        fill: 'transparent',
        stroke: colors.border,
        strokeWidth: 3,
        selectable: false,
        rx: 12,
        ry: 12
      });
      fabricCanvas?.add(border);
    }
  };

  const renderStyleElements = () => {
    // Neckline variations
    if (styles.neckline === 'V-Neck') {
      const vneck = new Path('M 190 130 L 200 145 L 210 130', {
        fill: 'transparent',
        stroke: colors.secondary,
        strokeWidth: 2,
        selectable: false
      });
      fabricCanvas?.add(vneck);
    }

    // Sleeve indicators
    if (styles.sleeve === 'Full') {
      const sleeves = new Rect({
        left: 130,
        top: 130,
        width: 20,
        height: 80,
        fill: colors.primary,
        selectable: false,
        opacity: 0.6
      });
      fabricCanvas?.add(sleeves);
      
      const rightSleeve = new Rect({
        left: 250,
        top: 130,
        width: 20,
        height: 80,
        fill: colors.primary,
        selectable: false,
        opacity: 0.6
      });
      fabricCanvas?.add(rightSleeve);
    }
  };

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className="border border-luxury-rose rounded-lg shadow-lg bg-background"
      />
      
      {/* Layer Controls (for debugging/admin) */}
      <div className="absolute top-2 right-2 text-xs bg-background/90 rounded p-2 max-w-32">
        <div className="font-medium mb-1">Layers:</div>
        {layers.slice(-3).map(layer => (
          <div key={layer.id} className="flex justify-between">
            <span>{layer.type}</span>
            <span>{layer.opacity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};