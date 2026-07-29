import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import BannerHomePage from '@/features/home/components/hero-section/banner-section/banner-section';
import OccasionsSection from '@/features/home/components/hero-section/occasions-section/occasions-section';
import FeaturesSection from '@/features/home/components/features-section/features-section';
import BestSellerSection from '@/features/home/components/best-seller/best-seller-section';
import MostPopularSection from '@/features/home/components/most-popular/most-popular-section';
// import TestCart from '@/features/cart/add-to-cart-test';
// import TestWishlist from '@/features/wish-list/wish-list-test';
import About from '@/features/home/components/about';
import Gallery from '@/features/home/components/gallery';
import { Suspense } from 'react';
import TestimonialsSectionSkeleton from '@/features/home/components/skeletons/testimonials-section.skeleton';
import TestimonialsSection from '@/features/home/components/testimonials/testimonials-section';
import Partners from '@/features/home/components/partners';

export default function Home() {
  return (
    <div>
      <LanguageSwitcher />
      <ThemeToggle />
      {/* Hero Section */}

      <div className="max-w-11/12 mx-auto">
        {/* // just for testing the add to wishlist, add to cart, remove from wishlist functionality */}

        {/* <div className="flex items-center justify-center gap-4 py-8">
          <TestCart />
          <TestWishlist />
        </div> */}
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />
      </div>
      {/* Best Seller Section */}

      <BestSellerSection />
      {/* Most Popular Section */}

      <MostPopularSection />
      {/* About Section */}

      <About />
      {/* Gallery Section */}

      <Gallery />
      {/* Testimonials Section */}

      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      {/* Partners Section */}

      <Partners />
    </div>
  );
}
