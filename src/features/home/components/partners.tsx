import Image from 'next/image';
import companies from '@/assets/images/home/partners/Companies.png';

export default function Partners() {
  return (
    <section className="rounded-xl w-8/12 mx-auto dark:bg-ds-bg-soft bg-ds-bg-primary-fade px-6 py-10 gap-10">
      <h2 className="font-primary text-ds-text-primary text-4xl font-bold leading-none text-center">
        Trusted by over <span className="text-ds-text-secondary">4.5k+</span> companies
      </h2>
      <div className="mt-6">
        <Image src={companies} alt="Companies" className="object-cover" />
      </div>
    </section>
  );
}
