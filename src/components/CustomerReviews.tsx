import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    review: "Absolutely stunning saree! The quality of silk and the intricate zari work exceeded my expectations. Perfect for my sister's wedding.",
    product: "Royal Silk Saree",
    image: "/placeholder.svg",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Johnson", 
    location: "London, UK",
    rating: 5,
    review: "Amazing craftsmanship! I ordered a custom lehenga and it was delivered exactly as I envisioned. The international shipping was smooth.",
    product: "Custom Bridal Lehenga",
    image: "/placeholder.svg",
    verified: true
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "Toronto, Canada", 
    rating: 4,
    review: "Beautiful anarkali suit with excellent mirror work. The fit was perfect and I received so many compliments at the function.",
    product: "Designer Anarkali",
    image: "/placeholder.svg",
    verified: true
  },
  {
    id: 4,
    name: "Anita Singh",
    location: "Delhi, India",
    rating: 5,
    review: "Outstanding quality and design! The kurta set was comfortable and elegant. Will definitely order again for my next occasion.",
    product: "Cotton Kurta Set",
    image: "/placeholder.svg",
    verified: true
  },
  {
    id: 5,
    name: "Emma Wilson",
    location: "Sydney, Australia",
    rating: 5,
    review: "Incredible fusion gown! The sequin work was breathtaking and it fit like a dream. Perfect for our cultural event.",
    product: "Indo-Western Gown",
    image: "/placeholder.svg",
    verified: true
  },
  {
    id: 6,
    name: "Kavitha Reddy",
    location: "Hyderabad, India",
    rating: 4,
    review: "Lovely kurti with beautiful block prints. The fabric quality is excellent and the colors are vibrant. Highly recommended!",
    product: "Designer Kurti",
    image: "/placeholder.svg",
    verified: true
  }
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Move every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const getVisibleReviews = () => {
    const visibleCount = 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % reviews.length;
      result.push(reviews[index]);
    }
    
    return result;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-luxury-gold text-luxury-gold' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-deep mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-luxury-charcoal max-w-3xl mx-auto">
            Join thousands of satisfied customers worldwide who trust us for their special occasions
          </p>
        </div>

        {/* Moving Reviews Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out gap-6"
            style={{ 
              transform: `translateX(-${(currentIndex * 100) / 3}%)`,
              width: `${(reviews.length * 100) / 3}%`
            }}
          >
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className="flex-shrink-0"
                style={{ width: `${100 / reviews.length}%` }}
              >
                <Card className="h-full bg-background/80 backdrop-blur-sm border-luxury-rose hover:shadow-luxury transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-luxury-deep">{review.name}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-luxury-charcoal">{review.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>

                    <div className="relative mb-4">
                      <Quote className="absolute -top-2 -left-2 h-6 w-6 text-luxury-gold/30" />
                      <p className="text-luxury-charcoal leading-relaxed pl-4">
                        {review.review}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-luxury-rose/20">
                      <p className="text-sm font-medium text-luxury-deep">
                        Product: {review.product}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-luxury-gold scale-125' 
                  : 'bg-luxury-charcoal/30 hover:bg-luxury-charcoal/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-luxury-deep mb-2">5000+</div>
            <div className="text-sm text-luxury-charcoal">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-deep mb-2">4.9★</div>
            <div className="text-sm text-luxury-charcoal">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-deep mb-2">50+</div>
            <div className="text-sm text-luxury-charcoal">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-luxury-deep mb-2">10+</div>
            <div className="text-sm text-luxury-charcoal">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;