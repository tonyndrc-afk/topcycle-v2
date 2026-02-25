import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';

import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Marquee } from '@/sections/Marquee';
import { TeamSlider } from '@/sections/TeamSlider';
import { ProductsSlider } from '@/sections/ProductsSlider';
import { Reviews } from '@/sections/Reviews';
import { Reassurance } from '@/sections/Reassurance';
import { Footer } from '@/sections/Footer';

import Catalogue from '@/pages/Catalogue';
import ServiceAtelier from '@/pages/ServiceAtelier';
import ServiceVente from '@/pages/ServiceVente';
import ServiceLocation from '@/pages/ServiceLocation';
import ServiceSorties from '@/pages/ServiceSorties';
import FicheProduit from '@/pages/FicheProduit';
import ReservationEssai from '@/pages/ReservationEssai';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Home Page Component
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <Marquee />
        <TeamSlider />
        <ProductsSlider />
        <Reviews />
        <Reassurance />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/produit/:id" element={<FicheProduit />} />
        <Route path="/services/atelier" element={<ServiceAtelier />} />
        <Route path="/services/vente" element={<ServiceVente />} />
        <Route path="/services/location" element={<ServiceLocation />} />
        <Route path="/services/sorties" element={<ServiceSorties />} />
        <Route path="/essai-en-magasin" element={<ReservationEssai />} />
      </Routes>
    </Router>
  );
}

export default App;
