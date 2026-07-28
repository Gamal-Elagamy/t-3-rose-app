import { useTranslations } from 'next-intl';
import Image from 'next/image';

import coconut from '@/assets/images/home/partners/coconut.png';
import ginyard from '@/assets/images/home/partners/ginyard.png';
import habus from '@/assets/images/home/partners/habus.png';
import ingoude from '@/assets/images/home/partners/ingoude.png';
import ingoude2 from '@/assets/images/home/partners/ingoude2.png';
import velvet from '@/assets/images/home/partners/velvet.png';

export default function Partners() {
  // Translation
  const t = useTranslations('home.partners');

  // Variables
  const partners = [
    { src: coconut, alt: 'Coconut' },
    { src: ginyard, alt: 'Ginyard' },
    { src: habus, alt: 'Habus' },
    { src: ingoude, alt: 'Ingoude' },
    { src: ingoude2, alt: 'Ingoude' },
    { src: velvet, alt: 'Velvet' },
  ];

  return (
    <section className="mx-auto mt-10 mb-3 w-11/12 rounded-xl bg-ds-bg-primary-fade px-6 py-10 dark:bg-ds-bg-soft">
      {/* Title */}
      <h2 className="text-center font-primary text-4xl font-bold leading-none text-ds-text-primary">
        {t.rich('title', {
          highlight: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
        })}
      </h2>

      {/* Partners */}
      <div className="mt-10 grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner) => (
          <Image
            key={partner.alt + partner.src.src}
            src={partner.src}
            alt={partner.alt}
            placeholder="blur"
            className="object-contain"
          />
        ))}
      </div>
    </section>
  );
}
