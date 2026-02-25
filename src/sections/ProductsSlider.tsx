import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MobileSlider } from '@/components/MobileSlider';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Trek Slash 9.9',
    category: 'VTT Enduro',
    price: '8 499 €',
    image: '/images/bike-enduro.jpg',
    badge: 'Nouveau',
    brand: 'Trek',
  },
  {
    id: 2,
    name: 'Scott Scale RC',
    category: 'VTT Cross-Country',
    price: '6 999 €',
    image: '/images/bike-xc.jpg',
    badge: null,
    brand: 'Scott',
  },
  {
    id: 3,
    name: 'Cannondale SuperSix',
    category: 'Vélo de Route',
    price: '5 499 €',
    image: '/images/bike-road.jpg',
    badge: 'Best-seller',
    brand: 'Cannondale',
  },
  {
    id: 4,
    name: 'Santa Cruz Hightower',
    category: 'VTT Trail',
    price: '7 299 €',
    image: '/images/bike-santa-cruz.jpg',
    badge: 'Promo',
    brand: 'Santa Cruz',
  },
  {
    id: 5,
    name: 'Orbea Rise M20',
    category: 'VTT Électrique',
    price: '5 999 €',
    image: '/images/bike-emtb.jpg',
    badge: null,
    brand: 'Orbea',
  },
  {
    id: 6,
    name: 'BMC Teammachine',
    category: 'Vélo de Route',
    price: '6 499 €',
    image: '/images/bike-aero.jpg',
    badge: 'Nouveau',
    brand: 'BMC',
  },
];

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] hover:border-transparent hover:shadow-xl transition-all duration-300">
      <div className="product-image-wrapper relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${
            product.badge === 'Promo' 
              ? 'bg-[#1A1A1A] text-white' 
              : 'bg-[#E30613] text-white'
          }`}>
            {product.badge}
          </span>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-full text-[#1A1A1A]">
            {product.brand}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2 group-hover:text-[#E30613] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[#E30613] font-bold text-xl">{product.price}</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E5E5] hover:border-[#E30613] hover:bg-[#E30613] hover:text-white transition-all">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductsSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="velos" ref={sectionRef} className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="heading-section text-[#1A1A1A] mb-2">Nos Vélos</h2>
            <p className="text-body max-w-xl">
              Une sélection des meilleurs vélos haut de gamme, choisis pour leur performance et leur fiabilité.
            </p>
          </div>
          <Link 
            to="/catalogue" 
            className="btn-primary mt-6 md:mt-0 self-start"
          >
            Voir tout le catalogue
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Products Grid (Desktop) / Slider (Mobile) */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Slider */}
        <MobileSlider 
          itemWidth={280} 
          gap={16}
          className="lg:hidden"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}
