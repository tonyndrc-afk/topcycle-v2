import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MobileSlider } from '@/components/MobileSlider';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Stéphane JANY',
    role: 'Le Boss',
    specialty: 'Vainqueur Tignes Airwaves 2008',
    image: '/images/team-stephane.jpg',
    social: '@stephane_topcycle',
  },
  {
    name: 'Thomas PARODI',
    role: 'Vendeur Expert',
    specialty: 'Enduro compétition',
    image: '/images/team-thomas.jpg',
    social: '@thomas_vtt',
  },
  {
    name: 'Ludovic ORSOLINO',
    role: 'Mécanicien',
    specialty: 'Montage sur-mesure',
    image: '/images/team-ludovic.jpg',
    social: '@ludo_meca',
  },
  {
    name: 'Christophe BOUILLON',
    role: 'Spécialiste Route',
    specialty: 'Grimpeur passionné',
    image: '/images/team-christophe.jpg',
    social: '@chris_grimpeur',
  },
];

function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="team-card group">
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full aspect-square object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <a 
              href={`https://instagram.com/${member.social.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white text-sm hover:text-[#E30613] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              {member.social}
            </a>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-[#1A1A1A] text-lg">{member.name}</h3>
      <p className="text-sm font-medium text-[#E30613] mb-1">{member.role}</p>
      <p className="text-sm text-[#6B6B6B]">{member.specialty}</p>
    </div>
  );
}

export function TeamSlider() {
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
    <section id="team" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="heading-section text-[#1A1A1A] mb-3">Notre Équipe d'Experts</h2>
          <p className="text-body max-w-2xl mx-auto">
            Des passionnés à votre service, avec des années d'expérience en compétition et en mécanique.
          </p>
        </div>

        {/* Team Grid (Desktop) / Slider (Mobile) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* Mobile Slider */}
        <MobileSlider 
          itemWidth={260} 
          gap={20}
          className="lg:hidden"
        >
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}
