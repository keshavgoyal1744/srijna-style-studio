import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomizationProcess = () => {
  const steps = [
    {
      step: "01",
      title: "Choose Your Style",
      description: "Select from our extensive collection of Indian, Western, or Indo-Western designs",
      icon: "👗"
    },
    {
      step: "02", 
      title: "Customize Everything",
      description: "Pick fabrics, colors, embellishments, cuts, and measurements - all unlimited",
      icon: "✨"
    },
    {
      step: "03",
      title: "Virtual Preview",
      description: "See your custom outfit with our AI-powered preview system",
      icon: "📱"
    },
    {
      step: "04",
      title: "Expert Crafting",
      description: "Our skilled artisans bring your vision to life with 10+ years of expertise",
      icon: "👨‍🎨"
    },
    {
      step: "05",
      title: "Global Delivery",
      description: "Receive your custom masterpiece anywhere in the world with tracking",
      icon: "🌍"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-deep mb-4">
            Unlimited Customization Process
          </h2>
          <p className="text-xl text-luxury-charcoal max-w-3xl mx-auto">
            Experience the magic of creating your perfect outfit with our seamless customization journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-luxury-rose bg-luxury-cream hover:shadow-gold transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-2">{step.icon}</div>
                <div className="text-2xl font-bold text-luxury-gold mb-2">{step.step}</div>
                <CardTitle className="text-lg text-luxury-deep">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-luxury-charcoal">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-luxury rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
          <h3 className="text-3xl font-bold mb-4">Ready to Create Your Masterpiece?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of satisfied customers worldwide who trust us with their special occasions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg">
              Start Customization
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-luxury-deep">
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationProcess;