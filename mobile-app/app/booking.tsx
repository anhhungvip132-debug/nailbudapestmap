import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function BookingScreen({ route, navigation }: any) {
  const { salon } = route.params;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("Gel Nails");

  const submitBooking = async () => {
    if (!name || !phone || !date || !time) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        salonId: salon.id,
        salonName: salon.name,
        name,
        phone,
        date,
        time,
        service,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Đặt lịch thành công",
        "Salon sẽ liên hệ xác nhận với bạn"
      );

      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không thể đặt lịch, thử lại sau");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 8 }}>
        Đặt lịch
      </Text>

      <Text style={{ marginBottom: 16 }}>{salon.name}</Text>

      <TextInput
        placeholder="Tên khách"
        value={name}
        onChangeText={setName}
        style={input}
      />

      <TextInput
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={input}
      />

      <TextInput
        placeholder="Ngày hẹn (VD: 20/12/2025)"
        value={date}
        onChangeText={setDate}
        style={input}
      />

      <TextInput
        placeholder="Giờ hẹn (VD: 14:30)"
        value={time}
        onChangeText={setTime}
        style={input}
      />

      <Text style={{ marginBottom: 6 }}>Dịch vụ</Text>

      {["Gel Nails", "Manicure", "Pedicure"].map((s) => (
        <TouchableOpacity
          key={s}
          onPress={() => setService(s)}
          style={{
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
            backgroundColor: service === s ? "#000" : "#eee",
          }}
        >
          <Text style={{ color: service === s ? "#fff" : "#000" }}>{s}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={submitBooking}
        style={{
          marginTop: 16,
          backgroundColor: "#000",
          padding: 16,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Xác nhận
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const input = {
  borderWidth: 1,
  borderColor: "#ddd",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
};
