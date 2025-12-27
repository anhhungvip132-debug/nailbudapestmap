import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/HomeScreen";
import SalonDetailScreen from "./screens/SalonDetailScreen";
import BookingScreen from "./screens/BookingScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Nail Budapest Map" }}
        />

        <Stack.Screen
          name="Salon"
          component={SalonDetailScreen}
          options={{ title: "Chi tiết salon" }}
        />

        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: "Đặt lịch" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
