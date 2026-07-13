import { Button } from '@/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
type Props = {
  email: string;
  onBack: () => void;
};

export default function CheckEmailStep({ email, onBack }: Props) {
  const t = useTranslations();
  return (
    <section className="max-w-96">
      <div className="flex items-center gap-2">
        <Button onClick={onBack} className=" p-1">
          <ArrowLeft className="text-ds-text-plain " size={11} />
        </Button>
        <h1 className="text-2xl font-semibold text-ds-text-inverse">
          {t('auth.forgotPw.step2.title')}
        </h1>
      </div>

      <div className="flex flex-col">
        <p className="text-ds-text-inverse  max-w-sm">{t('auth.forgotPw.step2.subtitle')}</p>
        <p className=" mb-2 text-sm font-normal text-ds-text-info">{email}</p>
        <div className=" border-y-2 border-ds-border-muted ">
          <p className="mt-5 text-ds-text-inverse">{t('auth.forgotPw.step2.inbox')}</p>
          <p className="mb-5 text-ds-text-default">{t('auth.forgotPw.step2.spam')}</p>
        </div>

        <p className="mt-1 text-center  text-ds-text-primary">
          {t('auth.forgotPw.contact')}
          <Link href="/register" className="text-ds-text-primary ms-1">
            {t('auth.forgotPw.contactLink')}
          </Link>
        </p>
      </div>
    </section>
  );
}
