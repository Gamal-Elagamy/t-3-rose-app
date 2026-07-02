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
    <div className="relative">
      <button
        onClick={onBack}
        className="absolute left-0 top-0 p-2 rounded-md border border-ds-bg-inverse hover:bg-ds-text-primary-fade transition"
      >
        <ArrowLeft className="text-ds-bg-inverse " size={18} />
      </button>

      <div className="flex flex-col pt-10">
        <h1 className="text-2xl font-semibold text-ds-bg-inverse">{t('forgotPw.step2.title')}</h1>

        <p className="mt-2  text-ds-bg-inverse leading-relaxed max-w-sm">
          {t('forgotPw.step2.subtitle')}
        </p>

        <p className="mt-1 text-sm font-medium text-ds-bg-info break-all">{email}</p>

        <p className="mt-1 text-ds-bg-primary">{t('forgotPw.step2.inbox')}</p>

        <p className="mt-1 text-ds-bg-primary">{t('forgotPw.step2.spam')}</p>

        <p className="mt-6  text-ds-bg-inverse">
          {t('forgotPw.step1.noAccountPrompt')}
          <Link href="/register" className="text-ds-bg-primary ms-1">
            {t('forgotPw.step1.createAccount')}
          </Link>
        </p>
      </div>
    </div>
  );
}
