'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';

import './leaflet-icon';
import 'leaflet/dist/leaflet.css';

interface AddressMapProps {
  latitude: number;
  longitude: number;

  onLocationChange: (location: { latitude: number; longitude: number }) => void;
}

function MapClickHandler({
  onLocationChange,
}: {
  onLocationChange: AddressMapProps['onLocationChange'];
}) {
  useMapEvents({
    click(event) {
      onLocationChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

function MapController({ latitude, longitude }: Pick<AddressMapProps, 'latitude' | 'longitude'>) {
  const map = useMap();

  map.setView([latitude, longitude]);

  return null;
}

function DraggableMarker({ latitude, longitude, onLocationChange }: AddressMapProps) {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: (event) => {
          const marker = event.target;
          const { lat, lng } = marker.getLatLng();

          onLocationChange({
            latitude: lat,
            longitude: lng,
          });
        },
      }}
    />
  );
}

function FindMyLocation({
  onLocationChange,
}: {
  onLocationChange: AddressMapProps['onLocationChange'];
}) {
  const map = useMap();
  const t = useTranslations('address');

  const [isLoading, setIsLoading] = useState(false);

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      alert(t('locationDenied'));
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        map.flyTo([latitude, longitude], 16, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.25,
        });

        onLocationChange({
          latitude,
          longitude,
        });

        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          alert(t('locationDenied'));
          return;
        }

        alert(t('locationDenied'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <button
      type="button"
      onClick={handleFindLocation}
      disabled={isLoading}
      className="absolute right-3 top-3 z-[1000] rounded-md bg-white px-3 py-2 text-sm font-medium shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? 'Finding...' : t('findMyLocation')}
    </button>
  );
}

export default function AddressMap({ latitude, longitude, onLocationChange }: AddressMapProps) {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <div className="relative overflow-hidden rounded-xl">
      <MapContainer center={position} zoom={13} scrollWheelZoom className="h-80 w-full rounded-xl">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController latitude={latitude} longitude={longitude} />

        <DraggableMarker
          latitude={latitude}
          longitude={longitude}
          onLocationChange={onLocationChange}
        />

        <MapClickHandler onLocationChange={onLocationChange} />

        <FindMyLocation onLocationChange={onLocationChange} />
      </MapContainer>
    </div>
  );
}
