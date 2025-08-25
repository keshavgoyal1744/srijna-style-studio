import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Path, FabricImage } from "fabric";

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
      width: 450,
      height: 600,
      backgroundColor: "hsl(var(--background))",
      selection: false,
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
    // Create studio-like background
    const gradient = new Rect({
      left: 0,
      top: 0,
      width: 450,
      height: 600,
      fill: `linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 50%, hsl(var(--muted)) 100%)`,
      selectable: false,
      evented: false
    });
    fabricCanvas?.add(gradient);

    // Add subtle grid pattern
    for (let i = 0; i < 9; i++) {
      const line = new Rect({
        left: i * 50,
        top: 0,
        width: 1,
        height: 600,
        fill: 'hsl(var(--border))',
        opacity: 0.1,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(line);
    }
  };

  const renderModel = () => {
    // Model silhouette based on size
    const sizeMultipliers = {
      'xs': 0.8, 's': 0.85, 'm': 1.0, 'l': 1.15, 'xl': 1.3, 'xxl': 1.45, 'xxxl': 1.6
    };
    
    const multiplier = sizeMultipliers[modelSize as keyof typeof sizeMultipliers] || 1.0;
    
    // Create realistic mannequin silhouette
    const torsoWidth = 80 * multiplier;
    const torsoHeight = 200 * multiplier;
    const hipWidth = 90 * multiplier;
    const shoulderWidth = 85 * multiplier;
    
    // Head
    const head = new Circle({
      left: 225 - (15 * multiplier / 2),
      top: 50,
      radius: 15 * multiplier,
      fill: 'hsl(var(--muted))',
      stroke: 'hsl(var(--border))',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Neck
    const neck = new Rect({
      left: 225 - (8 * multiplier / 2),
      top: 80,
      width: 8 * multiplier,
      height: 15 * multiplier,
      fill: 'hsl(var(--muted))',
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Shoulders
    const shoulders = new Rect({
      left: 225 - shoulderWidth / 2,
      top: 95,
      width: shoulderWidth,
      height: 25 * multiplier,
      fill: 'hsl(var(--muted))',
      rx: 8,
      ry: 8,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Arms
    const leftArm = new Rect({
      left: 225 - shoulderWidth / 2 - 15,
      top: 105,
      width: 12 * multiplier,
      height: 120 * multiplier,
      fill: 'hsl(var(--muted))',
      rx: 6,
      ry: 6,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    const rightArm = new Rect({
      left: 225 + shoulderWidth / 2 + 3,
      top: 105,
      width: 12 * multiplier,
      height: 120 * multiplier,
      fill: 'hsl(var(--muted))',
      rx: 6,
      ry: 6,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Torso
    const torso = new Rect({
      left: 225 - torsoWidth / 2,
      top: 120,
      width: torsoWidth,
      height: torsoHeight,
      fill: 'hsl(var(--muted))',
      rx: 12,
      ry: 12,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Hips
    const hips = new Rect({
      left: 225 - hipWidth / 2,
      top: 300,
      width: hipWidth,
      height: 80 * multiplier,
      fill: 'hsl(var(--muted))',
      rx: 15,
      ry: 15,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Legs
    const leftLeg = new Rect({
      left: 225 - hipWidth / 2 + 10,
      top: 380,
      width: 18 * multiplier,
      height: 180 * multiplier,
      fill: 'hsl(var(--muted))',
      rx: 9,
      ry: 9,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    const rightLeg = new Rect({
      left: 225 + hipWidth / 2 - 28,
      top: 380,
      width: 18 * multiplier,
      height: 180 * multiplier,
      fill: 'hsl(var(--muted))',
      rx: 9,
      ry: 9,
      selectable: false,
      evented: false,
      opacity: 0.8
    });
    
    // Add all mannequin parts
    fabricCanvas?.add(head, neck, shoulders, leftArm, rightArm, torso, hips, leftLeg, rightLeg);
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
    const sizeMultiplier = getSizeMultiplier();
    
    // Blouse
    const blouse = new Rect({
      left: 225 - (40 * sizeMultiplier),
      top: 120,
      width: 80 * sizeMultiplier,
      height: 70 * sizeMultiplier,
      fill: colors.primary,
      rx: 8,
      ry: 8,
      selectable: false,
      evented: false,
      opacity: 0.9,
      stroke: colors.border,
      strokeWidth: 1
    });

    // Saree drape - main body
    const sareeDrape = new Path(`M ${225 - 45 * sizeMultiplier} 190 
      Q ${225} 185 ${225 + 45 * sizeMultiplier} 190 
      Q ${225 + 50 * sizeMultiplier} 220 ${225 + 45 * sizeMultiplier} 280 
      Q ${225 + 40 * sizeMultiplier} 350 ${225 + 35 * sizeMultiplier} 420 
      L ${225 - 35 * sizeMultiplier} 420 
      Q ${225 - 40 * sizeMultiplier} 350 ${225 - 45 * sizeMultiplier} 280 
      Q ${225 - 50 * sizeMultiplier} 220 ${225 - 45 * sizeMultiplier} 190 Z`, {
      fill: colors.primary,
      selectable: false,
      evented: false,
      opacity: 0.85,
      stroke: colors.border,
      strokeWidth: 1
    });

    // Pallu (decorative drape over shoulder)
    const pallu = new Path(`M ${225 - 30 * sizeMultiplier} 120 
      Q ${225 - 60 * sizeMultiplier} 140 ${225 - 80 * sizeMultiplier} 180 
      Q ${225 - 85 * sizeMultiplier} 200 ${225 - 75 * sizeMultiplier} 220 
      L ${225 - 40 * sizeMultiplier} 200 
      Q ${225 - 35 * sizeMultiplier} 160 ${225 - 30 * sizeMultiplier} 120 Z`, {
      fill: colors.secondary,
      selectable: false,
      evented: false,
      opacity: 0.8,
      stroke: colors.border,
      strokeWidth: 1
    });

    fabricCanvas?.add(blouse, sareeDrape, pallu);
    return sareeDrape;
  };

  const createLehengaShape = () => {
    const sizeMultiplier = getSizeMultiplier();
    
    // Choli (blouse)
    const choli = new Rect({
      left: 225 - (40 * sizeMultiplier),
      top: 120,
      width: 80 * sizeMultiplier,
      height: 70 * sizeMultiplier,
      fill: colors.primary,
      rx: 8,
      ry: 8,
      selectable: false,
      evented: false,
      opacity: 0.9,
      stroke: colors.border,
      strokeWidth: 1
    });

    // Lehenga skirt (circular flared)
    const lehenga = new Path(`M ${225 - 80 * sizeMultiplier} 190 
      Q ${225} 185 ${225 + 80 * sizeMultiplier} 190 
      Q ${225 + 100 * sizeMultiplier} 250 ${225 + 120 * sizeMultiplier} 350 
      Q ${225 + 110 * sizeMultiplier} 450 ${225 + 100 * sizeMultiplier} 520 
      L ${225 - 100 * sizeMultiplier} 520 
      Q ${225 - 110 * sizeMultiplier} 450 ${225 - 120 * sizeMultiplier} 350 
      Q ${225 - 100 * sizeMultiplier} 250 ${225 - 80 * sizeMultiplier} 190 Z`, {
      fill: colors.primary,
      selectable: false,
      evented: false,
      opacity: 0.85,
      stroke: colors.border,
      strokeWidth: 1
    });

    // Dupatta (flowing scarf)
    const dupatta = new Path(`M ${225 + 30 * sizeMultiplier} 130 
      Q ${225 + 70 * sizeMultiplier} 150 ${225 + 90 * sizeMultiplier} 200 
      Q ${225 + 85 * sizeMultiplier} 250 ${225 + 70 * sizeMultiplier} 300 
      Q ${225 + 50 * sizeMultiplier} 280 ${225 + 35 * sizeMultiplier} 250 
      Q ${225 + 40 * sizeMultiplier} 200 ${225 + 30 * sizeMultiplier} 130 Z`, {
      fill: colors.secondary,
      selectable: false,
      evented: false,
      opacity: 0.7,
      stroke: colors.border,
      strokeWidth: 1
    });

    fabricCanvas?.add(choli, lehenga, dupatta);
    return lehenga;
  };

  const createAnarkaliShape = () => {
    const sizeMultiplier = getSizeMultiplier();
    
    const anarkali = new Path(`M ${225 - 50 * sizeMultiplier} 120 
      L ${225 + 50 * sizeMultiplier} 120 
      Q ${225 + 55 * sizeMultiplier} 140 ${225 + 50 * sizeMultiplier} 180 
      Q ${225 + 60 * sizeMultiplier} 220 ${225 + 70 * sizeMultiplier} 260 
      Q ${225 + 80 * sizeMultiplier} 300 ${225 + 90 * sizeMultiplier} 340 
      Q ${225 + 100 * sizeMultiplier} 380 ${225 + 95 * sizeMultiplier} 450 
      L ${225 - 95 * sizeMultiplier} 450 
      Q ${225 - 100 * sizeMultiplier} 380 ${225 - 90 * sizeMultiplier} 340 
      Q ${225 - 80 * sizeMultiplier} 300 ${225 - 70 * sizeMultiplier} 260 
      Q ${225 - 60 * sizeMultiplier} 220 ${225 - 50 * sizeMultiplier} 180 
      Q ${225 - 55 * sizeMultiplier} 140 ${225 - 50 * sizeMultiplier} 120 Z`, {
      fill: colors.primary,
      selectable: false,
      evented: false,
      opacity: 0.9,
      stroke: colors.border,
      strokeWidth: 1
    });
    
    fabricCanvas?.add(anarkali);
    return anarkali;
  };

  const createKurtaShape = () => {
    const sizeMultiplier = getSizeMultiplier();
    
    const kurta = new Rect({
      left: 225 - (50 * sizeMultiplier),
      top: 120,
      width: 100 * sizeMultiplier,
      height: 250 * sizeMultiplier,
      fill: colors.primary,
      rx: 12,
      ry: 12,
      selectable: false,
      evented: false,
      opacity: 0.9,
      stroke: colors.border,
      strokeWidth: 1
    });
    
    // Pants/Churidar
    const pants = new Rect({
      left: 225 - (35 * sizeMultiplier),
      top: 370,
      width: 70 * sizeMultiplier,
      height: 150 * sizeMultiplier,
      fill: colors.secondary,
      rx: 8,
      ry: 8,
      selectable: false,
      evented: false,
      opacity: 0.8,
      stroke: colors.border,
      strokeWidth: 1
    });
    
    fabricCanvas?.add(kurta, pants);
    return kurta;
  };

  const createGownShape = () => {
    const sizeMultiplier = getSizeMultiplier();
    
    const gown = new Path(`M ${225 - 40 * sizeMultiplier} 120 
      L ${225 + 40 * sizeMultiplier} 120 
      Q ${225 + 45 * sizeMultiplier} 140 ${225 + 40 * sizeMultiplier} 180 
      Q ${225 + 50 * sizeMultiplier} 220 ${225 + 60 * sizeMultiplier} 260 
      Q ${225 + 70 * sizeMultiplier} 300 ${225 + 75 * sizeMultiplier} 340 
      Q ${225 + 80 * sizeMultiplier} 380 ${225 + 75 * sizeMultiplier} 450 
      Q ${225 + 70 * sizeMultiplier} 500 ${225 + 60 * sizeMultiplier} 540 
      L ${225 - 60 * sizeMultiplier} 540 
      Q ${225 - 70 * sizeMultiplier} 500 ${225 - 75 * sizeMultiplier} 450 
      Q ${225 - 80 * sizeMultiplier} 380 ${225 - 75 * sizeMultiplier} 340 
      Q ${225 - 70 * sizeMultiplier} 300 ${225 - 60 * sizeMultiplier} 260 
      Q ${225 - 50 * sizeMultiplier} 220 ${225 - 40 * sizeMultiplier} 180 
      Q ${225 - 45 * sizeMultiplier} 140 ${225 - 40 * sizeMultiplier} 120 Z`, {
      fill: colors.primary,
      selectable: false,
      evented: false,
      opacity: 0.9,
      stroke: colors.border,
      strokeWidth: 1
    });
    
    fabricCanvas?.add(gown);
    return gown;
  };

  const createKurtiShape = () => {
    const sizeMultiplier = getSizeMultiplier();
    
    const kurti = new Rect({
      left: 225 - (40 * sizeMultiplier),
      top: 120,
      width: 80 * sizeMultiplier,
      height: 180 * sizeMultiplier,
      fill: colors.primary,
      rx: 10,
      ry: 10,
      selectable: false,
      evented: false,
      opacity: 0.9,
      stroke: colors.border,
      strokeWidth: 1
    });
    
    // Jeans/Leggings (optional bottom)
    const bottom = new Rect({
      left: 225 - (30 * sizeMultiplier),
      top: 300,
      width: 60 * sizeMultiplier,
      height: 220 * sizeMultiplier,
      fill: colors.secondary,
      rx: 8,
      ry: 8,
      selectable: false,
      evented: false,
      opacity: 0.7,
      stroke: colors.border,
      strokeWidth: 1
    });
    
    fabricCanvas?.add(kurti, bottom);
    return kurti;
  };

  const getSizeMultiplier = () => {
    const sizeMultipliers = {
      'xs': 0.8, 's': 0.85, 'm': 1.0, 'l': 1.15, 'xl': 1.3, 'xxl': 1.45, 'xxxl': 1.6
    };
    return sizeMultipliers[modelSize as keyof typeof sizeMultipliers] || 1.0;
  };

  const renderFabricTexture = () => {
    if (!fabric || !garmentType) return;
    
    const sizeMultiplier = getSizeMultiplier();
    
    // Create fabric-specific texture overlays
    const fabricTextures = {
      'silk': () => createShimmerTexture(),
      'cotton': () => createWovenTexture(),
      'chiffon': () => createSheenTexture(),
      'georgette': () => createFlowingTexture(),
      'velvet': () => createRichTexture(),
      'brocade': () => createMetallicTexture(),
    };
    
    const textureCreator = fabricTextures[fabric as keyof typeof fabricTextures];
    if (textureCreator) {
      textureCreator();
    }
  };

  const createShimmerTexture = () => {
    // Add subtle shimmer effect for silk
    const shimmer = new Rect({
      left: 225 - 50,
      top: 120,
      width: 100,
      height: 250,
      fill: 'transparent',
      stroke: 'hsl(var(--luxury-gold))',
      strokeWidth: 0.5,
      opacity: 0.3,
      selectable: false,
      evented: false
    });
    fabricCanvas?.add(shimmer);
  };

  const createWovenTexture = () => {
    // Add crosshatch pattern for cotton
    for (let i = 0; i < 10; i++) {
      const line = new Path(`M ${175 + i * 10} 120 L ${175 + i * 10} 370`, {
        stroke: colors.primary,
        strokeWidth: 0.5,
        opacity: 0.1,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(line);
    }
  };

  const createSheenTexture = () => {
    // Add flowing lines for chiffon
    const flow = new Path('M 175 120 Q 225 150 275 120 Q 225 180 175 150', {
      fill: 'transparent',
      stroke: 'hsl(var(--primary))',
      strokeWidth: 1,
      opacity: 0.2,
      selectable: false,
      evented: false
    });
    fabricCanvas?.add(flow);
  };

  const createFlowingTexture = () => {
    // Add subtle wave pattern for georgette
    const wave = new Path('M 175 140 Q 200 130 225 140 Q 250 150 275 140', {
      fill: 'transparent',
      stroke: colors.secondary,
      strokeWidth: 1,
      opacity: 0.15,
      selectable: false,
      evented: false
    });
    fabricCanvas?.add(wave);
  };

  const createRichTexture = () => {
    // Add depth for velvet
    const depth = new Rect({
      left: 225 - 48,
      top: 122,
      width: 96,
      height: 246,
      fill: colors.primary,
      opacity: 0.3,
      selectable: false,
      evented: false
    });
    fabricCanvas?.add(depth);
  };

  const createMetallicTexture = () => {
    // Add metallic threads for brocade
    for (let i = 0; i < 5; i++) {
      const thread = new Circle({
        left: 190 + i * 15,
        top: 140 + i * 20,
        radius: 2,
        fill: 'hsl(var(--luxury-gold))',
        opacity: 0.6,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(thread);
    }
  };

  const renderColorOverlay = () => {
    // This is handled in garment rendering for better integration
    // Colors are now applied directly to garment shapes for more realistic appearance
  };

  const renderPatterns = () => {
    if (!patterns.patterns.length) return;
    
    const patternCreators = {
      'floral': () => createFloralPattern(),
      'paisley': () => createPaisleyPattern(),
      'geometric': () => createGeometricPattern(),
      'stripes': () => createStripesPattern(),
      'dots': () => createDotsPattern(),
    };
    
    patterns.patterns.forEach(pattern => {
      const creator = patternCreators[pattern as keyof typeof patternCreators];
      if (creator) creator();
    });
  };

  const createFloralPattern = () => {
    for (let i = 0; i < 6; i++) {
      const flower = new Circle({
        left: 190 + (i % 3) * 25,
        top: 160 + Math.floor(i / 3) * 40,
        radius: 6,
        fill: colors.secondary,
        opacity: patterns.opacity / 100,
        selectable: false,
        evented: false
      });
      
      // Petals
      for (let j = 0; j < 5; j++) {
        const petal = new Circle({
          left: flower.left! + Math.cos(j * (Math.PI * 2 / 5)) * 8,
          top: flower.top! + Math.sin(j * (Math.PI * 2 / 5)) * 8,
          radius: 3,
          fill: colors.secondary,
          opacity: (patterns.opacity / 100) * 0.7,
          selectable: false,
          evented: false
        });
        fabricCanvas?.add(petal);
      }
      fabricCanvas?.add(flower);
    }
  };

  const createPaisleyPattern = () => {
    for (let i = 0; i < 4; i++) {
      const paisley = new Path(`M ${200 + i * 20} ${150 + i * 30} 
        Q ${210 + i * 20} ${140 + i * 30} ${220 + i * 20} ${150 + i * 30} 
        Q ${215 + i * 20} ${160 + i * 30} ${200 + i * 20} ${150 + i * 30}`, {
        fill: colors.secondary,
        opacity: patterns.opacity / 100,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(paisley);
    }
  };

  const createGeometricPattern = () => {
    for (let i = 0; i < 8; i++) {
      const diamond = new Rect({
        left: 180 + (i % 4) * 20,
        top: 140 + Math.floor(i / 4) * 30,
        width: 12,
        height: 12,
        fill: colors.secondary,
        opacity: patterns.opacity / 100,
        angle: 45,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(diamond);
    }
  };

  const createStripesPattern = () => {
    for (let i = 0; i < 6; i++) {
      const stripe = new Rect({
        left: 175,
        top: 130 + i * 15,
        width: 100,
        height: 3,
        fill: colors.secondary,
        opacity: patterns.opacity / 100,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(stripe);
    }
  };

  const createDotsPattern = () => {
    for (let i = 0; i < 15; i++) {
      const dot = new Circle({
        left: 180 + (i % 5) * 18,
        top: 140 + Math.floor(i / 5) * 25,
        radius: 4,
        fill: colors.secondary,
        opacity: patterns.opacity / 100,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(dot);
    }
  };

  const renderEmbellishments = () => {
    if (!patterns.handwork.length) return;
    
    const embellishmentCreators = {
      'zari': () => createZariWork(),
      'sequins': () => createSequinWork(),
      'beadwork': () => createBeadWork(),
      'mirror': () => createMirrorWork(),
      'embroidery': () => createEmbroideryWork(),
    };
    
    patterns.handwork.forEach(work => {
      const creator = embellishmentCreators[work as keyof typeof embellishmentCreators];
      if (creator) creator();
    });
  };

  const createZariWork = () => {
    // Golden thread work
    for (let i = 0; i < 8; i++) {
      const zari = new Path(`M ${190 + i * 8} ${170 + i * 5} 
        Q ${195 + i * 8} ${165 + i * 5} ${200 + i * 8} ${170 + i * 5}`, {
        stroke: 'hsl(var(--luxury-gold))',
        strokeWidth: 2,
        fill: 'transparent',
        opacity: 0.8,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(zari);
    }
  };

  const createSequinWork = () => {
    // Shiny sequins
    for (let i = 0; i < 12; i++) {
      const sequin = new Circle({
        left: 185 + (i % 4) * 15,
        top: 150 + Math.floor(i / 4) * 20,
        radius: 3,
        fill: 'hsl(var(--luxury-gold))',
        stroke: colors.border,
        strokeWidth: 0.5,
        opacity: 0.9,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(sequin);
    }
  };

  const createBeadWork = () => {
    // Small beads
    for (let i = 0; i < 20; i++) {
      const bead = new Circle({
        left: 180 + (i % 6) * 12,
        top: 145 + Math.floor(i / 6) * 15,
        radius: 2,
        fill: colors.secondary,
        opacity: 0.8,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(bead);
    }
  };

  const createMirrorWork = () => {
    // Reflective mirrors
    for (let i = 0; i < 6; i++) {
      const mirror = new Circle({
        left: 190 + (i % 3) * 25,
        top: 160 + Math.floor(i / 3) * 35,
        radius: 8,
        fill: 'hsl(var(--background))',
        stroke: 'hsl(var(--luxury-gold))',
        strokeWidth: 2,
        opacity: 0.9,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(mirror);
    }
  };

  const createEmbroideryWork = () => {
    // Thread embroidery
    for (let i = 0; i < 10; i++) {
      const thread = new Path(`M ${185 + i * 6} ${155 + i * 8} 
        L ${190 + i * 6} ${150 + i * 8} 
        L ${195 + i * 6} ${155 + i * 8}`, {
        stroke: colors.secondary,
        strokeWidth: 1.5,
        fill: 'transparent',
        opacity: 0.7,
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(thread);
    }
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
    const sizeMultiplier = getSizeMultiplier();
    
    // Neckline variations
    renderNeckline(sizeMultiplier);
    
    // Sleeve variations
    renderSleeves(sizeMultiplier);
    
    // Back design elements
    renderBackDesign(sizeMultiplier);
  };

  const renderNeckline = (multiplier: number) => {
    const necklines = {
      'V-Neck': () => {
        const vneck = new Path(`M ${225 - 15 * multiplier} 130 
          L ${225} 155 
          L ${225 + 15 * multiplier} 130`, {
          fill: 'hsl(var(--background))',
          stroke: colors.border,
          strokeWidth: 1,
          selectable: false,
          evented: false
        });
        fabricCanvas?.add(vneck);
      },
      'Round': () => {
        const round = new Circle({
          left: 225,
          top: 135,
          radius: 12 * multiplier,
          fill: 'hsl(var(--background))',
          stroke: colors.border,
          strokeWidth: 1,
          selectable: false,
          evented: false,
          originX: 'center',
          originY: 'center'
        });
        fabricCanvas?.add(round);
      },
      'Boat': () => {
        const boat = new Rect({
          left: 225 - (20 * multiplier),
          top: 130,
          width: 40 * multiplier,
          height: 8 * multiplier,
          fill: 'hsl(var(--background))',
          stroke: colors.border,
          strokeWidth: 1,
          rx: 4,
          selectable: false,
          evented: false
        });
        fabricCanvas?.add(boat);
      }
    };
    
    const necklineCreator = necklines[styles.neckline as keyof typeof necklines];
    if (necklineCreator) necklineCreator();
  };

  const renderSleeves = (multiplier: number) => {
    if (!styles.sleeve || styles.sleeve === 'Sleeveless') return;
    
    const sleeveStyles = {
      'Cap': () => {
        const leftCap = new Circle({
          left: 225 - (42 * multiplier),
          top: 140,
          radius: 15 * multiplier,
          fill: colors.primary,
          opacity: 0.8,
          selectable: false,
          evented: false
        });
        const rightCap = new Circle({
          left: 225 + (42 * multiplier),
          top: 140,
          radius: 15 * multiplier,
          fill: colors.primary,
          opacity: 0.8,
          selectable: false,
          evented: false
        });
        fabricCanvas?.add(leftCap, rightCap);
      },
      'Half': () => {
        const leftSleeve = new Rect({
          left: 225 - (55 * multiplier),
          top: 130,
          width: 15 * multiplier,
          height: 60 * multiplier,
          fill: colors.primary,
          opacity: 0.8,
          rx: 8,
          selectable: false,
          evented: false
        });
        const rightSleeve = new Rect({
          left: 225 + (40 * multiplier),
          top: 130,
          width: 15 * multiplier,
          height: 60 * multiplier,
          fill: colors.primary,
          opacity: 0.8,
          rx: 8,
          selectable: false,
          evented: false
        });
        fabricCanvas?.add(leftSleeve, rightSleeve);
      },
      'Full': () => {
        const leftSleeve = new Rect({
          left: 225 - (55 * multiplier),
          top: 130,
          width: 15 * multiplier,
          height: 120 * multiplier,
          fill: colors.primary,
          opacity: 0.8,
          rx: 8,
          selectable: false,
          evented: false
        });
        const rightSleeve = new Rect({
          left: 225 + (40 * multiplier),
          top: 130,
          width: 15 * multiplier,
          height: 120 * multiplier,
          fill: colors.primary,
          opacity: 0.8,
          rx: 8,
          selectable: false,
          evented: false
        });
        fabricCanvas?.add(leftSleeve, rightSleeve);
      }
    };
    
    const sleeveCreator = sleeveStyles[styles.sleeve as keyof typeof sleeveStyles];
    if (sleeveCreator) sleeveCreator();
  };

  const renderBackDesign = (multiplier: number) => {
    if (!styles.back || styles.back === 'Regular') return;
    
    // Add subtle back design indicators (visible as design elements)
    if (styles.back === 'Deep V') {
      const backV = new Path(`M ${225 - 10 * multiplier} 140 
        L ${225} 170 
        L ${225 + 10 * multiplier} 140`, {
        fill: 'transparent',
        stroke: colors.secondary,
        strokeWidth: 1,
        opacity: 0.5,
        strokeDashArray: [3, 3],
        selectable: false,
        evented: false
      });
      fabricCanvas?.add(backV);
    }
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-muted/20 to-background p-4 rounded-lg">
        <canvas 
          ref={canvasRef} 
          className="border border-border rounded-lg shadow-elegant bg-background mx-auto block"
        />
      </div>
      
      {/* Live Preview Info */}
      <div className="absolute top-2 left-2 text-xs bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
        <div className="font-medium text-foreground mb-2">Live Preview</div>
        <div className="space-y-1 text-muted-foreground">
          <div><span className="font-medium">Garment:</span> {garmentType || 'None'}</div>
          <div><span className="font-medium">Size:</span> {modelSize.toUpperCase()}</div>
          <div><span className="font-medium">Fabric:</span> {fabric || 'None'}</div>
          {patterns.patterns.length > 0 && (
            <div><span className="font-medium">Patterns:</span> {patterns.patterns.length}</div>
          )}
          {patterns.handwork.length > 0 && (
            <div><span className="font-medium">Embellishments:</span> {patterns.handwork.length}</div>
          )}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button 
          onClick={() => fabricCanvas?.setZoom(fabricCanvas.getZoom() * 1.1)}
          className="w-8 h-8 bg-background/95 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
        >
          +
        </button>
        <button 
          onClick={() => fabricCanvas?.setZoom(fabricCanvas.getZoom() * 0.9)}
          className="w-8 h-8 bg-background/95 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
        >
          -
        </button>
        <button 
          onClick={() => fabricCanvas?.setZoom(1)}
          className="px-3 h-8 bg-background/95 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
};