export function getMediaUrl(path: string) {
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
  return `${baseUrl}${path}`;
}

export function parseGallery(gallery: string | string[] | undefined): string[] {
  if (!gallery) return [];
  if (Array.isArray(gallery)) return gallery;

  try {
    const parsed = JSON.parse(gallery);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
