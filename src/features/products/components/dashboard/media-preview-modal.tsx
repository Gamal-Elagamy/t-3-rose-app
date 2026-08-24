'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { getMediaUrl } from '../../lib/product-media.utils';
import Image from 'next/image';

interface MediaPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

export default function MediaPreviewModal({
  open,
  onOpenChange,
  images,
  initialIndex = 0,
  title = 'Image preview',
}: MediaPreviewModalProps) {
  // State
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!images.length) return null;

  // Variables
  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex];

  // Functions
  const goToPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };
  const goToNext = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <Dialog key={open ? 'open' : 'closed'} open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-4xl"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Close Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full text-ds-text-muted transition-colors hover:text-ds-text-plain"
            aria-label="Close preview"
          >
            <X className="size-5" />
          </button>

          {/* Image */}
          <div className="overflow-hidden rounded-3xl bg-ds-bg-plain p-12">
            <div className="flex min-h-105 items-center justify-center rounded-2xl border border-black/10">
              <Image
                width={1000}
                height={1000}
                src={getMediaUrl(currentImage)}
                alt={`${title} ${currentIndex + 1}`}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            {/* Navigation */}
            {hasMultiple && (
              <div className="mt-4 flex items-center justify-between px-2">
                {/* Thumbnails */}
                <div className="flex items-center gap-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                      className={cn(
                        'size-2.5 rounded-full transition-colors',
                        index === currentIndex ? 'bg-ds-bg-primary' : 'bg-ds-border-soft'
                      )}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous image"
                    className="flex size-9 items-center justify-center rounded-full border border-ds-border-primary text-ds-text-primary transition-colors hover:bg-ds-bg-primary-fade"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next image"
                    className="flex size-9 items-center justify-center rounded-full border border-ds-border-primary text-ds-text-primary transition-colors hover:bg-ds-bg-primary-fade"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
