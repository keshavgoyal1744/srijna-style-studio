import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GlobalReach = () => {
  const features = [
    {
      title: "Worldwide Shipping",
      description: "DHL & FedEx partnerships for secure, tracked delivery to every corner of the globe",
      icon: "🚚"
    },
    {
      title: "Multi-Currency Support", 
      description: "Pay in your local currency with PayPal, Razorpay, Stripe, and more",
      icon: "💳"
    },
    {
      title: "24/7 Support",
      description: "WhatsApp and live chat support for styling consultations and order assistance",
      icon: "💬"
    },
    {
      title: "Virtual Styling",
      description: "One-on-one video sessions with our fashion experts from anywhere",
      icon: "📹"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Toronto, Canada",
      text: "The customization was incredible! My wedding lehenga was exactly what I dreamed of.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Sarah Johnson", 
      location: "London, UK",
      text: "Amazing Indo-western fusion dress for my sister's wedding. The quality is outstanding!",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Anita Patel",
      location: "Sydney, Australia", 
      text: "Exceptional service and beautiful sarees. The virtual consultation was so helpful.",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-luxury-cream to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-deep mb-4">
            Global Fashion, Local Touch
          </h2>
          <p className="text-xl text-luxury-charcoal max-w-3xl mx-auto">
            Serving fashion enthusiasts worldwide with premium craftsmanship and personalized service
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-luxury-rose hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-background">
              <CardHeader>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <CardTitle className="text-lg text-luxury-deep">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-luxury-charcoal">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-luxury-deep mb-8">
            What Our Global Customers Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-luxury-cream border-luxury-gold hover:shadow-gold transition-all duration-300">
                <CardHeader>
                  <div className="text-lg mb-2">{testimonial.rating}</div>
                  <CardTitle className="text-lg text-luxury-deep">{testimonial.name}</CardTitle>
                  <p className="text-sm text-luxury-charcoal">{testimonial.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-luxury-charcoal italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-luxury-deep mb-4">
            Join Our Global Fashion Family
          </h3>
          <p className="text-luxury-charcoal mb-6">
            Experience the perfect blend of tradition and innovation, delivered worldwide
          </p>
          <Button variant="hero" size="lg">
            Start Your Fashion Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;