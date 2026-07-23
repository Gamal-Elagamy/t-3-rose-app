'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '../types/products';

interface ProductImageGalleryProps {
  product: IProduct;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.cover);
  const images = [product.cover, ...JSON.parse(product.gallery || '[]')];

  return (
    <div className="space-y-2.5">
      {/* Main Image */}
      <div className="relative w-152 h-100 rounded-lg overflow-hidden bg-zinc-100">
        <Image
          src={selectedImage}
          alt={product.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto w-full pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative shrink-0 w-1/6 h-28 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === image ? 'border-maroon-600 border-2' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} - view ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              {selectedImage !== image && (
                <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
