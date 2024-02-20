import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 bg-[#FFB832]">
      <Text className="p-8 text-2xl text-orange-400">Dibba</Text>
      <Image source={require("../assets/images/icon.png")} className="h-full w-full"/>
    </View>
  );
}
