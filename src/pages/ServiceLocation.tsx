import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Bike,
  CheckCircle,
  ChevronRight,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/sections/Footer';
import { Link } from 'react-router-dom';

const velosLocation = [
  {
    name: 'VTT Semi-Rigide',
    price: 35,
    image: '/images/bike-hardtail.jpg',
    features: ['Cadre aluminium', 'Fourche suspendue', '21 vitesses', 'Freins à disque'],
    ideal: 'Parcours faciles à modérés',
  },
  {
    name: 'VTT Tout-Suspendu',
    price: 55,
    image: '/images/bike-santa-cruz.jpg',
    features: ['Double suspension', 'Freins hydrauliques', '12 vitesses', 'Pneus tubeless'],
    ideal: 'Parcours techniques et enduro',
    popular: true,
  },
  {
    name: 'VTT Électrique',
    price: 75,
    image: '/images/bike-emtb.jpg',
    features: ['Moteur Bosch', 'Batterie 625Wh', 'Autonomie 80km', 'Assistance 4 modes'],
    ideal: 'Sorties longues et dénivelés',
  },
  {
    name: 'Vélo de Route',
    price: 45,
    image: '/images/bike-road.jpg',
    features: ['Cadre carbone', 'Shimano 105', 'Roues aluminium', 'Poids léger'],
    ideal: 'Routes et cols des Alpes',
  },
];

const forfaits = [
  {
    name: '1/2 Journée',
    duration: '4h',
    description: 'Idéal pour une première découverte',
  },
  {
    name: 'Journée',
    duration: '8h',
    description: 'La formule la plus populaire',
    popular: true,
  },
  {
    name: 'Week-end',
    duration: '2 jours',
    description: 'Pour profiter pleinement du terrain',
  },
  {
    name: 'Semaine',
    duration: '7 jours',
    description: 'Le meilleur rapport qualité/prix',
    discount: '-20%',
  },
];

const inclus = [
  'Casque homologué fourni',
  'Kit de réparation',
  'Antivol',
  'Carte des circuits',
  'Assurance incluse',
  'Conseils personnalisés',
];

export default function ServiceLocation() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedForfait, setSelectedForfait] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.animate-in') || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Breadcrumb items={[{ label: 'Services', href: '/#services' }, { label: 'Location' }]} />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img 
          src="/images/service-location.jpg" 
          alt="Location vélos Côte d'Azur" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <div className="animate-in flex items-center gap-2 mb-4">
              <Bike className="w-5 h-5 text-[#E30613]" />
              <span className="text-sm uppercase tracking-wider">Location</span>
            </div>
            <h1 className="animate-in text-4xl md:text-5xl font-bold mb-4">
              Louez un Vélo d'Exception
            </h1>
            <p className="animate-in text-lg text-white/80 mb-6">
              Des vélos haut de gamme pour explorer la Côte d'Azur et les Alpes-Maritimes. 
              Livraison possible sur la région.
            </p>
            <div className="animate-in flex flex-wrap gap-4">
              <a href="#velos" className="btn-primary">
                Voir les vélos
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#tarifs" className="btn-outline !border-white !text-white bg-white/10 hover:bg-white hover:!text-[#1A1A1A]">
                Nos tarifs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Vélos disponibles' },
              { value: '4.8/5', label: 'Satisfaction clients' },
              { value: '15min', label: 'Mise à disposition' },
              { value: '7/7', label: 'Ouvert en saison' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-[#E30613] mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vélos */}
      <section id="velos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1A1A] mb-3">Notre Flotte</h2>
            <p className="text-body max-w-2xl mx-auto">
              Des vélos récents, parfaitement entretenus et prêts à rouler
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {velosLocation.map((velo) => (
              <div 
                key={velo.name}
                onClick={() => setSelectedBike(velo.name)}
                className={`group bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedBike === velo.name ? 'border-[#E30613] shadow-xl' : 'border-[#E5E5E5] hover:border-[#E30613]/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 relative">
                    <img 
                      src={velo.image} 
                      alt={velo.name}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                    {velo.popular && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-[#E30613] text-white text-xs font-semibold rounded-full">
                        Le + populaire
                      </span>
                    )}
                  </div>
                  <div className="sm:w-3/5 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-[#1A1A1A]">{velo.name}</h3>
                      <button
                        className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#6B6B6B] transition-colors"
                        title="Plus d'informations"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-[#6B6B6B] mb-3">{velo.ideal}</p>
                    <ul className="space-y-1 mb-4">
                      {velo.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                          <CheckCircle className="w-4 h-4 text-[#E30613]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-[#E30613]">{velo.price}€</span>
                        <span className="text-sm text-[#6B6B6B]">/jour</span>
                      </div>
                      <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm hover:bg-[#E30613] transition-colors">
                        Sélectionner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1A1A] mb-3">Nos Forfaits</h2>
            <p className="text-body">Des tarifs dégressifs pour des locations plus longues</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forfaits.map((forfait) => (
              <div 
                key={forfait.name}
                onClick={() => setSelectedForfait(forfait.name)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                  selectedForfait === forfait.name 
                    ? 'bg-[#E30613] text-white' 
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                {forfait.popular && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedForfait === forfait.name ? 'bg-white text-[#E30613]' : 'bg-[#E30613] text-white'
                  }`}>
                    Populaire
                  </span>
                )}
                {forfait.discount && (
                  <span className={`absolute -top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedForfait === forfait.name ? 'bg-white text-[#E30613]' : 'bg-[#1A1A1A] text-white'
                  }`}>
                    {forfait.discount}
                  </span>
                )}
                <div className={`w-12 h-12 mb-4 flex items-center justify-center rounded-full ${
                  selectedForfait === forfait.name ? 'bg-white/20' : 'bg-[#F5F5F5]'
                }`}>
                  <Clock className={`w-6 h-6 ${selectedForfait === forfait.name ? 'text-white' : 'text-[#1A1A1A]'}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-1 ${selectedForfait === forfait.name ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {forfait.name}
                </h3>
                <p className={`text-sm mb-3 ${selectedForfait === forfait.name ? 'text-white/70' : 'text-[#6B6B6B]'}`}>
                  {forfait.description}
                </p>
                <p className={`text-2xl font-bold ${selectedForfait === forfait.name ? 'text-white' : 'text-[#E30613]'}`}>
                  {forfait.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclus */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section text-[#1A1A1A] mb-4">
                Tout est inclus
              </h2>
              <p className="text-body mb-8">
                Pas de mauvaise surprise, tout le nécessaire est fourni pour que vous 
                puissiez profiter pleinement de votre sortie en toute sécurité.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {inclus.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E30613]/10">
                      <CheckCircle className="w-4 h-4 text-[#E30613]" />
                    </div>
                    <span className="text-[#1A1A1A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/service-sorties.jpg" 
                alt="Sortie VTT" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Réservez votre vélo dès maintenant
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Les week-ends et vacances scolaires sont très demandés.
            Réservez à l'avance pour être sûr d'avoir le vélo qui vous convient.
          </p>
          <a href="tel:+33493740803" className="btn-primary inline-flex justify-center">
            Réserver par téléphone
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
