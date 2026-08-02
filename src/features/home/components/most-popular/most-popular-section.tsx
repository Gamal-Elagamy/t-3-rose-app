import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import SectionTitle from '@/shared/components/section-title';
import {
  MostPopularProductsGridSkeleton,
  OccasionTabsSkeleton,
} from '@/features/products/skeletons/most-popular-section.skeleton';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { MostPopularProductPanelsSlot, MostPopularTabListSlot } from './most-popular-content';
import { MostPopularSharedTabsProvider, ViewMoreLink } from './most-popular-shared-tabs';
import { getMostPopularOccasionProducts } from '../../lib/utils/most-popular-data';

export default async function MostPopularSection() {
  // Translation
  const t = await getTranslations('home');
  const occasionProductsPromise = getMostPopularOccasionProducts();

  return (
    <MostPopularSharedTabsProvider>
      <div className="mx-auto max-w-11/12 my-27">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SectionTitle title={t('mostPopular')} />

          <ProductsErrorBoundary>
            <Suspense fallback={<OccasionTabsSkeleton />}>
              <MostPopularTabListSlot occasionProductsPromise={occasionProductsPromise} />
            </Suspense>
          </ProductsErrorBoundary>
        </div>

        <ProductsErrorBoundary>
          <Suspense fallback={<MostPopularProductsGridSkeleton />}>
            <MostPopularProductPanelsSlot occasionProductsPromise={occasionProductsPromise} />
          </Suspense>
        </ProductsErrorBoundary>

        <ViewMoreLink />
      </div>
    </MostPopularSharedTabsProvider>
  );
}
