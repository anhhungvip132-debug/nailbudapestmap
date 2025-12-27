// mobile-app/screens/SalonScreen.native.js

import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function SalonScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 47.4979,
          longitude: 19.0402,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 47.4979, longitude: 19.0402 }}
          title="Nail Salon Budapest"
        />
      </MapView>
    </View>
  );
}
