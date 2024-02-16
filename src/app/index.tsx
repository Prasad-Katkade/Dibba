import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { top } = useSafeAreaInsets();
  return (
    <View className="flex flex-1">
      <View style={{ paddingTop: top }}>
        <Text className="text-2xl text-orange-800">Dibba</Text>
      </View>
    </View>
  );
}
