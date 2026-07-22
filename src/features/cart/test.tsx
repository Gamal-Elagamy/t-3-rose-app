'use client';

//just for testing the add to cart functionality

// import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart';

// export default function TestCart() {
//   const { mutate, data, error, isPending } = useAddToCart();

//   return (
//     <div>
//       <button
//         onClick={() =>
//           mutate({
//             productId: 'ba64d196-4ac3-40bd-be26-b24fbceb6db0',
//             quantity: 1,
//           })
//         }
//       >
//         Add To Cart
//       </button>

//       {isPending && <p>Loading...</p>}

//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

//       {error && <pre>{String(error)}</pre>}
//     </div>
//   );
// }

//just for testing the add to wishlist functionality

// import { useAddToWishlist } from '../wish-list/hooks/use-add-to-wishlist';

// export default function TestWishlist() {
//   const { mutate, data, error, isPending } = useAddToWishlist();

//   return (
//     <div>
//       <button
//         onClick={() =>
//           mutate({
//             productId: 'bfae7e33-283c-4f4a-9f29-388ed46ead49',
//           })
//         }
//       >
//         Add To Wishlist
//       </button>

//       {isPending && <p>Loading...</p>}

//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

//       {error && <pre>{String(error)}</pre>}
//     </div>
//   );
// }

// just for testing the remove from wishlist functionality

import { useRemoveFromWishlist } from '../wish-list/hooks/use-remove-from-wishlist';

export default function TestRemoveWishlist() {
  const { mutate, data, error, isPending } = useRemoveFromWishlist();

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            id: 'bb9e660d-9480-434e-bfd8-24282540a845',
          })
        }
      >
        Remove From Wishlist
      </button>

      {isPending && <p>Loading...</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {error && <pre>{String(error)}</pre>}
    </div>
  );
}
