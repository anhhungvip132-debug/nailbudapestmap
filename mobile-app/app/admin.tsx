import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AdminScreen() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Booking mới</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bold}>{item.salonName}</Text>
            <Text>👤 {item.name}</Text>
            <Text>📞 {item.phone}</Text>
            <Text>💅 {item.service}</Text>
            <Text>📅 {item.date} – {item.time}</Text>
            <Text>⏳ {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  bold: { fontWeight: "600" },
});
