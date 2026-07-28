import { Star } from 'lucide-react';

type Props = {
  rating: number;
};

export function RatingStars({ rating }: Props) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'fill-orange-400 text-orange-400' : 'text-orange-400'
          }`}
        />
      ))}
    </div>
  );
}
