import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    name: 'Jeff M.',
    location: 'Mandelieu',
    rating: 5,
    date: '15 janvier 2024',
    text: 'Rapide, confortable et léger. Merci pour la préparation de mon Cannondale SuperSix EVO. C\'est un régal ! Le service en magasin est impeccable.',
    verified: true,
    bike: 'Cannondale SuperSix EVO',
  },
  {
    id: 2,
    name: 'Frédéric B.',
    location: 'Nice',
    rating: 5,
    date: '3 février 2024',
    text: 'Résultat de la Cyclo : arrivée dans le groupe de tête à 8, je fais 3e au scratch sur 1100 au départ avec une moyenne de 33,3 malgré 2 neutralisations. Merci à Topcycle pour la préparation de ce superbe vélo !',
    verified: true,
    bike: 'Cannondale SystemSix',
  },
  {
    id: 3,
    name: 'Marie L.',
    location: 'Antibes',
    rating: 5,
    date: '28 janvier 2024',
    text: 'Équipe passionnée et très compétente. Mon vélo a été parfaitement réglé pour mes sorties VTT. Je recommande vivement l\'atelier !',
    verified: true,
    bike: 'Trek Fuel EX',
  },
  {
    id: 4,
    name: 'Thomas P.',
    location: 'Cannes',
    rating: 5,
    date: '10 février 2024',
    text: 'Superbe expérience d\'achat. Conseils avisés, patience et expertise. Le Santa Cruz Bronson est exactement ce qu\'il me fallait pour l\'enduro.',
    verified: true,
    bike: 'Santa Cruz Bronson',
  },
];

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.reviews-container'),
        { y: 40, opacity: 0 },
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

  const nextReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section ref={sectionRef} className="py-16 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reviews-container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <BadgeCheck className="w-5 h-5 text-[#E30613]" />
            <span className="text-sm font-semibold text-[#E30613] uppercase tracking-wider">
              Avis Vérifiés
            </span>
          </div>
          <h2 className="heading-section text-[#1A1A1A] mb-2">Ce que disent nos clients</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-[#E30613] text-[#E30613]" />
              ))}
            </div>
            <span className="text-sm text-[#6B6B6B]">
              <strong className="text-[#1A1A1A]">4.9/5</strong> sur 127 avis
            </span>
          </div>
        </div>

        {/* Review Card */}
        <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-sm">
          <Quote className="absolute top-6 left-6 w-10 h-10 text-[#E5E5E5]" />
          
          <div className="relative z-10">
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= currentReview.rating ? 'fill-[#E30613] text-[#E30613]' : 'text-[#E5E5E5]'}`} 
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-lg text-[#1A1A1A] leading-relaxed mb-6 min-h-[80px]">
              "{currentReview.text}"
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A1A1A]">{currentReview.name}</span>
                  {currentReview.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#E30613] bg-[#E30613]/10 px-2 py-0.5 rounded-full">
                      <BadgeCheck className="w-3 h-3" />
                      Vérifié
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B6B6B]">
                  {currentReview.location} • {currentReview.date}
                </p>
                <p className="text-sm text-[#E30613] font-medium mt-1">
                  {currentReview.bike}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E5E5] hover:border-[#E30613] hover:text-[#E30613] transition-colors"
                  aria-label="Avis précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E5E5] hover:border-[#E30613] hover:text-[#E30613] transition-colors"
                  aria-label="Avis suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-6 bg-[#E30613]' 
                    : 'bg-[#E5E5E5] hover:bg-[#CCCCCC]'
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
