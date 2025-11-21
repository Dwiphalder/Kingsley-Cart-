import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative bg-stone-900 overflow-hidden h-[85vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          alt="Fashion Model"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Elegance is not standing out, <br/> but being remembered.
          </h1>
          <p className="text-xl text-stone-200 mb-10 font-light max-w-lg">
            Discover the new Kingsley Collection. Timeless pieces curated for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setView(ViewState.SHOP)}
              className="px-8 py-4 bg-gold-600 text-white font-bold tracking-widest hover:bg-gold-500 transition-all duration-300 flex items-center justify-center group"
            >
              SHOP COLLECTION
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setView(ViewState.STYLIST)}
              className="px-8 py-4 border border-white text-white font-bold tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300"
            >
              MEET KINGSLEY AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
