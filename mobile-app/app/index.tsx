import React, { useState } from "react";
import MapScreen from "../src/screens/MapScreen";
import SalonDetailScreen from "../src/screens/SalonDetailScreen";

export default function Index() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) {
    return (
      <SalonDetailScreen
        salonId={selectedId}
        onBack={() => setSelectedId(null)}
        onBook={() => {}}
      />
    );
  }

  return <MapScreen onPressSalon={(id) => setSelectedId(id)} />;
}
