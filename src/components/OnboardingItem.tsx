import { OnboardingSlide } from "@/types";
import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

interface props {
  slide: OnboardingSlide;
}

export default function OnboardingItem({ slide }: props) {
  const { width } = Dimensions.get("window");
  return (
    <View
      className="h-full flex align-middle gap-y-2 p-4  "
      style={{ width: width }}
    >
      {slide.animation}
      <View className="mt-1   ">
        <Text
          className="text-center text-white"
          style={{ fontFamily: "Kalam_400Regular", fontSize: 30 }}
        >
          {slide.title}
        </Text>
      </View>
      <ScrollView>
        <View className="mt-[2px] ">
          <Text
            className="text-justify text-orange-950"
            style={{ fontFamily: "Kalam_400Regular", fontSize: 18 }}
          >
            {slide.desc}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
