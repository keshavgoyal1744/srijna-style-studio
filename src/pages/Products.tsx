import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ArrowLeft, ShoppingCart, Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample product data - replace with your actual products
const sampleProducts = [
  {
    id: 1,
    name: "Royal Silk Saree",
    category: "saree",
    price: 25000,
    originalPrice: 30000,
    image: "/placeholder.svg",
    description: "Handwoven silk saree with traditional zari work",
    inStock: true,
    rating: 4.8,
    tags: ["silk", "handwoven", "traditional"]
  },
  {
    id: 2,
    name: "Designer Lehenga Set",
    category: "lehenga",
    price: 45000,
    originalPrice: 55000,
    image: "/placeholder.svg",
    description: "Heavy embroidered lehenga with dupatta",
    inStock: true,
    rating: 4.9,
    tags: ["embroidered", "bridal", "premium"]
  },
  {
    id: 3,
    name: "Elegant Anarkali Suit",
    category: "anarkali",
    price: 18000,
    originalPrice: 22000,
    image: "/placeholder.svg",
    description: "Flowing anarkali with mirror work",
    inStock: false,
    rating: 4.7,
    tags: ["mirror work", "party wear", "elegant"]
  },
  {
    id: 4,
    name: "Cotton Kurta Set",
    category: "kurta",
    price: 8000,
    originalPrice: 10000,
    image: "/placeholder.svg",
    description: "Comfortable cotton kurta with palazzo",
    inStock: true,
    rating: 4.6,
    tags: ["cotton", "casual", "comfortable"]
  },
  {
    id: 5,
    name: "Indo-Western Gown",
    category: "gown",
    price: 32000,
    originalPrice: 38000,
    image: "/placeholder.svg",
    description: "Fusion evening gown with sequin work",
    inStock: true,
    rating: 4.8,
    tags: ["fusion", "sequin", "evening wear"]
  },
  {
    id: 6,
    name: "Designer Kurti",
    category: "kurti",
    price: 6000,
    originalPrice: 8000,
    image: "/placeholder.svg",
    description: "Contemporary kurti with block prints",
    inStock: true,
    rating: 4.5,
    tags: ["block print", "contemporary", "casual"]
  }
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "saree", label: "Sarees" },
  { value: "lehenga", label: "Lehengas" },
  { value: "anarkali", label: "Anarkali Suits" },
  { value: "kurta", label: "Kurta Sets" },
  { value: "gown", label: "Gowns" },
  { value: "kurti", label: "Kurtis" }
];

const fabrics = ["Silk", "Cotton", "Chiffon", "Georgette", "Crepe", "Net", "Velvet", "Satin"];
const occasions = ["Wedding", "Party", "Casual", "Festival", "Formal", "Traditional"];
const colors = ["Red", "Blue", "Green", "Pink", "Purple", "Gold", "Silver", "Black", "White", "Orange"];

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced filters
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = !inStockOnly || product.inStock;
    
    // Check fabric filter (simplified - you can enhance this based on your product data structure)
    const matchesFabric = selectedFabrics.length === 0 || 
                         selectedFabrics.some(fabric => 
                           product.tags.some(tag => tag.toLowerCase().includes(fabric.toLowerCase())));
    
    const matchesOccasion = selectedOccasions.length === 0 ||
                           selectedOccasions.some(occasion =>
                             product.tags.some(tag => tag.toLowerCase().includes(occasion.toLowerCase())));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesFabric && matchesOccasion;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleArrayFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 60000]);
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setSelectedColors([]);
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-luxury text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Our Collection</h1>
              <p className="text-lg opacity-90">Discover handcrafted elegance</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, fabrics, or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background text-foreground"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-background text-foreground">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-background text-foreground">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <p className="text-luxury-charcoal">
              Showing {filteredProducts.length} of {sampleProducts.length} products
            </p>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </Button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="mb-8 p-6 bg-luxury-cream/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-luxury-deep">Advanced Filters</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-luxury-deep mb-3 block">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    min={0}
                    max={60000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>

                {/* Fabric Filter */}
                <div>
                  <label className="text-sm font-medium text-luxury-deep mb-3 block">Fabric</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {fabrics.map(fabric => (
                      <div key={fabric} className="flex items-center space-x-2">
                        <Checkbox
                          id={`fabric-${fabric}`}
                          checked={selectedFabrics.includes(fabric)}
                          onCheckedChange={() => toggleArrayFilter(fabric, setSelectedFabrics)}
                        />
                        <label htmlFor={`fabric-${fabric}`} className="text-sm text-luxury-charcoal cursor-pointer">
                          {fabric}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Occasion Filter */}
                <div>
                  <label className="text-sm font-medium text-luxury-deep mb-3 block">Occasion</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {occasions.map(occasion => (
                      <div key={occasion} className="flex items-center space-x-2">
                        <Checkbox
                          id={`occasion-${occasion}`}
                          checked={selectedOccasions.includes(occasion)}
                          onCheckedChange={() => toggleArrayFilter(occasion, setSelectedOccasions)}
                        />
                        <label htmlFor={`occasion-${occasion}`} className="text-sm text-luxury-charcoal cursor-pointer">
                          {occasion}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <label className="text-sm font-medium text-luxury-deep mb-3 block">Availability</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                    />
                    <label htmlFor="in-stock" className="text-sm text-luxury-charcoal cursor-pointer">
                      In Stock Only
                    </label>
                  </div>
                </div>
              </div>

              {/* Applied Filters Summary */}
              {(selectedFabrics.length > 0 || selectedOccasions.length > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 60000) && (
                <div className="mt-6 pt-4 border-t border-luxury-rose/20">
                  <p className="text-sm font-medium text-luxury-deep mb-2">Applied Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRange[0] > 0 || priceRange[1] < 60000 ? (
                      <Badge variant="secondary" className="gap-1">
                        ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                        <button onClick={() => setPriceRange([0, 60000])}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null}
                    {selectedFabrics.map(fabric => (
                      <Badge key={fabric} variant="secondary" className="gap-1">
                        {fabric}
                        <button onClick={() => toggleArrayFilter(fabric, setSelectedFabrics)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedOccasions.map(occasion => (
                      <Badge key={occasion} variant="secondary" className="gap-1">
                        {occasion}
                        <button onClick={() => toggleArrayFilter(occasion, setSelectedOccasions)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {inStockOnly && (
                      <Badge variant="secondary" className="gap-1">
                        In Stock
                        <button onClick={() => setInStockOnly(false)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-luxury transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-deep">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                )}
              </div>
              
              <CardHeader>
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
              
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {product.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-luxury-deep">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-luxury-charcoal line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Notify When Available"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-luxury-charcoal mb-4">No products found</p>
            <p className="text-luxury-charcoal mb-6">Try adjusting your search or filters</p>
            <Button onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Store Visit CTA */}
      <div className="bg-luxury-cream py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-luxury-deep mb-4">
            Want Something Custom?
          </h2>
          <p className="text-xl text-luxury-charcoal mb-6">
            Visit our store for unlimited customization options and personal consultations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg">
              Find Store Location
            </Button>
            <Button variant="outline" size="lg">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;