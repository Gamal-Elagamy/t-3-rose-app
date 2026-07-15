'use client';
import { Button } from '@/shared/components/ui/button';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { useState } from 'react';

export default function AddToWishlist() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <>
      {isWishlisted ? (
        <Button
          className="absolute top-2 left-2 flex items-center justify-center text-white bg-zinc-800 rounded-full h-7.5 p-2.5 gap-0.75 cursor-pointer hover:bg-zink-800"
          onClick={() => setIsWishlisted(false)}
        >
          <HeartMinus className="w-4.5 h-4.5" />
          <p>Remove from wishlist</p>
        </Button>
      ) : (
        <Button
          className="absolute top-2 left-2 w-7.5 h-7.5 rounded-full bg-white text-maroon-600 hover:bg-white cursor-pointer flex items-center justify-center"
          onClick={() => setIsWishlisted(true)}
        >
          <HeartPlus className="w-4.5 h-4.5" />
        </Button>
      )}
    </>
  );
}
