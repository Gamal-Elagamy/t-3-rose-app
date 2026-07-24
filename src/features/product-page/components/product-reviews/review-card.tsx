import { RatingStars } from "./rating-stars";

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  return (
    <div className="p-6">
      <div className="flex gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold">
          {review.userName.charAt(0)}
        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">
                {review.userName}
              </h4>

              <p className="text-sm text-muted-foreground">
                {review.createdAt}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <RatingStars rating={review.rating} />

            <span className="font-medium">
              ({review.rating})
            </span>
          </div>

          <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
            {review.comment}
          </p>

        </div>
      </div>
    </div>
  );
}