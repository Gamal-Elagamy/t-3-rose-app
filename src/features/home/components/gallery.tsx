'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';

import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import SectionTitle from '@/shared/components/section-title';

import frame74 from '@/assets/images/home/gallery/Frame74.png';
import frame75 from '@/assets/images/home/gallery/Frame75.png';
import frame76 from '@/assets/images/home/gallery/Frame76.png';
import frame78 from '@/assets/images/home/gallery/Frame78.png';
import frame79 from '@/assets/images/home/gallery/Frame79.png';
import frame80 from '@/assets/images/home/gallery/Frame80.png';

export default function Gallery() {
  const t = useTranslations('home.gallery');

  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  const openImage = (image: StaticImageData) => {
    setSelectedImage(image);
  };

  return (
    <>
      <section className="mx-auto w-11/12">
        <div className="mb-8 flex flex-col items-center gap-2">
          <p className="text-sm font-medium uppercase tracking-wider text-ds-text-secondary">
            {t('label')}
          </p>

          <SectionTitle title={t('title')} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => openImage(frame74)}
              className="block overflow-hidden"
            >
              <Image
                src={frame74}
                alt="Frame74"
                className="object-cover transition duration-300 hover:scale-[1.01]"
              />
            </button>

            <button
              type="button"
              onClick={() => openImage(frame79)}
              className="block overflow-hidden"
            >
              <Image
                src={frame79}
                alt="Frame79"
                className="object-cover transition duration-300 hover:scale-[1.01]"
              />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => openImage(frame75)}
              className="block overflow-hidden"
            >
              <Image
                src={frame75}
                alt="Frame75"
                className="object-cover transition duration-300 hover:scale-[1.01]"
              />
            </button>

            <button
              type="button"
              onClick={() => openImage(frame78)}
              className="block overflow-hidden"
            >
              <Image
                src={frame78}
                alt="Frame78"
                className="object-cover transition duration-300 hover:scale-[1.01]"
              />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => openImage(frame76)}
              className="block overflow-hidden"
            >
              <Image
                src={frame76}
                alt="Frame76"
                className="object-cover transition duration-300 hover:scale-[1.01]"
              />
            </button>

            <button
              type="button"
              onClick={() => openImage(frame80)}
              className="block overflow-hidden"
            >
              <Image
                src={frame80}
                alt="Frame80"
                className="object-cover transition duration-300 hover:scale-[1.01]"
              />
            </button>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">Gallery Image</DialogTitle>

          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Gallery Preview"
              className="h-auto w-full rounded-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
