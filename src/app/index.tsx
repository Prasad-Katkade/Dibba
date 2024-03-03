import { useAsyncStorage } from "@/utils/useAsyncStorage";
import { Kalam_400Regular, Kalam_700Bold } from "@expo-google-fonts/kalam";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [fontsLoaded] = useFonts({
    Kalam_400Regular,
    Kalam_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });
  const { getData } = useAsyncStorage();
  const [isUserSignedInBefore, setUserSignedInBefore] = useState<boolean>(false);
  const configGoogleSignIn = () => {
    GoogleSignin.configure();
  };

  const checkIfUserIsValid = async () => {
    const isValid = await GoogleSignin.isSignedIn();
    if (isValid) {
      setUserSignedInBefore(true);
    } else {
      try {
        await GoogleSignin.signInSilently();
        setUserSignedInBefore(true);
      } catch (err) { console.log("Error", err.code);}
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
    configGoogleSignIn();
    isSignedInBefore();
  }, []);

  const isSignedInBefore = async () => {
    try {
      const res = await getData("isSignedInBefore");
      if (Boolean(res)) {
        checkIfUserIsValid();
      } else {
        setUserSignedInBefore(false);
      }
    } catch (err) {
      console.error("Error checking sign-in status:", err);
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      if (isUserSignedInBefore) {
        router.replace("/main");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [fontsLoaded, isUserSignedInBefore]);
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
            style={{
              width: "100%",
              height: 180,
              padding: 0,
              margin: 0,
              backgroundColor: "#f1f5f9",
            }}
            source={require("../assets/lottie/loading-main.json")}
          />
          <Text className="text-center text-xl py-6 " style={{ fontFamily: fontsLoaded ? "Kalam_400Regular" : "" }}>
            Cooking Up...
          </Text>
        </View>
      </View>
    </View>
  );
}
