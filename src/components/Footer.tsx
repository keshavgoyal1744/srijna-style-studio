import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Collections", href: "/products" },
    { name: "Custom Orders", href: "/custom" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" }
  ];

  const collections = [
    { name: "Sarees", href: "/products?category=sarees" },
    { name: "Lehengas", href: "/products?category=lehengas" },
    { name: "Suits & Anarkalis", href: "/products?category=suits" },
    { name: "Indo-Western", href: "/products?category=indo-western" },
    { name: "Western Wear", href: "/products?category=western" },
    { name: "Accessories", href: "/products?category=accessories" }
  ];

  const socialLinks = [
    { icon: "📘", name: "Facebook", href: "#" },
    { icon: "📷", name: "Instagram", href: "#" },
    { icon: "🐦", name: "Twitter", href: "#" },
    { icon: "📺", name: "YouTube", href: "#" },
    { icon: "📌", name: "Pinterest", href: "#" }
  ];

  return (
    <footer className="bg-luxury-deep text-luxury-cream">
      {/* Newsletter Section */}
      <div className="bg-gradient-luxury py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-luxury-cream">
            Stay in Style
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to get exclusive access to new collections, styling tips, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-background/20 border-luxury-cream/30 text-luxury-cream placeholder:text-luxury-cream/70"
            />
            <Button variant="gold" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-luxury-gold">
              Srijna By Ritu Ritesh
            </h2>
            <p className="text-luxury-cream/80 mb-6 leading-relaxed">
              Crafting timeless fashion with 10+ years of expertise. From traditional Indian wear to contemporary designs, we bring your fashion dreams to life.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>Boutique Studio, Fashion District</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <span>hello@srijnabyritiritesh.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-luxury-gold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-luxury-cream/80 hover:text-luxury-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-luxury-gold">Collections</h3>
            <ul className="space-y-3">
              {collections.map((collection, index) => (
                <li key={index}>
                  <a 
                    href={collection.href} 
                    className="text-luxury-cream/80 hover:text-luxury-gold transition-colors duration-300 text-sm"
                  >
                    {collection.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-luxury-gold">Customer Care</h3>
            <div className="space-y-4 text-sm text-luxury-cream/80">
              <p>🕒 Mon-Sat: 10AM - 8PM IST</p>
              <p>🌍 Worldwide Shipping Available</p>
              <p>🔄 30-Day Easy Returns</p>
              <p>💬 24/7 WhatsApp Support</p>
              
              <div className="pt-4">
                <h4 className="text-luxury-gold font-medium mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-luxury-cream/10 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:scale-110 transition-all duration-300"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-luxury-cream/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-luxury-cream/60">
          <p>&copy; 2024 Srijna By Ritu Ritesh. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-luxury-gold transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-luxury-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;