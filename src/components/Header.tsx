import { useState, useEffect } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

interface HeaderProps {
  onMenuToggle: (isOpen: boolean) => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : 'header-transparent'}`}>
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <Logo color={isScrolled ? 'dark' : 'light'} />
      </Link>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
        <button 
          className={`p-2.5 rounded-xl transition-colors ${isScrolled ? 'text-[#1A1A1A] hover:bg-[#F5F5F5]' : 'text-white hover:bg-white/10'}`}
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
        
        <button 
          className={`p-2.5 rounded-xl transition-colors ${isScrolled ? 'text-[#1A1A1A] hover:bg-[#F5F5F5]' : 'text-white hover:bg-white/10'}`}
          aria-label="Account"
        >
          <User className="w-5 h-5" />
        </button>
        
        <button
          className="p-2.5 rounded-xl transition-colors ml-1 bg-white text-[#1A1A1A] hover:bg-[#F5F5F5] shadow-sm"
          onClick={() => onMenuToggle(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}
