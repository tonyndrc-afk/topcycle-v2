import { useRef, useState, useEffect, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileSliderProps {
  children: ReactNode[];
  itemWidth?: number;
  gap?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function MobileSlider({
  children,
  itemWidth = 280,
  gap = 16,
  showDots = true,
  showArrows = true,
  className = '',
}: MobileSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Update current index based on scroll position
      const newIndex = Math.round(scrollLeft / (itemWidth + gap));
      setCurrentIndex(Math.min(newIndex, children.length - 1));
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', updateScrollButtons, { passive: true });
      updateScrollButtons();
      return () => slider.removeEventListener('scroll', updateScrollButtons);
    }
  }, [itemWidth, gap, children.length]);

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const targetScroll = index * (itemWidth + gap);
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const scrollPrev = () => {
    scrollToIndex(Math.max(0, currentIndex - 1));
  };

  const scrollNext = () => {
    scrollToIndex(Math.min(children.length - 1, currentIndex + 1));
  };

  // On desktop, render as normal grid
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start"
            style={{ width: itemWidth, marginRight: index < children.length - 1 ? gap : 0 }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Mobile) */}
      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-all ${
              canScrollLeft 
                ? 'opacity-100 hover:bg-[#E30613] hover:text-white' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-all ${
              canScrollRight 
                ? 'opacity-100 hover:bg-[#E30613] hover:text-white' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-6 bg-[#E30613]' 
                  : 'w-2 bg-[#E5E5E5]'
              }`}
              aria-label={`Aller à l'élément ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
