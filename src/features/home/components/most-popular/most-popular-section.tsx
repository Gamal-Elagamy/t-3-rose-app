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

  // Data
  const occasionProductsPromise = getMostPopularOccasionProducts();

  return (
    <MostPopularSharedTabsProvider>
      <section className="mx-auto my-27 max-w-11/12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
      </section>
    </MostPopularSharedTabsProvider>
  );
}
