import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Brand logos as SVG components
const brands = [
  { name: 'Trek', svg: <TrekLogo /> },
  { name: 'Santa Cruz', svg: <SantaCruzLogo /> },
  { name: 'Specialized', svg: <SpecializedLogo /> },
  { name: 'Cannondale', svg: <CannondaleLogo /> },
  { name: 'Scott', svg: <ScottLogo /> },
  { name: 'Giant', svg: <GiantLogo /> },
  { name: 'Orbea', svg: <OrbeaLogo /> },
  { name: 'BMC', svg: <BMCLogo /> },
];

function TrekLogo() {
  return (
    <svg viewBox="0 0 120 30" className="h-8 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">
        TREK
      </text>
    </svg>
  );
}

function SantaCruzLogo() {
  return (
    <svg viewBox="0 0 140 30" className="h-7 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
        SANTA CRUZ
      </text>
    </svg>
  );
}

function SpecializedLogo() {
  return (
    <svg viewBox="0 0 140 30" className="h-7 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
        SPECIALIZED
      </text>
    </svg>
  );
}

function CannondaleLogo() {
  return (
    <svg viewBox="0 0 140 30" className="h-7 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
        CANNONDALE
      </text>
    </svg>
  );
}

function ScottLogo() {
  return (
    <svg viewBox="0 0 100 30" className="h-8 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">
        SCOTT
      </text>
    </svg>
  );
}

function GiantLogo() {
  return (
    <svg viewBox="0 0 100 30" className="h-8 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">
        GIANT
      </text>
    </svg>
  );
}

function OrbeaLogo() {
  return (
    <svg viewBox="0 0 100 30" className="h-7 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="18" fontWeight="700" fontFamily="Inter, sans-serif">
        ORBEA
      </text>
    </svg>
  );
}

function BMCLogo() {
  return (
    <svg viewBox="0 0 80 30" className="h-8 w-auto">
      <text x="0" y="22" fill="currentColor" fontSize="20" fontWeight="700" fontFamily="Inter, sans-serif">
        BMC
      </text>
    </svg>
  );
}

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Double the brands array for seamless loop
  const doubledBrands = [...brands, ...brands];

  return (
    <section id="marques" ref={sectionRef} className="py-12 border-y border-[#E5E5E5] bg-white">
      <div className="section-header mb-8">
        <p className="text-small uppercase tracking-widest">Nos Marques Partenaires</p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {doubledBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="marquee-logo inline-flex items-center text-[#1A1A1A]"
            >
              {brand.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
