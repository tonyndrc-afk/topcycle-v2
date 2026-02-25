import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Accueil', href: '/' }, ...items];
  const hasIntermediate = allItems.length > 2;

  return (
    <nav aria-label="Fil d'ariane" className="bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol
          className="flex items-center gap-0.5 py-3 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isFirst = index === 0;
            // On mobile : masquer les items intermédiaires (ni premier, ni dernier)
            const hiddenOnMobile = hasIntermediate && !isFirst && !isLast;

            return (
              <li
                key={index}
                className={`flex items-center gap-0.5 ${hiddenOnMobile ? 'hidden sm:flex' : 'flex'}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Séparateur */}
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[#BBBBBB] flex-shrink-0 mx-0.5"
                    aria-hidden="true"
                  />
                )}

                {/* Ellipsis mobile entre home et page courante */}
                {hasIntermediate && index === allItems.length - 1 && (
                  <span className="flex items-center gap-0.5 sm:hidden text-[#BBBBBB]">
                    <span className="text-xs tracking-widest">···</span>
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mx-0.5" aria-hidden="true" />
                  </span>
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    itemProp="name"
                    className="text-[#1A1A1A] font-medium max-w-[160px] sm:max-w-xs truncate"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href || '/'}
                    itemProp="item"
                    className={`flex items-center gap-1 text-[#6B6B6B] hover:text-[#E30613] transition-colors rounded px-1 py-0.5 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]`}
                  >
                    {isFirst && (
                      <Home className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                    )}
                    {/* Label Accueil visible desktop seulement */}
                    <span
                      itemProp="name"
                      className={isFirst ? 'hidden sm:inline' : ''}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
