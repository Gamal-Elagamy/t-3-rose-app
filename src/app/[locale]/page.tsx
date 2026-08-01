import BannerHomePage from '@/features/home/components/hero-section/banner-section/banner-section';
import OccasionsSection from '@/features/home/components/hero-section/occasions-section/occasions-section';
import FeaturesSection from '@/features/home/components/features-section/features-section';
import BestSellerSection from '@/features/home/components/best-seller/best-seller-section';
import MostPopularSection from '@/features/home/components/most-popular/most-popular-section';
import About from '@/features/home/components/about';
import Gallery from '@/features/home/components/gallery';
import TestimonialsSectionSkeleton from '@/features/home/components/skeletons/testimonials-section.skeleton';
import { Suspense } from 'react';
import TestimonialsSection from '@/features/home/components/testimonials/testimonials-section';
import Partners from '@/features/home/components/partners';

export default async function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-11/12 mx-auto">
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
