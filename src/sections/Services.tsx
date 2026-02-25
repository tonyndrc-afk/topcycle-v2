import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, ShoppingBag, Bike, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Wrench,
    title: 'Atelier',
    description: 'Réparation & Entretien premium pour tous types de vélos. Service rapide et garanti.',
    link: '/services/atelier',
  },
  {
    icon: ShoppingBag,
    title: 'Vente',
    description: 'VTT, route, urbain et électrique. Les meilleures marques sélectionnées pour vous.',
    link: '/services/vente',
  },
  {
    icon: Bike,
    title: 'Location',
    description: 'Vélos haut de gamme à la journée. Livraison possible sur la Côte d\'Azur.',
    link: '/services/location',
  },
  {
    icon: Users,
    title: 'Sorties VTT',
    description: 'Rejoignez notre communauté. Sorties guidées pour tous niveaux chaque week-end.',
    link: '/services/sorties',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

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
          stagger: 0.1,
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
    <section id="services" ref={sectionRef} className="section">
      <div className="section-header">
        <h2 className="heading-section text-[#1A1A1A] mb-3">Nos Services</h2>
        <p className="text-body max-w-xl mx-auto">
          Une expertise complète pour tous vos besoins cyclistes, de la réparation à la location.
        </p>
      </div>

      <div className="bento-grid max-w-4xl mx-auto">
        {services.map((service, index) => (
          <Link
            key={service.title}
            to={service.link}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="bento-card group block"
          >
            <div className="bento-icon">
              <service.icon className="w-6 h-6" />
            </div>
            
            <h3 className="heading-card text-[#1A1A1A] mb-2 flex items-center gap-2">
              {service.title}
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            
            <p className="text-small">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
