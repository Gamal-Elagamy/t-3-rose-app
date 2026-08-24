'use client';

import { useState } from 'react';
import { ImageIcon, Images } from 'lucide-react';
import { Control, useWatch } from 'react-hook-form';
import { ProductFormData } from '../../types/products';
import MediaPreviewModal from './media-preview-modal';

interface UpdateProductMediaLinksProps {
  control: Control<ProductFormData>;
}

export default function UpdateProductMediaLinks({ control }: UpdateProductMediaLinksProps) {
  // Form Watch
  const cover = useWatch({ control, name: 'cover' });
  const gallery = useWatch({ control, name: 'gallery' });

  // State
  const [coverPreviewOpen, setCoverPreviewOpen] = useState(false);
  const [galleryPreviewOpen, setGalleryPreviewOpen] = useState(false);

  const coverUrl = cover || '';
  const galleryUrls = gallery.filter(Boolean);

  if (!coverUrl && !galleryUrls.length) {
    return null;
  }

  return (
    <>
      {/* Modal Toggle Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {coverUrl && (
          <button
            type="button"
            onClick={() => setCoverPreviewOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-ds-border-soft bg-ds-bg-plain p-2 text-sm font-medium text-blue-600 transition-colors hover:bg-ds-bg-soft"
          >
            <ImageIcon className="size-4" />
            View product cover
          </button>
        )}

        {galleryUrls.length > 0 && (
          <button
            type="button"
            onClick={() => setGalleryPreviewOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-ds-border-soft bg-ds-bg-plain p-2 text-sm font-medium text-blue-600 transition-colors hover:bg-ds-bg-soft"
          >
            <Images className="size-4" />
            View product gallery
          </button>
        )}
      </div>

      {/* Cover Modal */}
      <MediaPreviewModal
        open={coverPreviewOpen}
        onOpenChange={setCoverPreviewOpen}
        images={[coverUrl]}
        title="Product cover"
      />

      {/* Gallery Modal */}
      <MediaPreviewModal
        open={galleryPreviewOpen}
        onOpenChange={setGalleryPreviewOpen}
        images={galleryUrls}
        title="Product gallery"
      />
    </>
  );
}
