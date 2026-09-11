'use client';

import dynamic from 'next/dynamic';

const AddressMap = dynamic(() => import('./address-map'), {
  ssr: false,

  loading: () => (
    <div className="flex h-80 items-center justify-center rounded-xl border">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-ds-border-muted border-t-ds-text-primary"
        aria-label="Loading map"
      />
    </div>
  ),
});

export default AddressMap;
