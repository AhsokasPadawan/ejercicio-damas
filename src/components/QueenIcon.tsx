interface QueenIconProps {
  className?: string;
  isConflict?: boolean;
}

export function QueenIcon({ className = 'w-6 h-6', isConflict = false }: QueenIconProps) {
  const crownFillColor = isConflict ? '#f43f5e' : '#fbbf24';
  const crownStrokeColor = isConflict ? '#fda4af' : '#fef08a';

  return (
    <svg
      viewBox="0 0 45 45"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill={crownFillColor}
        fillRule="evenodd"
        stroke={crownStrokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-6-19-6 19-7-11 2 12" />
        <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 21 1 27 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4" />
        <path d="M11.5 30c3.5-1 18.5-1 22 0m-21.5 3.5c4-1 15-1 19 0m-18 3c4-.5 13-.5 17 0" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="14" cy="9" r="2" />
        <circle cx="22.5" cy="6" r="2" />
        <circle cx="31" cy="9" r="2" />
        <circle cx="39" cy="12" r="2" />
      </g>
    </svg>
  );
}
