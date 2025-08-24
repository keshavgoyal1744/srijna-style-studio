import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import indianCollection from "@/assets/indian-collection.jpg";
import westernCollection from "@/assets/western-collection.jpg";
import fusionCollection from "@/assets/fusion-collection.jpg";

const CollectionsShowcase = () => {
  const collections = [
    {
      title: "Indian Wear",
      description: "Sarees, Lehengas, Anarkalis, Sherwanis & Kurta Sets",
      image: indianCollection,
      items: ["Traditional Sarees", "Designer Lehengas", "Elegant Anarkalis", "Royal Sherwanis"]
    },
    {
      title: "Western Wear", 
      description: "Gowns, Cocktail Dresses, Suits & Contemporary Pieces",
      image: westernCollection,
      items: ["Evening Gowns", "Cocktail Dresses", "Power Suits", "Chic Co-ords"]
    },
    {
      title: "Indo-Western",
      description: "Fusion Pieces that Blend Tradition with Modernity",
      image: fusionCollection,
      items: ["Fusion Gowns", "Drape Skirts", "Jacket Sarees", "Modern Tuxedos"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-rose">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-deep mb-4">
            Our Collections
          </h2>
          <p className="text-xl text-luxury-charcoal max-w-2xl mx-auto">
            Discover our meticulously crafted pieces that celebrate the beauty of traditional and contemporary fashion
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-0 shadow-elegant hover:shadow-luxury transition-all duration-500 hover:scale-105 bg-background"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl text-luxury-deep">{collection.title}</CardTitle>
                <CardDescription className="text-luxury-charcoal">
                  {collection.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {collection.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-luxury-charcoal">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Button variant="luxury" className="w-full">
                  Explore {collection.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsShowcase;