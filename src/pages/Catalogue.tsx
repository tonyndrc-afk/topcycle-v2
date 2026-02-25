import { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid3X3,
  LayoutList,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';

// Types
interface Bike {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  specs: {
    frame: string;
    fork: string;
    groupset: string;
    wheels: string;
  };
}

// Data
const bikes: Bike[] = [
  {
    id: 1,
    slug: 'trek-slash-99',
    name: 'Slash 9.9',
    brand: 'Trek',
    category: 'Enduro',
    price: 8499,
    image: '/images/bike-enduro.jpg',
    badge: 'Nouveau',
    specs: { frame: 'Carbon OCLV', fork: 'Fox Factory 38', groupset: 'Shimano XTR', wheels: 'Bontrager Line Pro 30' },
  },
  {
    id: 2,
    slug: 'scott-scale-rc-world-cup',
    name: 'Scale RC World Cup',
    brand: 'Scott',
    category: 'Cross-Country',
    price: 6999,
    image: '/images/bike-xc.jpg',
    specs: { frame: 'Carbon HMX', fork: 'RockShox SID Ultimate', groupset: 'SRAM XX1 Eagle', wheels: 'Syncros Silverton 1.0' },
  },
  {
    id: 3,
    slug: 'cannondale-supersix-evo',
    name: 'SuperSix EVO Hi-MOD',
    brand: 'Cannondale',
    category: 'Route',
    price: 5499,
    image: '/images/bike-road.jpg',
    badge: 'Best-seller',
    specs: { frame: 'Hi-MOD Carbon', fork: 'Cannondale Slice', groupset: 'Shimano Dura-Ace', wheels: 'HollowGram R-S 50' },
  },
  {
    id: 4,
    slug: 'santa-cruz-hightower',
    name: 'Hightower C S',
    brand: 'Santa Cruz',
    category: 'Trail',
    price: 7299,
    image: '/images/bike-santa-cruz.jpg',
    badge: 'Promo -10%',
    specs: { frame: 'Carbon C', fork: 'Fox 36 Float', groupset: 'SRAM GX Eagle', wheels: 'RaceFace AR Offset 30' },
  },
  {
    id: 5,
    slug: 'orbea-rise-m20',
    name: 'Rise M20',
    brand: 'Orbea',
    category: 'VTT Électrique',
    price: 5999,
    image: '/images/bike-emtb.jpg',
    specs: { frame: 'Carbon OMR', fork: 'Fox 34 Float', groupset: 'Shimano XT', wheels: 'RaceFace AR 30c' },
  },
  {
    id: 6,
    slug: 'bmc-teammachine-slr01',
    name: 'Teammachine SLR01',
    brand: 'BMC',
    category: 'Route',
    price: 6499,
    image: '/images/bike-aero.jpg',
    badge: 'Nouveau',
    specs: { frame: 'Carbon ACE+', fork: 'BMC ICS', groupset: 'SRAM Force eTap', wheels: 'DT Swiss PRC 1400' },
  },
  {
    id: 7,
    slug: 'trek-procaliber-99',
    name: 'Procaliber 9.9',
    brand: 'Trek',
    category: 'Cross-Country',
    price: 4999,
    image: '/images/bike-hardtail.jpg',
    specs: { frame: 'Carbon OCLV', fork: 'Fox Factory 32', groupset: 'Shimano XTR', wheels: 'Bontrager Kovee XXX' },
  },
];

const brands = ['Tous', 'Trek', 'Santa Cruz', 'Cannondale', 'Scott', 'Orbea', 'BMC', 'Specialized', 'Giant'];
const categories = ['Tous', 'Enduro', 'Trail', 'Cross-Country', 'VTT Électrique', 'Route', 'Gravel'];
const priceRanges = [
  { label: 'Tous les prix', min: 0, max: Infinity },
  { label: 'Moins de 3 000 €', min: 0, max: 3000 },
  { label: '3 000 € - 5 000 €', min: 3000, max: 5000 },
  { label: '5 000 € - 7 000 €', min: 5000, max: 7000 },
  { label: 'Plus de 7 000 €', min: 7000, max: Infinity },
];
const sortOptions = [
  { value: 'recommended', label: 'Recommandés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' },
];

export default function Catalogue() {
  const [selectedBrand, setSelectedBrand] = useState('Tous');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Filter and sort bikes
  const filteredBikes = useMemo(() => {
    let result = [...bikes];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(bike => 
        bike.name.toLowerCase().includes(query) ||
        bike.brand.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrand !== 'Tous') {
      result = result.filter(bike => bike.brand === selectedBrand);
    }

    // Category filter
    if (selectedCategory !== 'Tous') {
      result = result.filter(bike => bike.category === selectedCategory);
    }

    // Price filter
    result = result.filter(bike => 
      bike.price >= selectedPriceRange.min && bike.price <= selectedPriceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [selectedBrand, selectedCategory, selectedPriceRange, sortBy, searchQuery]);

  const activeFiltersCount = [
    selectedBrand !== 'Tous',
    selectedCategory !== 'Tous',
    selectedPriceRange.min !== 0 || selectedPriceRange.max !== Infinity,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedBrand('Tous');
    setSelectedCategory('Tous');
    setSelectedPriceRange(priceRanges[0]);
    setSearchQuery('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Breadcrumb items={[{ label: 'Catalogue' }]} />

      {/* Hero Banner */}
      <div className="bg-[#1A1A1A] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Notre Catalogue
          </h1>
          <p className="text-[#AAAAAA] max-w-xl">
            Découvrez notre sélection de vélos haut de gamme des meilleures marques. 
            Expertise et conseil personnalisé pour trouver le vélo parfait.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Rechercher un vélo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/10 transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#E30613] transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-[#E30613] text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E30613] cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white border border-[#E5E5E5] rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#E30613] text-white' : 'hover:bg-[#F5F5F5]'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#E30613] text-white' : 'hover:bg-[#F5F5F5]'}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#6B6B6B]">
            <span className="font-semibold text-[#1A1A1A]">{filteredBikes.length}</span> vélo{filteredBikes.length !== 1 ? 's' : ''} trouvé{filteredBikes.length !== 1 ? 's' : ''}
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#E30613] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Marque</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="w-4 h-4 text-[#E30613] border-[#E5E5E5] focus:ring-[#E30613] cursor-pointer"
                      />
                      <span className={`text-sm group-hover:text-[#E30613] transition-colors ${selectedBrand === brand ? 'text-[#E30613] font-medium' : 'text-[#6B6B6B]'}`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Catégorie</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-[#E30613] border-[#E5E5E5] focus:ring-[#E30613] cursor-pointer"
                      />
                      <span className={`text-sm group-hover:text-[#E30613] transition-colors ${selectedCategory === category ? 'text-[#E30613] font-medium' : 'text-[#6B6B6B]'}`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Prix</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === range}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4 text-[#E30613] border-[#E5E5E5] focus:ring-[#E30613] cursor-pointer"
                      />
                      <span className={`text-sm group-hover:text-[#E30613] transition-colors ${selectedPriceRange === range ? 'text-[#E30613] font-medium' : 'text-[#6B6B6B]'}`}>
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredBikes.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-[#6B6B6B] mb-4">Aucun vélo ne correspond à vos critères</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredBikes.map(bike => (
                  <Link
                    key={bike.id}
                    to={`/produit/${bike.slug}`}
                    className={`group bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] hover:border-transparent hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : 'block'
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden bg-[#F5F5F5] ${
                      viewMode === 'list' ? 'w-48 md:w-64 flex-shrink-0' : 'aspect-[3/4]'
                    }`}>
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {bike.badge && (
                        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${
                          bike.badge.includes('Promo') 
                            ? 'bg-[#1A1A1A] text-white' 
                            : 'bg-[#E30613] text-white'
                        }`}>
                          {bike.badge}
                        </span>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-full text-[#1A1A1A]">
                          {bike.brand}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">{bike.category}</p>
                      <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2 group-hover:text-[#E30613] transition-colors">
                        {bike.name}
                      </h3>
                      
                      {/* Specs - List view only */}
                      {viewMode === 'list' && (
                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                          <div>
                            <span className="text-[#6B6B6B]">Cadre:</span>{' '}
                            <span className="text-[#1A1A1A]">{bike.specs.frame}</span>
                          </div>
                          <div>
                            <span className="text-[#6B6B6B]">Fourche:</span>{' '}
                            <span className="text-[#1A1A1A]">{bike.specs.fork}</span>
                          </div>
                          <div>
                            <span className="text-[#6B6B6B]">Groupe:</span>{' '}
                            <span className="text-[#1A1A1A]">{bike.specs.groupset}</span>
                          </div>
                          <div>
                            <span className="text-[#6B6B6B]">Roues:</span>{' '}
                            <span className="text-[#1A1A1A]">{bike.specs.wheels}</span>
                          </div>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[#E30613] font-bold text-xl">{formatPrice(bike.price)}</span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg group-hover:bg-[#E30613] transition-colors text-sm">
                          Voir détail
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E5E5E5] p-4 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Filtres</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-[#F5F5F5] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Marque</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="brand-mobile"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="w-4 h-4 text-[#E30613] border-[#E5E5E5]"
                      />
                      <span className={`text-sm ${selectedBrand === brand ? 'text-[#E30613] font-medium' : 'text-[#6B6B6B]'}`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Catégorie</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category-mobile"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-[#E30613] border-[#E5E5E5]"
                      />
                      <span className={`text-sm ${selectedCategory === category ? 'text-[#E30613] font-medium' : 'text-[#6B6B6B]'}`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Prix</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price-mobile"
                        checked={selectedPriceRange === range}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4 text-[#E30613] border-[#E5E5E5]"
                      />
                      <span className={`text-sm ${selectedPriceRange === range ? 'text-[#E30613] font-medium' : 'text-[#6B6B6B]'}`}>
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-[#E5E5E5] p-4 space-y-3">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full btn-primary justify-center"
              >
                Voir {filteredBikes.length} résultat{filteredBikes.length !== 1 ? 's' : ''}
              </button>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 text-[#6B6B6B] hover:text-[#E30613] transition-colors"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
