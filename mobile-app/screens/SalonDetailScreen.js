import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getSalonById } from "../services/salonService";

export default function SalonDetailScreen({ route, navigation }) {
  const salonId = route?.params?.salonId;

  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!salonId) return;
        const data = await getSalonById(String(salonId));
        if (mounted) setSalon(data);
      } catch (e) {
        console.log("Load salon error:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [salonId]);

  const region = useMemo(() => {
    if (!salon) return null;
    const lat = Number(salon.latitude);
    const lng = Number(salon.longitude);
    if (isNaN(lat) || isNaN(lng)) return null;

    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [salon]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading salon...</Text>
      </View>
    );
  }

  if (!salon || !region) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy dữ liệu salon</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.name}>{salon.name}</Text>
        <Text style={styles.address}>{salon.address}</Text>
        {salon.description ? (
          <Text style={styles.desc}>{salon.description}</Text>
        ) : null}
      </View>

      {/* MAP */}
      <MapView
        key={salon.id}
        style={styles.map}
        initialRegion={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title={salon.name}
          description={salon.address}
        />
      </MapView>

      {/* BOOKING */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Booking", {
            salon,
          })
        }
      >
        <Text style={styles.buttonText}>Đặt lịch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  address: {
    marginTop: 4,
    color: "#555",
  },
  desc: {
    marginTop: 6,
    color: "#777",
    fontSize: 13,
  },
  map: {
    flex: 1,
    marginTop: 8,
  },
  button: {
    margin: 16,
    padding: 14,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
