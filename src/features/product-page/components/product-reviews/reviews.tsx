import FormReview from './form-review';
import { IProductId } from './product-reviews';
import { ReviewsList } from './reviews-list';

export default async function ReviewsItem({ productId }: IProductId) {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Reviews */}
      <div className="review w-full lg:w-3/5 h-92 flex flex-col gap-2.5 overflow-y-auto py-2 px-1.75">
        <ReviewsList productId={productId} />
      </div>

      {/* Review Form */}
      <FormReview productId={productId} />
    </div>
  );
}
