// mobile-app/screens/SalonScreen.native.js

import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function SalonScreen({ navigation }) {
  const salon = {
    id: "salon-1",
    name: "Nail Salon Budapest",
    latitude: 47.4979,
    longitude: 19.0402,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: salon.latitude,
          longitude: salon.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: salon.latitude,
            longitude: salon.longitude,
          }}
          title={salon.name}
        />
      </MapView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          backgroundColor: "#000",
          padding: 16,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("Booking", { salon })}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
          Đặt lịch salon này
        </Text>
      </TouchableOpacity>
    </View>
  );
}
