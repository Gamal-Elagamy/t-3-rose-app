'use client';

// just for testing the add to cart functionality

import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart';

export default function TestCart() {
  const { mutate, data, error, isPending } = useAddToCart();

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            productId: '6cfab107-138e-43a9-b02d-3f5ee9b1f3b8',
            quantity: 1,
          })
        }
      >
        Add To Cart
      </button>

      {isPending && <p>Loading...</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {error && <pre>{String(error)}</pre>}
    </div>
  );
}
