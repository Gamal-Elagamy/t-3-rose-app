import { useSession } from 'next-auth/react';
import { ReviewCard } from './review-card';

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type Props = {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
};

export function Reviews({ averageRating, totalReviews, reviews }: Props) {




  return (
    <section className="space-y-6">
      <div>
       <h2 className="relative inline-block text-[42px] font-extrabold leading-none text-[#7A1F26] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-[#7A1F26] after:content-['']">
  Product Reviews
</h2>

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
