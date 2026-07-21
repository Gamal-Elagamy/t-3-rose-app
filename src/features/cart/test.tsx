// 'use client';

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
