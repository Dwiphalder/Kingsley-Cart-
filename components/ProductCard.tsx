import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-100 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-white text-stone-900 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold-600 hover:text-white"
          aria-label="Add to cart"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-5">
        <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-light text-sm line-clamp-2 w-2/3">
            {product.description}
          </span>
          <span className="text-lg font-bold text-stone-900">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
