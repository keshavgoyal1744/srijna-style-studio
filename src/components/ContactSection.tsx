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
                    <Button variant="gold" size="sm">
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
          <Card className="bg-background border-0 shadow-luxury">
            <CardHeader>
              <CardTitle className="text-2xl text-luxury-deep">Start Your Custom Order</CardTitle>
              <p className="text-luxury-charcoal">Tell us about your dream outfit and we'll make it reality</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="border-luxury-rose" />
                <Input placeholder="Email Address" type="email" className="border-luxury-rose" />
              </div>
              <Input placeholder="Phone Number (with country code)" className="border-luxury-rose" />
              <div className="grid md:grid-cols-2 gap-4">
                <select className="w-full p-2 border border-luxury-rose rounded-md bg-background">
                  <option>Select Collection</option>
                  <option>Indian Wear</option>
                  <option>Western Wear</option>
                  <option>Indo-Western</option>
                  <option>Custom Design</option>
                </select>
                <Input placeholder="Budget Range (USD)" className="border-luxury-rose" />
              </div>
              <Textarea 
                placeholder="Describe your dream outfit... (occasion, style preferences, color ideas, etc.)" 
                className="min-h-[100px] border-luxury-rose"
              />
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="newsletter" className="rounded" />
                <label htmlFor="newsletter" className="text-sm text-luxury-charcoal">
                  Subscribe to our newsletter for fashion updates and exclusive offers
                </label>
              </div>
              <Button variant="hero" className="w-full">
                Submit Custom Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;