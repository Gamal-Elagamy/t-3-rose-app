import 'server-only';

export function getApiBaseUrl(): string {
  const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error('API_URL is not set. Add API_URL to your .env file (see .env.example).');
  }

  return url;
}
