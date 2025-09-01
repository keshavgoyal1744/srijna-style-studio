import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import Footer from "@/components/Footer";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-luxury text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold">Favorites</h1>
                <p className="text-lg opacity-90">Your wishlist items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Favorites */}
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-4">No favorites yet</h2>
          <p className="text-muted-foreground mb-8">
            Start adding items to your wishlist by clicking the heart icon on products.
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-gradient-luxury text-primary-foreground hover:opacity-90"
          >
            Explore Products
          </Button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-luxury text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Favorites</h1>
              <p className="text-lg opacity-90">{favorites.length} items in your wishlist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Wishlist</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFavorites}
            className="text-destructive hover:bg-destructive/10"
          >
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <Card key={product.id} className="group hover:shadow-luxury transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background text-red-500"
                  onClick={() => removeFromFavorites(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {product.originalPrice && product.originalPrice > product.price && (
                  <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-deep">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-luxury-deep line-clamp-1">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-luxury-gold">★</span>
                    <span>{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-luxury-charcoal line-clamp-2">
                  {product.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-luxury-deep">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-luxury-charcoal line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromFavorites(product.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;