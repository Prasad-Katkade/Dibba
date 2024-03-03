import { useAsyncStorage } from "@/utils/useAsyncStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function Page() {
  const { storeData } = useAsyncStorage();
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      storeData("userInfo", userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  return (
    <View>
      <Stack.Screen options={{ headerTitle: "Main" }} />
      <Redirect href="main/(tabs)/browse" />
    </View>
  );
}
