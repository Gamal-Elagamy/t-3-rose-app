import MostPopularSection from '@/features/home/components/most-popular/most-popular-section';
import { ReviewCard } from './review-card';

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type Props = {
  averageRating?: number;
  totalReviews?: number;
  reviews: Review[];
};

export function Reviews({ averageRating, totalReviews, reviews }: Props) {
  return (
    <section className="space-y-6">
      <div>
        <MostPopularSection />

        <p className="mt-4 text-lg font-medium">General rating:</p>

        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold">{averageRating}</span>

          <span className="text-muted-foreground">({totalReviews} ratings)</span>
        </div>
      </div>

      <div className="divide-y rounded-lg border">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
