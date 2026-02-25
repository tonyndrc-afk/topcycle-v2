import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ShoppingBag,
  CheckCircle,
  ChevronRight,
  Search,
  ArrowUpRight,
  Send
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/sections/Footer';
import { Link } from 'react-router-dom';

const marques = ['Trek', 'Santa Cruz', 'Cannondale', 'Scott', 'Orbea', 'BMC', 'Specialized', 'Giant'];

const categories = [
  { name: 'VTT Enduro', image: '/images/bike-enduro.jpg', count: 12 },
  { name: 'VTT Trail', image: '/images/bike-santa-cruz.jpg', count: 8 },
  { name: 'Cross-Country', image: '/images/bike-xc.jpg', count: 6 },
  { name: 'Vélos Route', image: '/images/bike-road.jpg', count: 15 },
  { name: 'VTT Électrique', image: '/images/bike-emtb.jpg', count: 9 },
  { name: 'Vélos Gravel', image: '/images/bike-hardtail.jpg', count: 5 },
];

const avantages = [
  {
    title: 'Conseil Expert',
    description: 'Nos vendeurs passionnés vous guident dans le choix de votre vélo idéal selon votre pratique et votre budget.',
  },
  {
    title: 'Essai Sur Place',
    description: 'Testez les vélos avant d\'acheter. Zone d\'essai privée et accompagnement personnalisé.',
  },
  {
    title: 'Financements',
    description: 'Paiement en 3x ou 4x sans frais. Solutions de crédit adaptées à votre budget.',
  },
  {
    title: 'Reprise Ancien Vélo',
    description: 'Reprise de votre ancien vélo pour l\'achat d\'un neuf. Estimation gratuite en magasin.',
  },
];

const bikesEnVedette = [
  { name: 'Trek Slash 9.9', price: '8 499 €', image: '/images/bike-enduro.jpg', badge: 'Nouveau' },
  { name: 'Santa Cruz Hightower', price: '7 299 €', image: '/images/bike-santa-cruz.jpg', badge: 'Promo' },
  { name: 'Cannondale SuperSix', price: '5 499 €', image: '/images/bike-road.jpg', badge: 'Best-seller' },
  { name: 'Orbea Rise M20', price: '5 999 €', image: '/images/bike-emtb.jpg', badge: null },
];

export default function ServiceVente() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Votre message a été envoyé ! Nous vous répondrons sous 24h.');
  };

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
      <Breadcrumb items={[{ label: 'Services', href: '/#services' }, { label: 'Vente' }]} />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img 
          src="/images/service-vente.jpg" 
          alt="Showroom Topcycle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <div className="animate-in flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-[#E30613]" />
              <span className="text-sm uppercase tracking-wider">Nos Vélos</span>
            </div>
            <h1 className="animate-in text-4xl md:text-5xl font-bold mb-4">
              Trouvez Votre Vélo Idéal
            </h1>
            <p className="animate-in text-lg text-white/80 mb-6">
              VTT, route, urbain ou électrique - découvrez notre sélection des meilleures 
              marques avec conseil personnalisé et essai sur place.
            </p>
            <div className="animate-in flex flex-wrap gap-4">
              <Link to="/catalogue" className="btn-primary">
                Voir le catalogue
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="#categories" className="btn-outline !border-white !text-white bg-white/10 hover:bg-white hover:!text-[#1A1A1A]">
                Explorer les catégories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Rechercher un vélo, une marque..."
                className="w-full pl-12 pr-4 py-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link
              to="/catalogue"
              className="flex items-center gap-2 px-6 py-4 bg-[#E30613] text-white rounded-xl font-semibold hover:bg-[#c20510] transition-colors whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </Link>
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm uppercase tracking-wider text-[#6B6B6B] mb-6">
            Nos Marques Partenaires
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {marques.map((marque) => (
              <span 
                key={marque} 
                className="text-xl md:text-2xl font-bold text-[#1A1A1A] hover:text-[#E30613] transition-colors cursor-pointer"
              >
                {marque}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section id="categories" className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1A1A] mb-3">Nos Catégories</h2>
            <p className="text-body">Trouvez le vélo qui correspond à votre pratique</p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory scrollbar-none">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/catalogue"
                className="group relative flex-none w-72 h-64 rounded-2xl overflow-hidden snap-start"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-white/70 text-sm">{cat.count} modèles</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* En Vedette */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="heading-section text-[#1A1A1A]">En Vedette</h2>
              <p className="text-body">Nos coups de cœur du moment</p>
            </div>
            <Link to="/catalogue" className="hidden md:flex items-center gap-2 text-[#E30613] font-medium hover:underline">
              Voir tout
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bikesEnVedette.map((bike) => (
              <div key={bike.name} className="group bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] hover:shadow-xl transition-all">
                <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
                  <img 
                    src={bike.image} 
                    alt={bike.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {bike.badge && (
                    <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full ${
                      bike.badge === 'Promo' ? 'bg-[#1A1A1A] text-white' : 'bg-[#E30613] text-white'
                    }`}>
                      {bike.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1A1A1A] group-hover:text-[#E30613] transition-colors">{bike.name}</h3>
                  <p className="text-[#E30613] font-bold mt-1">{bike.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/catalogue" className="btn-outline">
              Voir tout le catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-section text-white text-center mb-12">
            Pourquoi acheter chez Topcycle ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((av) => (
              <div key={av.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#E30613]/20">
                  <CheckCircle className="w-7 h-7 text-[#E30613]" />
                </div>
                <h3 className="font-semibold text-white mb-2">{av.title}</h3>
                <p className="text-white/60 text-sm">{av.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
              Besoin de conseils personnalisés ?
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Nos vendeurs experts sont là pour vous guider dans le choix de votre vélo idéal.
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="bg-[#F5F5F5] rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Nom complet</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-xl focus:outline-none focus:border-[#E30613]"
                  placeholder="Jean Dupont"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-xl focus:outline-none focus:border-[#E30613]"
                  placeholder="jean@email.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Téléphone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-xl focus:outline-none focus:border-[#E30613]"
                placeholder="06 12 34 56 78"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Votre projet</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-xl focus:outline-none focus:border-[#E30613]"
                placeholder="Décrivez votre pratique, budget, type de vélo recherché..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full btn-primary justify-center">
              <Send className="w-5 h-5" />
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
