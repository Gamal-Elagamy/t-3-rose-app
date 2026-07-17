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
  const t = await getTranslations('home');
  const occasionProductsPromise = getMostPopularOccasionProducts();

  return (
    <MostPopularSharedTabsProvider>
      <div className="mx-auto max-w-10/12 my-34">
        <div className="flex items-center justify-between">
          <SectionTitle title={t('mostPopular')} />

          <Suspense fallback={<OccasionTabsSkeleton />}>
            <MostPopularTabListSlot occasionProductsPromise={occasionProductsPromise} />
          </Suspense>
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
