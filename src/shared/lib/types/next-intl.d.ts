import { routing } from '@/i18n/routing';
import messages from '@/i18n/messages/en.json';
import { formats } from '@/i18n/formats';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
