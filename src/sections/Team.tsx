import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Stéphane JANY',
    role: 'Le Boss',
    specialty: 'Vainqueur Tignes Airwaves 2008',
    image: '/images/team-stephane.jpg',
  },
  {
    name: 'Thomas PARODI',
    role: 'Vendeur Expert',
    specialty: 'Enduro compétition',
    image: '/images/team-thomas.jpg',
  },
  {
    name: 'Ludovic ORSOLINO',
    role: 'Mécanicien',
    specialty: 'Montage sur-mesure',
    image: '/images/team-ludovic.jpg',
  },
  {
    name: 'Christophe BOUILLON',
    role: 'Spécialiste Route',
    specialty: 'Grimpeur passionné',
    image: '/images/team-christophe.jpg',
  },
];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="section">
      <div className="section-header">
        <h2 className="heading-section text-[#1A1A1A] mb-3">Notre Équipe d'Experts</h2>
        <p className="text-body max-w-xl mx-auto">
          Des passionnés à votre service, avec des années d'expérience en compétition et en mécanique.
        </p>
      </div>

      <div className="team-grid max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="team-card"
          >
            <img
              src={member.image}
              alt={member.name}
              className="team-image"
              loading="lazy"
            />
            <h3 className="heading-card text-[#1A1A1A]">{member.name}</h3>
            <p className="text-sm font-medium text-[#E30613] mb-1">{member.role}</p>
            <p className="text-small">{member.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
