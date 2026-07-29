import { getTranslations } from 'next-intl/server';

import { getTestimonials } from '../../apis/testimonials';
import Testimonials from './testimonials';

export default async function TestimonialsSection() {
  const t = await getTranslations('home.testimonials');

  let testimonials = [];

  try {
    const response = await getTestimonials();
    testimonials = response?.data ?? [];
  } catch {
    return (
      <div className="py-20 text-center">
        <p>{t('error')}</p>
      </div>
    );
  }

  return <Testimonials testimonials={testimonials} />;
}
