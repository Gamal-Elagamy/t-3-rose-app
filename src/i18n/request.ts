import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { formats } from './formats';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const numberingSystem = locale === 'ar' ? 'arab' : 'latn';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,

    formats: {
      number: {
        'currency-base': {
          ...formats.number['currency-base'],
          numberingSystem,
        },
        'currency-no-fractions': {
          ...formats.number['currency-no-fractions'],
          numberingSystem,
        },
        'currency-full': {
          ...formats.number['currency-full'],
          numberingSystem,
        },
        'percent-base': {
          ...formats.number['percent-base'],
          numberingSystem,
        },
        'percent-no-fractions': {
          ...formats.number['percent-no-fractions'],
          numberingSystem,
        },
        'rating-base': {
          ...formats.number['rating-base'],
          numberingSystem,
        },
        'rating-count': {
          ...formats.number['rating-count'],
          numberingSystem,
        },
        'items-count': {
          ...formats.number['items-count'],
          numberingSystem,
        },
      },

      dateTime: {
        ...formats.dateTime,

        'time-only': {
          ...formats.dateTime['time-only'],
          numberingSystem,
        },
      },
    },
  };
});
