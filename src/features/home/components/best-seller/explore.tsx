import SectionSmallTitle from '@/shared/components/section-small-title';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Explore() {
  return (
    <div>
      {/* section title */}
      <SectionSmallTitle title={'best selling'} />

      {/* main title */}
      <p className="text-ds-text-secondary font-bold text-2xl w-1/2 mb-2">
        Check Out<span className="text-ds-text-primary"> What Everyone&apos;s </span>Buying
        <span className="text-ds-text-primary"> Right Now </span>
      </p>

      {/* description */}
      <p className="text-ds-text-muted text-base w-[70%]">
        Not sure what to choose?
        <br /> Start with our best sellers, these are the gifts our customers keep coming back for.
        Whether you&apos;re celebrating a birthday, anniversary or wedding, our top picks are
        guaranteed to leave a lasting impression.
      </p>

      {/* explore button */}
      <Link
        href="/products"
        className="text-ds-text-inverse bg-ds-bg-primary mt-22 font-semibold flex items-center gap-2.5 w-fit py-2.5 px-4 rounded-xl"
      >
        Explore gifts <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
