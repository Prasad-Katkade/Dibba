import { OnboardingSlide } from "@/types";
import React from "react";
import { Animated, Dimensions, View } from "react-native";

interface props {
  data: OnboardingSlide[];
  scrollX: Animated.Value;
}

export default function OnboardingPaginator({ data, scrollX }: props) {
  const { width } = Dimensions.get("window");
  return (
    <View className="h-[50px]">
      <View className="flex flex-row h-full items-center  ">
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              className="h-[10px] ml-1 w-[10px] bg-white rounded-full"
              style={{ width: dotWidth, opacity: opacity }}
            />
          );
        })}
      </View>
    </View>
  );
}
