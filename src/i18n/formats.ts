export const formats = {
  number: {
    'currency-base': {
      style: 'currency',
      currency: 'EGP',
    },
    'currency-no-fractions': {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    'currency-full': {
      style: 'currency',
      currency: 'EGP',
      currencyDisplay: 'name',
    },
    'percent-base': {
      style: 'percent',
    },
    'percent-no-fractions': {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    'rating-base': {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
    'rating-count': {
      maximumFractionDigits: 0,
    },
    'items-count': {
      maximumFractionDigits: 0,
    },
  },

  dateTime: {
    'time-only': {
      hour: '2-digit',
      minute: '2-digit',
    },
    'date-short': {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
    'date-full': {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
    'date-day-month-year': {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  },
} as const;
