import { useTranslations } from 'next-intl';
import Image from 'next/image';

import coconut from '@/assets/images/home/partners/coconut..png';
import ginyard from '@/assets/images/home/partners/ginyard.png';
import habus from '@/assets/images/home/partners/habus.png';
import ingoude from '@/assets/images/home/partners/ingoude.png';
import ingoude2 from '@/assets/images/home/partners/ingoude2.png';
import velvet from '@/assets/images/home/partners/velvet..png';

export default function Partners() {
  const t = useTranslations('home.partners');

  return (
    <section className="mx-auto mt-10 mb-3 w-11/12 rounded-xl bg-ds-bg-primary-fade px-6 py-10 dark:bg-ds-bg-soft">
      <h2 className="text-center font-primary text-4xl font-bold leading-none text-ds-text-primary">
        {t.rich('title', {
          highlight: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
        })}
      </h2>

      <div className="mt-6 flex justify-center">
        <Image src={coconut} alt="Coconut" className="object-cover" />
        <Image src={ginyard} alt="Ginyard" className="object-cover" />
        <Image src={habus} alt="Habus" className="object-cover" />
        <Image src={ingoude} alt="Ingoude" className="object-cover" />
        <Image src={ingoude2} alt="Ingoude" className="object-cover" />
        <Image src={velvet} alt="Velvet" className="object-cover" />
      </div>
    </section>
  );
}
