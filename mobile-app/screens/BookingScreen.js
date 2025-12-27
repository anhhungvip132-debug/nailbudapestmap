import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { createBooking } from "../services/bookingService";

export default function BookingScreen({ route, navigation }) {
  const { salon } = route.params || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!name || !phone || !date) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      await createBooking({
        salonId: salon.id,
        salonName: salon.name,
        name,
        phone,
        date,
      });
      Alert.alert("Thành công", "Đặt lịch thành công");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Lỗi", "Không thể đặt lịch");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch</Text>
      <Text style={styles.salon}>{salon?.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên khách"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày hẹn (VD: 20/12/2025)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity
        style={[styles.btn, loading && { opacity: 0.6 }]}
        onPress={submit}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Đang gửi..." : "Xác nhận"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  salon: { color: "#555", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
