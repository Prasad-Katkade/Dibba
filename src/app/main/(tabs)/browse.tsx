import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Browse() {
  return (
    <View className="bg-slate-100 flex flex-1">
      <Text>browse</Text>
      <Link href="/main/details/1">Details</Link>
    </View>
  );
}
