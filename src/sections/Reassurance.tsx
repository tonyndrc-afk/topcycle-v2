import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, ShieldCheck, CreditCard, RotateCcw, HeadphonesIcon, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reassuranceItems = [
  {
    icon: Truck,
    title: 'Livraison gratuite',
    description: 'Dès 500€ d\'achat en France métropolitaine',
  },
  {
    icon: ShieldCheck,
    title: 'Garantie 2 ans',
    description: 'Sur tous nos vélos et équipements',
  },
  {
    icon: CreditCard,
    title: 'Paiement sécurisé',
    description: 'CB, PayPal, Apple Pay, 3x sans frais',
  },
  {
    icon: RotateCcw,
    title: 'Retour 30 jours',
    description: 'Satisfait ou remboursé',
  },
  {
    icon: HeadphonesIcon,
    title: 'Service client',
    description: 'Disponible 6j/7 par téléphone et email',
  },
  {
    icon: Award,
    title: 'Expert certifié',
    description: 'Mécaniciens formés par les marques',
  },
];

export function Reassurance() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {reassuranceItems.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F5F5F5] mb-3 group-hover:bg-[#E30613] group-hover:text-white transition-all duration-300">
                <item.icon className="w-5 h-5 text-[#1A1A1A] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-sm font-semibold text-[#1A1A1A] mb-1">{item.title}</h4>
              <p className="text-xs text-[#6B6B6B] leading-tight">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
