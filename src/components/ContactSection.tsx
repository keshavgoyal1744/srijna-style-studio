import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const contactMethods = [
    {
      title: "WhatsApp Consultation",
      description: "Instant styling advice and order support",
      action: "Message Us",
      icon: "📱"
    },
    {
      title: "Virtual Styling Session",
      description: "One-on-one video calls with our fashion experts",
      action: "Book Session",
      icon: "📹"
    },
    {
      title: "Email Support",
      description: "Detailed inquiries and custom requests",
      action: "Send Email",
      icon: "✉️"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 text-primary-foreground">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Ready to start your custom fashion journey? Our experts are here to guide you every step of the way.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h3 className="text-2xl font-bold text-primary-foreground mb-6">Get In Touch</h3>
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-background/20 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{method.icon}</span>
                      <CardTitle className="text-primary-foreground">{method.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/80 mb-3">{method.description}</p>
                    <Button 
                      variant="gold" 
                      size="sm"
                      onClick={() => {
                        if (method.title.includes('WhatsApp')) {
                          window.open('https://wa.me/1234567890', '_blank');
                        } else if (method.title.includes('Email')) {
                          window.open('mailto:hello@srijnabyritiritesh.com', '_blank');
                        } else {
                          window.open('https://calendly.com', '_blank');
                        }
                      }}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              <h4 className="text-xl font-bold text-primary-foreground mb-4">Quick Facts</h4>
              <ul className="space-y-2 text-primary-foreground/90">
                <li>🕐 Response time: Within 2 hours</li>
                <li>🌍 Available in 10+ languages</li>
                <li>📦 Free worldwide shipping on orders over $200</li>
                <li>🔄 30-day satisfaction guarantee</li>
              </ul>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-background/95 backdrop-blur-sm border-0 shadow-elegant">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-luxury-deep bg-gradient-gold bg-clip-text text-transparent">
                Start Your Custom Order
              </CardTitle>
              <p className="text-luxury-charcoal/80 text-lg">
                Tell us about your dream outfit and we'll make it reality
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-deep">Full Name</label>
                  <Input 
                    placeholder="Enter your full name" 
                    className="border-luxury-rose/30 focus:border-luxury-deep transition-colors h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-deep">Email Address</label>
                  <Input 
                    placeholder="your.email@example.com" 
                    type="email" 
                    className="border-luxury-rose/30 focus:border-luxury-deep transition-colors h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-luxury-deep">Phone Number</label>
                <Input 
                  placeholder="+1 (555) 123-4567" 
                  className="border-luxury-rose/30 focus:border-luxury-deep transition-colors h-12"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-deep">Collection Preference</label>
                  <select className="w-full h-12 px-3 border border-luxury-rose/30 rounded-lg bg-background focus:border-luxury-deep transition-colors">
                    <option value="">Select Collection</option>
                    <option value="indian">Traditional Indian Wear</option>
                    <option value="western">Contemporary Western</option>
                    <option value="indo-western">Indo-Western Fusion</option>
                    <option value="bridal">Bridal Collection</option>
                    <option value="custom">Completely Custom Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-deep">Budget Range (USD)</label>
                  <select className="w-full h-12 px-3 border border-luxury-rose/30 rounded-lg bg-background focus:border-luxury-deep transition-colors">
                    <option value="">Select Budget Range</option>
                    <option value="100-300">$100 - $300</option>
                    <option value="300-600">$300 - $600</option>
                    <option value="600-1000">$600 - $1,000</option>
                    <option value="1000+">$1,000+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-luxury-deep">Describe Your Dream Outfit</label>
                <Textarea 
                  placeholder="Tell us about the occasion, style preferences, color ideas, fabric choices, any specific requirements..." 
                  className="min-h-[120px] border-luxury-rose/30 focus:border-luxury-deep transition-colors resize-none"
                />
              </div>
              
              <div className="bg-luxury-cream/50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    className="mt-1 rounded border-luxury-deep text-luxury-deep focus:ring-luxury-deep"
                  />
                  <label htmlFor="newsletter" className="text-sm text-luxury-charcoal leading-relaxed">
                    Subscribe to our newsletter for exclusive fashion updates, styling tips, and special offers. 
                    <span className="font-medium text-luxury-deep"> (Recommended)</span>
                  </label>
                </div>
              </div>
              
              <Button variant="hero" size="lg" className="w-full h-12 text-lg font-semibold">
                Submit Custom Request
              </Button>
              
              <p className="text-center text-sm text-luxury-charcoal/70">
                We'll get back to you within 24 hours with personalized recommendations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;