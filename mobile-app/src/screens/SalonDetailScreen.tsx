import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { SALONS } from "../data/salons";

type Props = {
  salonId: string;
  onBack: () => void;
  onBook?: () => void;
};

export default function SalonDetailScreen({ salonId, onBack, onBook }: Props) {
  const salon = SALONS.find((s) => s.id === salonId);

  if (!salon) {
    return (
      <View style={styles.container}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>
        <Text style={{ padding: 16 }}>Salon not found</Text>
      </View>
    );
  }

  const region: Region = {
    latitude: salon.lat,
    longitude: salon.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backTxt}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>Chi tiết salon</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{salon.name}</Text>
        <Text style={styles.addr}>{salon.address}</Text>
        {!!salon.description && <Text style={styles.desc}>{salon.description}</Text>}
      </View>

      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={region}>
        <Marker
          coordinate={{ latitude: salon.lat, longitude: salon.lng }}
          title={salon.name}
          description={salon.address}
        />
      </MapView>

      <View style={styles.footer}>
        <Pressable onPress={onBook} style={styles.bookBtn}>
          <Text style={styles.bookTxt}>Đặt lịch</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  backBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  backTxt: { fontSize: 22, fontWeight: "700" },
  topTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700" },

  content: { padding: 16 },
  name: { fontSize: 28, fontWeight: "800" },
  addr: { marginTop: 6, fontSize: 18, color: "#555" },
  desc: { marginTop: 10, fontSize: 16, color: "#777" },

  map: { flex: 1 },

  footer: { padding: 16, backgroundColor: "#fff" },
  bookBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  bookTxt: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
