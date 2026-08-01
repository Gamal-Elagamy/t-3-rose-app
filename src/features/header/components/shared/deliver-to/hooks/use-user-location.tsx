'use client';

import { useState, useEffect } from 'react';

interface UseUserLocationResult {
  city: string | null;
  isLoading: boolean;
  error: string | null;
}

async function reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  const data = await response.json();

  return data.address?.city ?? data.address?.town ?? data.address?.state ?? null;
}

export function useUserLocation(): UseUserLocationResult {
  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // State
  const [city, setCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isSupported);
  const [error, setError] = useState<string | null>(isSupported ? null : 'geolocation-unsupported');

  // Effects
  useEffect(() => {
    if (!isSupported) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const resolvedCity = await reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
          setCity(resolvedCity);
        } catch {
          setError('reverse-geocode-failed');
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setError('permission-denied');
        setIsLoading(false);
      }
    );
  }, [isSupported]);

  return { city, isLoading, error };
}
