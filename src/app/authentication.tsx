import { router } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import { useAsyncStorage } from "@/utils/useAsyncStorage";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

export default function Authentication() {
  const { width } = Dimensions.get("window");
  const { storeData } = useAsyncStorage();

  const configGoogleSignIn = () => {
    GoogleSignin.configure();
  };

  const navigateToOnboarding = (): boolean => {
    router.replace("/onboarding");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", navigateToOnboarding);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", navigateToOnboarding);
    };
  }, [BackHandler]);

  useEffect(() => {
    configGoogleSignIn();
  }, []);

  const showToast = (type, title, desc) => {
    console.log(type,title,desc);
  
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      if (res) storeData("isSignedInBefore", "true");
      showToast("success", "Success", "Succesfully Signed In");
      router.replace("/main/(tabs)/browse");
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          showToast("error", "SIGN IN CANCELLED", "User Sign In is required");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showToast("error", "PLAY SERVICES NOT AVAILABLE", "Google Play Services are needed");
          break;
      }
      console.log("Error", error.code);
    }
  };

  return (
    <View className="flex-1 bg-[#FFAA33] h-full w-full items-center justify-between pt-11 pb-1">
      <View className="min-h-[100px] p-1">
        <Image
          source={require("../assets/images/lunch-dibba.png")}
          className="h-[250px] rotate-[175deg]"
          style={{ width: width, objectFit: "contain" }}
        />
      </View>
      <View className="min-h-[100px] flex ">
        <Text className="text-center text-4xl  py-4 text-black" style={{ fontFamily: "Kalam_400Regular" }}>
          Dibba
        </Text>
        <TouchableOpacity
          className="bg-stone-800 flex flex-row gap-1 py-4 px-10 rounded-3xl"
          onPress={() => {
            signIn();
          }}
        >
          <Image
            source={require("../assets/images/google.png")}
            className="h-[25px] w-[25px]"
            style={{ objectFit: "contain" }}
          />
          <Text className="text-white font-bold" style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}>
            et started with Google
          </Text>
        </TouchableOpacity>
      </View>
      <View className="min-h-[100px] w-full flex flex-row justify-end ">
        <View className="">
          <Image
            source={require("../assets/images/lunch-corner.png")}
            className="rotate-[180deg] h-[250px] w-[220px]  "
            style={{ objectFit: "contain" }}
          />
        </View>
      </View>
    </View>
  );
}
