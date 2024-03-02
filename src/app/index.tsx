import { Kalam_400Regular, Kalam_700Bold } from "@expo-google-fonts/kalam";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import {Poppins_600SemiBold,Poppins_400Regular} from "@expo-google-fonts/poppins"

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const animation = useRef(null);
  const [fontsLoaded] = useFonts({
    Kalam_400Regular,
    Kalam_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular
  });
  useEffect(() => {
    // for custom animation refer animated api https://github.com/lottie-react-native/lottie-react-native#usage
    animation.current?.play();

    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);

 
  }, []);
  // FFAA33 FFAE42
  useEffect(()=>{
    setTimeout(() => {
      if(fontsLoaded) 
        router.replace("/authentication");
    }, 2500);
  },[fontsLoaded])
  return (
    <View className="min-h-full min-w-full h-screen w-full py-11 px-10 bg-[#FFAE42]">
      <StatusBar style="dark" />
      <View className="h-full w-full  flex justify-center align-middle">
        <View className="w-full bg-slate-100 rounded-2xl">
          <Text
            className="text-center text-4xl  py-6 text-orange-800"
            style={{ fontFamily: fontsLoaded ? "Kalam_400Regular" : "" }}
          >
            Dibba
          </Text>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "100%",
              height: 180,
              padding: 0,
              margin: 0,
              backgroundColor: "#f1f5f9",
            }}
            source={require("../assets/lottie/loading-main.json")}
          />
          <Text
            className="text-center text-xl py-6 "
            style={{ fontFamily: fontsLoaded ? "Kalam_400Regular" : "" }}
          >
            Cooking Up...
          </Text>
        </View>
      </View>
    </View>
  );
}
