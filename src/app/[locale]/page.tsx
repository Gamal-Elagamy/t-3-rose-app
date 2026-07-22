import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
// import TestRemoveWishlist from '@/features/cart/test';
import BannerHomePage from '@/features/home/components/hero-section/banner-section/banner-section';
import OccasionsSection from '@/features/home/components/hero-section/occasions-section/occasions-section';
import FeaturesSection from '@/features/home/components/features-section/features-section';
import BestSellerSection from '@/features/home/components/best-seller/best-seller-section';
import MostPopularSection from '@/features/home/components/most-popular/most-popular-section';

export default function Home() {
  return (
    <div>
      <LanguageSwitcher />
      <ThemeToggle />

      <div className="max-w-11/12 mx-auto">
        {/* <TestRemoveWishlist /> */}
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />
      </div>
      <BestSellerSection />
      <MostPopularSection />
    </div>
  );
}
