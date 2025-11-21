import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import AIStylist from './components/AIStylist';
import { Product, ViewState } from './types';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

// Mock Data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Oxford Executive",
    price: 185,
    category: "Men",
    image: "https://images.unsplash.com/photo-1593030761757-71bd90dbe3e4?q=80&w=1532&auto=format&fit=crop",
    description: "Premium cotton blend tailored for the modern boardroom."
  },
  {
    id: 2,
    name: "Silk Midnight Gown",
    price: 420,
    category: "Women",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1448&auto=format&fit=crop",
    description: "Flowing silk silhouette suitable for evening galas."
  },
  {
    id: 3,
    name: "Artisan Leather Weekender",
    price: 350,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=987&auto=format&fit=crop",
    description: "Hand-stitched full-grain leather for the discerning traveler."
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    price: 210,
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop",
    description: "Ultra-soft sustainable cashmere in a neutral sand tone."
  },
  {
    id: 5,
    name: "Velvet Dinner Jacket",
    price: 295,
    category: "Men",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    description: "Deep burgundy velvet with satin lapels."
  },
  {
    id: 6,
    name: "Gold Leaf Pendant",
    price: 150,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=987&auto=format&fit=crop",
    description: "18k gold plated leaf design, nature-inspired luxury."
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero setView={setCurrentView} />
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Featured Collections</h2>
                <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setCurrentView(ViewState.SHOP)}
                  className="text-stone-900 font-bold border-b-2 border-stone-900 hover:text-gold-600 hover:border-gold-600 transition-colors pb-1"
                >
                  VIEW ALL PRODUCTS
                </button>
              </div>
            </div>
          </>
        );

      case ViewState.SHOP:
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8">The Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </div>
        );

      case ViewState.STYLIST:
        return <AIStylist />;

      case ViewState.CART:
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 min-h-[60vh]">
            <div className="flex items-center mb-8">
              <button onClick={() => setCurrentView(ViewState.SHOP)} className="mr-4 text-stone-500 hover:text-stone-900">
                <ArrowLeft />
              </button>
              <h2 className="text-3xl font-serif font-bold text-stone-900">Your Shopping Bag</h2>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-stone-50 rounded-lg border border-stone-100">
                <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-xl text-stone-500">Your bag is currently empty.</p>
                <button 
                  onClick={() => setCurrentView(ViewState.SHOP)}
                  className="mt-6 px-6 py-2 bg-stone-900 text-white rounded hover:bg-stone-800 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-white border border-stone-100 rounded-lg shadow-sm">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                      <p className="text-stone-500 text-sm">{item.category}</p>
                      <p className="text-gold-600 font-bold mt-2">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-stone-400 hover:text-red-500 self-start"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <div className="border-t border-stone-200 pt-6 mt-8">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>${cart.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <button className="w-full py-4 bg-gold-600 text-white font-bold tracking-widest hover:bg-gold-500 transition-colors rounded-lg shadow-md">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} cartCount={cart.length} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-serif font-bold text-xl mb-4">KINGSLEY STYLE</h3>
            <p className="text-sm">Redefining modern luxury through sustainable practices and timeless design.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
              <li>AI Stylist Help</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-stone-800 border-none text-white px-4 py-2 w-full focus:ring-1 focus:ring-gold-500"
              />
              <button className="bg-gold-600 text-white px-4 py-2 hover:bg-gold-500">JOIN</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs">
          © 2024 Kingsley Style. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
