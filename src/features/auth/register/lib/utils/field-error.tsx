import { useTranslations } from 'next-intl';

export function getErrorMessage(t: ReturnType<typeof useTranslations>, key: string): string {
  try {
    return t(key as never);
  } catch {
    return key;
  }
}
