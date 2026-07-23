'use client';
// just for testing the add, remove from wishlist functionality

import { useState } from 'react';

import { useAddToWishlist } from './hooks/use-add-to-wishlist';
import { useRemoveFromWishlist } from './hooks/use-remove-from-wishlist';

export default function TestWishlistToggle() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState('');

  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveFromWishlist();

  const productId = '66cd8b24-45a2-45db-91d7-824624d94c75';

  const handleToggle = () => {
    if (isWishlisted) {
      removeMutation.mutate(
        {
          id: wishlistItemId,
        },
        {
          onSuccess: () => {
            setWishlistItemId('');
            setIsWishlisted(false);
          },
        }
      );

      return;
    }

    addMutation.mutate(
      {
        productId,
      },
      {
        onSuccess: (data) => {
          if (!data) return;

          console.log(data);

          setWishlistItemId(data.wishlistItem.id);
          setIsWishlisted(true);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleToggle}
        disabled={addMutation.isPending || removeMutation.isPending}
        className="rounded bg-pink-500 px-4 py-2 text-white"
      >
        {isWishlisted ? '💖 Remove From Wishlist' : '🤍 Add To Wishlist'}
      </button>

      <div>
        <p>
          <strong>isWishlisted:</strong> {String(isWishlisted)}
        </p>

        <p>
          <strong>wishlistItemId:</strong> {wishlistItemId || 'No Item'}
        </p>
      </div>

      {addMutation.isPending && <p>Adding...</p>}
      {removeMutation.isPending && <p>Removing...</p>}

      {addMutation.error && <p>{String(addMutation.error)}</p>}

      {removeMutation.error && <p>{String(removeMutation.error)}</p>}
    </div>
  );
}
