import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Users,
  ChevronRight,
  MapPin,
  Clock,
  Mountain,
  Calendar,
  Phone,
  Star,
  Zap,
  Bike
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/sections/Footer';
import { Link } from 'react-router-dom';

const sorties = [
  {
    name: 'Découverte Cap d\'Antibes',
    niveau: 'Facile',
    niveauColor: 'bg-green-500',
    distance: '15 km',
    duree: '2h',
    denivele: '+150m',
    prix: 'Gratuit',
    image: '/images/service-location.jpg',
    description: 'Une boucle accessible à tous le long de la côte, parfaite pour débuter.',
    prochaine: 'Samedi 15 mars 2026 à 10h00',
  },
  {
    name: 'Boucle de la Brague',
    niveau: 'Modéré',
    niveauColor: 'bg-yellow-500',
    distance: '25 km',
    duree: '3h',
    denivele: '+400m',
    prix: 'Gratuit',
    image: '/images/hero-bg.jpg',
    description: 'Single-tracks variés en forêt avec de belles vues sur la vallée.',
    prochaine: 'Dimanche 16 mars 2026 à 09h00',
  },
  {
    name: 'Enduro Villeneuve',
    niveau: 'Difficile',
    niveauColor: 'bg-orange-500',
    distance: '35 km',
    duree: '4h',
    denivele: '+800m',
    prix: 'Gratuit',
    image: '/images/service-sorties.jpg',
    description: 'Descentes techniques et engagées pour riders confirmés.',
    prochaine: 'Samedi 22 mars 2026 à 14h00',
  },
  {
    name: 'La Turbo Électrique',
    niveau: 'Modéré',
    niveauColor: 'bg-yellow-500',
    distance: '45 km',
    duree: '4h',
    denivele: '+1200m',
    prix: 'Gratuit',
    image: '/images/bike-emtb.jpg',
    description: 'Grande boucle en e-bike pour découvrir les plus beaux spots.',
    prochaine: 'Dimanche 23 mars 2026 à 10h00',
    eBike: true,
  },
];

const niveaux = [
  { name: 'Facile', color: 'bg-green-500', description: 'Accessible à tous, chemins larges' },
  { name: 'Modéré', color: 'bg-yellow-500', description: 'Quelques passages techniques' },
  { name: 'Difficile', color: 'bg-orange-500', description: 'Technique et physique' },
  { name: 'Expert', color: 'bg-red-500', description: 'Réservé aux riders confirmés' },
];

const avantages = [
  {
    icon: Users,
    title: 'Encadrement Pro',
    description: 'Un guide diplômé d\'état accompagne chaque sortie',
  },
  {
    icon: MapPin,
    title: 'Circuits Testés',
    description: 'Des parcours sélectionnés et balisés pour tous niveaux',
  },
  {
    icon: Zap,
    title: 'Ambiance Conviviale',
    description: 'Rencontrez d\'autres passionnés et partagez votre passion',
  },
  {
    icon: Bike,
    title: 'Prêt de Vélo',
    description: 'Pas de vélo ? Louez-en un pour la sortie à prix réduit',
  },
];

const temoignages = [
  {
    name: 'Pierre D.',
    text: 'Superbe sortie samedi ! Le guide connaît parfaitement les trails et l\'ambiance était top.',
    note: 5,
  },
  {
    name: 'Sophie M.',
    text: 'J\'ai débuté le VTT avec leurs sorties "facile". Très bien encadré, je progresse à mon rythme.',
    note: 5,
  },
  {
    name: 'Lucas B.',
    text: 'La sortie enduro est incroyable ! Des descentes techniques et un groupe au top.',
    note: 5,
  },
];

export default function ServiceSorties() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSortie, setSelectedSortie] = useState<string | null>(null);

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
      <Breadcrumb items={[{ label: 'Services', href: '/#services' }, { label: 'Sorties VTT' }]} />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img 
          src="/images/service-sorties.jpg" 
          alt="Sorties VTT Topcycle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <div className="animate-in flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#E30613]" />
              <span className="text-sm uppercase tracking-wider">Communauté</span>
            </div>
            <h1 className="animate-in text-4xl md:text-5xl font-bold mb-4">
              Rejoignez Nos Sorties VTT
            </h1>
            <p className="animate-in text-lg text-white/80 mb-6">
              Des sorties encadrées pour tous niveaux, du débutant au rider confirmé. 
              Découvrez les meilleurs spots de la Côte d'Azur en groupe.
            </p>
            <div className="animate-in flex flex-wrap gap-4">
              <a href="#sorties" className="btn-primary">
                Voir les sorties
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#niveaux" className="btn-outline !border-white !text-white bg-white/10 hover:bg-white hover:!text-[#1A1A1A]">
                Les niveaux
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
              { value: '50+', label: 'Sorties / an' },
              { value: '500+', label: 'Participants' },
              { value: '4', label: 'Niveaux' },
              { value: '100%', label: 'Gratuit' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-[#E30613] mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sorties */}
      <section id="sorties" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1A1A] mb-3">Prochaines Sorties</h2>
            <p className="text-body max-w-2xl mx-auto">
              Inscrivez-vous gratuitement aux sorties de la semaine
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sorties.map((sortie) => (
              <div 
                key={sortie.name}
                onClick={() => setSelectedSortie(sortie.name)}
                className={`group bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedSortie === sortie.name ? 'border-[#E30613] shadow-xl' : 'border-[#E5E5E5] hover:border-[#E30613]/50'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={sortie.image} 
                    alt={sortie.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full mb-2 ${sortie.niveauColor}`}>
                        {sortie.niveau}
                      </span>
                      <h3 className="text-xl font-bold text-white">{sortie.name}</h3>
                    </div>
                    {sortie.eBike && (
                      <span className="px-2 py-1 bg-[#E30613] text-white text-xs font-semibold rounded-full">
                        E-Bike
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[#6B6B6B] text-sm mb-4">{sortie.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-[#1A1A1A]">
                      <MapPin className="w-4 h-4 text-[#E30613]" />
                      {sortie.distance}
                    </div>
                    <div className="flex items-center gap-1 text-[#1A1A1A]">
                      <Clock className="w-4 h-4 text-[#E30613]" />
                      {sortie.duree}
                    </div>
                    <div className="flex items-center gap-1 text-[#1A1A1A]">
                      <Mountain className="w-4 h-4 text-[#E30613]" />
                      {sortie.denivele}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                    <div>
                      <span className="text-sm text-[#6B6B6B]">Prochaine sortie</span>
                      <p className="font-medium text-[#1A1A1A]">{sortie.prochaine}</p>
                    </div>
                    <button className="px-4 py-2 bg-[#E30613] text-white rounded-lg text-sm font-medium hover:bg-[#c20510] transition-colors">
                      Réserver ma place
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niveaux */}
      <section id="niveaux" className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1A1A] mb-3">Les Niveaux</h2>
            <p className="text-body">Choisissez la sortie qui correspond à votre niveau</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {niveaux.map((niveau) => (
              <div key={niveau.name} className="bg-white rounded-2xl p-6 text-center">
                <div className={`w-4 h-4 mx-auto mb-3 rounded-full ${niveau.color}`} />
                <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">{niveau.name}</h3>
                <p className="text-sm text-[#6B6B6B]">{niveau.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-section text-[#1A1A1A] text-center mb-12">
            Pourquoi rouler avec nous ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((av) => (
              <div key={av.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#E30613]/10">
                  <av.icon className="w-7 h-7 text-[#E30613]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{av.title}</h3>
                <p className="text-sm text-[#6B6B6B]">{av.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-section text-white text-center mb-10">
            Ils nous ont rejoints
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {temoignages.map((t) => (
              <div key={t.name} className="bg-white/5 backdrop-blur rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.note)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E30613] text-[#E30613]" />
                  ))}
                </div>
                <p className="text-white/80 mb-4">"{t.text}"</p>
                <p className="text-white font-medium">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            Prêt à rouler avec nous ?
          </h2>
          <p className="text-body mb-8 max-w-xl mx-auto">
            Inscription gratuite et sans engagement. Rejoignez la communauté Topcycle 
            et découvrez les meilleurs spots VTT de la région.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33493740803" className="btn-primary justify-center">
              <Phone className="w-5 h-5" />
              S'inscrire par téléphone
            </a>
            <a href="#sorties" className="btn-outline justify-center">
              <Calendar className="w-5 h-5" />
              Réserver ma place
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
