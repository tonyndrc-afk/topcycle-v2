import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Trek Slash 9.9',
    category: 'VTT Enduro',
    price: '8 499 €',
    image: '/images/bike-enduro.jpg',
    badge: 'Nouveau',
  },
  {
    name: 'Scott Scale RC',
    category: 'VTT Cross-Country',
    price: '6 999 €',
    image: '/images/bike-xc.jpg',
    badge: null,
  },
  {
    name: 'Cannondale SuperSix',
    category: 'Vélo de Route',
    price: '5 499 €',
    image: '/images/bike-road.jpg',
    badge: 'Best-seller',
  },
];

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
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
    <section id="velos" ref={sectionRef} className="section bg-[#F5F5F5]">
      <div className="section-header">
        <h2 className="heading-section text-[#1A1A1A] mb-3">Nos Vélos</h2>
        <p className="text-body max-w-xl mx-auto">
          Une sélection des meilleurs vélos haut de gamme, choisis pour leur performance et leur fiabilité.
        </p>
      </div>

      <div className="products-grid max-w-5xl mx-auto">
        {products.map((product, index) => (
          <div
            key={product.name}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="product-card group"
          >
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                loading="lazy"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#E30613] text-white text-xs font-semibold rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            
            <div className="product-info">
              <p className="text-small mb-1">{product.category}</p>
              <h3 className="heading-card text-[#1A1A1A] mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="product-price">{product.price}</span>
                <button className="btn-outline text-sm py-2 px-4">
                  Voir détail
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="btn-primary">
          Voir tout le catalogue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
