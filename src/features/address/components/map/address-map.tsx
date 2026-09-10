'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { toast } from 'sonner';
import { LatLngExpression, LeafletMouseEvent, Marker as LeafletMarker } from 'leaflet';

import './leaflet-icon';
import 'leaflet/dist/leaflet.css';

interface AddressMapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
}

type LocationChangeHandler = AddressMapProps['onLocationChange'];

function MapClickHandler({ onLocationChange }: { onLocationChange: LocationChangeHandler }) {
  useMapEvents({
    click({ latlng }: LeafletMouseEvent) {
      onLocationChange({
        latitude: latlng.lat,
        longitude: latlng.lng,
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

  const handleMarkerDragEnd = (event: { target: LeafletMarker }) => {
    const { lat, lng } = event.target.getLatLng();

    onLocationChange({
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: handleMarkerDragEnd,
      }}
    />
  );
}

function FindMyLocation({ onLocationChange }: { onLocationChange: LocationChangeHandler }) {
  const map = useMap();
  const t = useTranslations('address');

  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSuccess = ({ coords }: GeolocationPosition) => {
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
  };

  const handleLocationError = () => {
    setIsLoading(false);
    toast.error(t('locationDenied'));
  };

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t('locationDenied'));
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  };

  return (
    <button
      type="button"
      onClick={handleFindLocation}
      disabled={isLoading}
      className="
        absolute
        right-3
        top-3
        z-[1000]
        rounded-md
        border
        border-ds-border-soft
        bg-ds-bg-plain
        px-3
        py-2
        text-sm
        font-medium
        text-ds-text-default
        shadow-md
        transition-colors
        hover:bg-ds-bg-muted
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ds-bg-primary
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {isLoading ? t('findingLocation') : t('findMyLocation')}
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
