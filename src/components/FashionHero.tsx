import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion.jpg";
import { useNavigate } from "react-router-dom";

const FashionHero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-primary-foreground">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Srijna By Ritu Ritesh
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Timeless Indian, Western & Indo-Western Apparel
        </p>
        <p className="text-lg md:text-xl mb-8 opacity-80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          10+ Years of Craftsmanship • Unlimited Customization • Worldwide Shipping
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button variant="hero" size="lg" onClick={() => navigate('/products')}>
            Explore Collections
          </Button>
          <Button variant="gold" size="lg">
            Visit Store for Customization
          </Button>
        </div>
        
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm uppercase tracking-wider opacity-70 mb-2">Trusted by Fashion Lovers Globally</p>
          <div className="flex justify-center space-x-8 text-luxury-gold">
            <span>🇺🇸 USA</span>
            <span>🇬🇧 UK</span>
            <span>🇨🇦 Canada</span>
            <span>🇦🇺 Australia</span>
            <span>🇦🇪 UAE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionHero;