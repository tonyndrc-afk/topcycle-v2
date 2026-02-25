import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: 'Accueil', href: '#/' },
  { label: 'Atelier', href: '#/services/atelier' },
  { label: 'Vente', href: '#/services/vente' },
  { label: 'Location', href: '#/services/location' },
  { label: 'Sorties VTT', href: '#/services/sorties' },
  { label: 'Catalogue', href: '#/catalogue' },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`menu-overlay ${isOpen ? 'active' : ''}`}>
      {menuLinks.map((link, index) => (
        <Link
          key={link.href}
          ref={(el) => {
            if (el) linksRef.current[index] = el;
          }}
          to={link.href.replace('#', '')}
          className="menu-link"
          onClick={handleLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
