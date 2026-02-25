import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Wrench,
  CheckCircle,
  Clock,
  Calendar,
  Phone,
  ChevronRight,
  Star,
  Shield,
  Settings,
  Droplets,
  Cog
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/sections/Footer';

const services = [
  {
    icon: Settings,
    title: 'Révision Complète',
    price: 'À partir de 89€',
    description: 'Contrôle complet du vélo, réglage des freins et dérailleurs, graissage, pression des pneus.',
    duration: '45 min',
  },
  {
    icon: Droplets,
    title: 'Nettoyage Premium',
    price: 'À partir de 49€',
    description: 'Nettoyage complet du cadre, transmission et composants. Protection céramique en option.',
    duration: '1h',
  },
  {
    icon: Cog,
    title: 'Montage Sur-mesure',
    price: 'Sur devis',
    description: 'Assemblage personnalisé de votre vélo rêvé. Choix des composants, réglages ergonomiques.',
    duration: '2-3h',
  },
  {
    icon: Shield,
    title: 'Diagnostic Électronique',
    price: 'À partir de 29€',
    description: 'Analyse complète des systèmes électroniques, moteurs e-bike, diagnostics précis.',
    duration: '30 min',
  },
];

const garanties = [
  'Mécaniciens certifiés par les marques',
  'Pièces d\'origine garanties',
  'Devis gratuit et transparent',
  'Intervention express disponible',
  'Garantie 6 mois sur nos réparations',
  'Prêt de vélo pendant la réparation',
];

const avis = [
  {
    name: 'Jeff M.',
    note: 5,
    text: 'Service impeccable ! Mon vélo est comme neuf. Équipe professionnelle et rapide.',
    date: '2 semaines',
  },
  {
    name: 'Marie L.',
    note: 5,
    text: 'Révision complète faite en 45 minutes chrono. Très satisfaite du résultat.',
    date: '1 mois',
  },
  {
    name: 'Thomas P.',
    note: 5,
    text: 'Le montage sur-mesure de mon enduro est parfait. Merci Ludovic !',
    date: '2 mois',
  },
];

export default function ServiceAtelier() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleService = (title: string) => {
    setSelectedServices(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  useEffect(() => {
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.animate-in') || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demande de rendez-vous envoyée ! Nous vous contacterons rapidement.');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Breadcrumb items={[{ label: 'Services', href: '/#services' }, { label: 'Atelier' }]} />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img 
          src="/images/service-atelier.jpg" 
          alt="Atelier Topcycle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <div className="animate-in flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-[#E30613]" />
              <span className="text-sm uppercase tracking-wider">Notre Atelier</span>
            </div>
            <h1 className="animate-in text-4xl md:text-5xl font-bold mb-4">
              L'Art de la Mécanique
            </h1>
            <p className="animate-in text-lg text-white/80 mb-6">
              Un atelier professionnel équipé des meilleurs outils et piloté par des mécaniciens 
              passionnés et certifiés par les plus grandes marques.
            </p>
            <div className="animate-in flex flex-wrap gap-4">
              <a href="#rdv" className="btn-primary">
                Prendre rendez-vous
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#services" className="btn-outline !border-white !text-white hover:bg-white hover:!text-[#1A1A1A] bg-white/10">
                Nos prestations
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
              { value: '15+', label: 'Années d\'expérience' },
              { value: '5000+', label: 'Vélos réparés/an' },
              { value: '4.9/5', label: 'Note moyenne' },
              { value: '24h', label: 'Délai express' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-[#E30613] mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1A1A] mb-3">Nos Prestations</h2>
            <p className="text-body max-w-2xl mx-auto">
              De la simple révision au montage sur-mesure, nous prenons soin de votre vélo 
              avec la même passion que vous.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => {
              const isChecked = selectedServices.includes(service.title);
              return (
                <div
                  key={service.title}
                  className={`group bg-white rounded-2xl p-6 border-2 hover:shadow-xl transition-all cursor-pointer ${isChecked ? 'border-[#E30613] shadow-lg' : 'border-[#E5E5E5] hover:border-[#E30613]'}`}
                  onClick={() => toggleService(service.title)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl transition-colors ${isChecked ? 'bg-[#E30613] text-white' : 'bg-[#F5F5F5] group-hover:bg-[#E30613] group-hover:text-white'}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-[#1A1A1A]">{service.title}</h3>
                        <span className="text-[#E30613] font-bold text-xl">{service.price}</span>
                      </div>
                      <p className="text-[#6B6B6B] text-sm mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                          <Clock className="w-4 h-4" />
                          Durée : {service.duration}
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-[#E30613] border-[#E30613]' : 'border-[#E5E5E5]'}`}>
                          {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedServices.length > 0 && (
            <div className="mt-8 text-center animate-in">
              <a href="#rdv" className="btn-primary inline-flex">
                <Calendar className="w-5 h-5" />
                Prendre RDV — {selectedServices.length} prestation{selectedServices.length > 1 ? 's' : ''} sélectionnée{selectedServices.length > 1 ? 's' : ''}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section text-[#1A1A1A] mb-4">
                Pourquoi choisir notre atelier ?
              </h2>
              <p className="text-body mb-8">
                Chez Topcycle, chaque vélo mérite un traitement d'expert. Notre équipe de 
                mécaniciens passionnés met tout en œuvre pour vous offrir un service irréprochable.
              </p>
              <div className="space-y-4">
                {garanties.map((garantie) => (
                  <div key={garantie} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#E30613] flex-shrink-0" />
                    <span className="text-[#1A1A1A]">{garantie}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/bike-detail-drivetrain.jpg" 
                alt="Détail mécanique" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-section text-[#1A1A1A] text-center mb-10">
            Ce que disent nos clients
          </h2>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {avis.map((avis) => (
              <div key={avis.name} className="flex flex-col bg-white rounded-2xl p-6 border border-[#E5E5E5]">
                <div className="flex gap-1 mb-3">
                  {[...Array(avis.note)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E30613] text-[#E30613]" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] mb-4 flex-1">"{avis.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-medium text-[#1A1A1A]">{avis.name}</span>
                  <span className="text-sm text-[#6B6B6B]">il y a {avis.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RDV Form */}
      <section id="rdv" className="py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Prendre Rendez-vous</h2>
            <p className="text-white/60">
              Remplissez le formulaire ci-dessous, nous vous rappellerons sous 24h pour confirmer votre créneau.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Nom complet</label>
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613]"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Téléphone</label>
                <input 
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613]"
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Type de prestation</label>
                <select 
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613]"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Choisir un service</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Date souhaitée</label>
                <input 
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613]"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Message (optionnel)</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613]"
                placeholder="Décrivez votre besoin..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full btn-primary justify-center">
              <Calendar className="w-5 h-5" />
              Demander un rendez-vous
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#6B6B6B]">
              <Phone className="w-4 h-4" />
              <span>Ou appelez-nous au</span>
              <a href="tel:+33493740803" className="text-[#E30613] font-medium">04 93 74 08 03</a>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
