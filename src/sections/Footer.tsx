import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-grid">
        {/* Brand & Contact */}
        <div className="footer-section">
          <div className="mb-6">
            <Logo color="light" showTagline />
          </div>
          
          <p className="text-[#888] mb-6 leading-relaxed">
            L'art de la performance. VTT haut de gamme, service premium et expertise technique depuis 2010.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E30613] flex-shrink-0 mt-0.5" />
              <span>32 Avenue de Nice, 06600 Antibes</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#E30613] flex-shrink-0" />
              <span>+33 4 93 74 08 03</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#E30613] flex-shrink-0" />
              <span>contact@topcycle.fr</span>
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="footer-section">
          <h4>Horaires</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#888] flex-shrink-0 mt-1" />
              <div>
                <p><span className="text-white">Lundi :</span> 10h - 19h</p>
                <p><span className="text-white">Mardi :</span> 10h - 19h</p>
                <p><span className="text-white">Mercredi :</span> 10h - 19h</p>
                <p><span className="text-white">Jeudi :</span> 10h - 19h</p>
                <p><span className="text-white">Vendredi :</span> 10h - 19h</p>
                <p><span className="text-white">Samedi :</span> 10h - 19h</p>
                <p><span className="text-white">Dimanche :</span> Fermé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>Navigation</h4>
          <a href="#/">Accueil</a>
          <a href="#/services/atelier">Atelier</a>
          <a href="#/services/vente">Vente</a>
          <a href="#/services/location">Location</a>
          <a href="#/services/sorties">Sorties VTT</a>
          <a href="#/catalogue">Catalogue</a>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Services</h4>
          <a href="#/services/atelier">Atelier Réparation</a>
          <a href="#/services/vente">Vente de Vélos</a>
          <a href="#/services/location">Location</a>
          <a href="#/services/sorties">Sorties VTT</a>
          <a href="#/services/atelier">Entretien Premium</a>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p className="text-[#666] text-sm">
          © 2024 Topcycle. Tous droits réservés.
        </p>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/topcycleantibes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#888] hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://facebook.com/topcycle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#888] hover:text-white transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#666]">
          <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
