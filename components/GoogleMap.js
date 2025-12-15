"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

/**
 * GoogleMapComponent
 * Props:
 *  - salons: [{ name, address, lat, lng }]
 */

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function GoogleMapComponent({ salons = [] }) {
  const center = useMemo(() => {
    if (!salons.length) {
      return { lat: 47.4979, lng: 19.0402 }; // Budapest
    }
    return { lat: salons[0].lat, lng: salons[0].lng };
  }, [salons]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <p>Map failed to load</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {salons.map((salon, index) => (
        <Marker
          key={index}
          position={{ lat: salon.lat, lng: salon.lng }}
          title={salon.name}
        />
      ))}
    </GoogleMap>
  );
}
