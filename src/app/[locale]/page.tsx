import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import BestSellerSection from '@/features/home/components/best-seller/best-seller-section';
import MostPopularSection from '@/features/home/components/most-popular/most-popular-section';

export default function Home() {
  return (
    <div>
      <LanguageSwitcher />
      <ThemeToggle />
      <BestSellerSection />
      <MostPopularSection />
    </div>
  );
}
