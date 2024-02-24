import LanguageModal from "@/components/LanguageModal";
import OnboardingItem from "@/components/OnboardingItem";
import OnboardingPaginator from "@/components/OnboardingPaginator";
import { OnboardingSlide } from "@/types";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function onboarding() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slideRef = useRef(null);
  const { t } = useTranslation();
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };
  const slides: OnboardingSlide[] = [
    {
      id: 0,
      title: t("onboarding-title-1"),
      desc: t("onboarding-desc-1"),
      animation: (
        <View className="min-h-[100px]  rounded-3xl p-4">
          <LottieView
            autoPlay
            style={{
              width: "100%",
              height: 250,
              padding: 0,
              margin: 0,
            }}
            source={require("../assets/lottie/onboarding-girl.json")}
          />
        </View>
      ),
    },
    {
      id: 1,
      title: t("onboarding-title-2"),
      desc: t("onboarding-desc-2"),
      animation: (
        <ImageBackground
          source={require("../assets/images/blob-white.png")}
          resizeMode="contain"
          className="min-h-[100px] h-[280px]  rounded-3xl p-6"
        >
          <LottieView
            autoPlay
            style={{
              width: "100%",
              height: 280,
              padding: 0,
              margin: 0,
            }}
            source={require("../assets/lottie/onboarding-chef.json")}
          />
        </ImageBackground>
      ),
    },
  ];

  const getTitle = (): string => {
    return currentIndex === slides.length - 1
      ? t("getting-started")
      : t("next");
  };

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <View className="flex h-full w-full items-center pt-11  bg-[#FFAA33]">
      <StatusBar style="dark" />
      <View className="w-full flex flex-row justify-end">
        <TouchableOpacity
          className="bg-slate-100 p-2 mr-4 rounded"
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Entypo name="language" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={slideRef}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={32}
        renderItem={({ item }) => <OnboardingItem slide={item} />}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      <View className="w-full p-4 flex flex-row justify-between  my-1">
        <OnboardingPaginator data={slides} scrollX={scrollX} />
        <TouchableOpacity
          className="bg-stone-800 flex flex-row gap-2  py-4 px-10 rounded-3xl"
          onPress={scrollTo}
        >
          <Text className="text-white text-lg">{getTitle()}</Text>
          <AntDesign name="rightcircle" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <LanguageModal
        modalVisible={modalVisible}
        handleClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
}
