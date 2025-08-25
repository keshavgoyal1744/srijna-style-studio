import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutBrand = () => {
  const achievements = [
    {
      number: "10+",
      label: "Years of Excellence",
      description: "Crafting beautiful fashion with passion and precision"
    },
    {
      number: "5000+", 
      label: "Happy Customers",
      description: "Across 20+ countries worldwide"
    },
    {
      number: "∞",
      label: "Customization Options",
      description: "Unlimited possibilities for your perfect outfit"
    },
    {
      number: "24/7",
      label: "Global Support",
      description: "Always here for your fashion needs"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-deep mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-luxury-charcoal">
              <p className="text-lg leading-relaxed">
                <strong className="text-luxury-deep">Srijna By Ritu Ritesh</strong> was born from a passion for creating 
                timeless fashion that celebrates both tradition and innovation. For over a decade, we've been crafting 
                exquisite pieces that tell stories of elegance, culture, and personal style.
              </p>
              <p className="text-lg leading-relaxed">
                Our journey began with a simple belief: every individual deserves fashion that's uniquely theirs. 
                From traditional Indian wear that honors our rich heritage to contemporary Western pieces and 
                innovative Indo-Western fusion, we create fashion without boundaries.
              </p>
              <p className="text-lg leading-relaxed">
                What sets us apart is our commitment to <span className="text-luxury-deep font-semibold">unlimited customization</span>. 
                Every fabric choice, every embellishment, every silhouette can be tailored to your vision. 
                No extra charges, no compromises – just pure creative freedom.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-rose rounded-2xl">
              <h3 className="text-xl font-bold text-luxury-deep mb-2">Our Mission</h3>
              <p className="text-luxury-charcoal">
                To democratize high-fashion customization and make exceptional, personalized clothing 
                accessible to fashion lovers worldwide, regardless of location or occasion.
              </p>
            </div>
          </div>
          
          {/* Achievements Grid */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center bg-luxury-cream border-luxury-gold hover:shadow-gold transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold text-luxury-deep">
                      {achievement.number}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-luxury-charcoal mb-2">{achievement.label}</h3>
                    <p className="text-sm text-luxury-charcoal">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-luxury rounded-2xl p-6 text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Quality Promise</h3>
              <p className="opacity-90">
                Every piece is handcrafted by skilled artisans using premium materials. 
                We stand behind our work with comprehensive quality assurance and customer satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;