import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rate: number) => void;
  size?: number;
  color?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  size = 24,
  color = '#facc15',
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const percent = Math.min(1, Math.max(0, rating - i)).toFixed(1);
    return (
      <Star
        key={i}
        size={size}
        fill={`url(#star-gradient-${i})`}
        stroke={color}
        onClick={() => onRate && onRate(i + 1)}
      >
        <defs>
          <linearGradient
            id={`star-gradient-${i}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset={`${+percent * 100}%`}
              stopColor={color}
            />
            <stop
              offset={`${+percent * 100}%`}
              stopColor="transparent"
            />
          </linearGradient>
        </defs>
      </Star>
    );
  });

  return <div className="flex">{stars}</div>;
};
