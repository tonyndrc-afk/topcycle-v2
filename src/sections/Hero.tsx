import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(
      subheadingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Background Image */}
      <img
        src="/images/hero-bg.jpg"
        alt="Mountain bike action"
        className="hero-bg"
      />
      
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <h1
          ref={headingRef}
          className="heading-hero text-white font-extrabold mb-4 opacity-0"
        >
          L'ART DE LA PERFORMANCE
        </h1>
        
        <p
          ref={subheadingRef}
          className="text-lg md:text-xl text-white/90 mb-8 opacity-0"
        >
          VTT Haut de Gamme & Expertise Technique depuis 2010
        </p>
        
        <a
          ref={ctaRef}
          href="#velos"
          className="btn-primary opacity-0"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#velos')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Découvrir la collection
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
