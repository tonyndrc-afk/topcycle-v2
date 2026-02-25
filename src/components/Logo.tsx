interface LogoProps {
  className?: string;
  color?: 'dark' | 'light';
  showTagline?: boolean;
}

export function Logo({ className = '', color = 'dark', showTagline = false }: LogoProps) {
  const textColor = color === 'dark' ? '#1A1A1A' : '#FFFFFF';
  const taglineColor = color === 'dark' ? '#6B6B6B' : '#AAAAAA';

  return (
    <svg 
      viewBox="0 0 200 60" 
      className={`h-10 w-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* TC Logo Mark */}
      <g transform="translate(0, 5)">
        {/* T */}
        <path 
          d="M5 8 L35 8 L35 16 L22 16 L22 38 L12 38 L12 16 L5 16 Z" 
          fill="#E30613"
        />
        {/* C */}
        <path 
          d="M32 8 L55 8 L55 16 L38 16 L38 30 L55 30 L55 38 L32 38 C27 38 24 34 24 30 L24 16 C24 12 27 8 32 8 Z" 
          fill="#E30613"
        />
      </g>
      
      {/* TOPCYCLE Text */}
      <text 
        x="65" 
        y="30" 
        fill={textColor}
        fontSize="20" 
        fontWeight="800" 
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.02em"
        fontStyle="italic"
      >
        TOPCYCLE
      </text>
      
      {/* FACTORY RACING Tagline */}
      {showTagline && (
        <text 
          x="65" 
          y="48" 
          fill={taglineColor}
          fontSize="10" 
          fontWeight="600" 
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.15em"
        >
          FACTORY RACING
        </text>
      )}
    </svg>
  );
}

export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 40" 
      className={`h-8 w-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* T */}
      <path 
        d="M5 4 L30 4 L30 10 L20 10 L20 28 L12 28 L12 10 L5 10 Z" 
        fill="#E30613"
      />
      {/* C */}
      <path 
        d="M28 4 L48 4 L48 10 L34 10 L34 22 L48 22 L48 28 L28 28 C24 28 22 25 22 22 L22 10 C22 7 24 4 28 4 Z" 
        fill="#E30613"
      />
    </svg>
  );
}
