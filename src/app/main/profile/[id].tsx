import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAsyncStorage } from "@/utils/useAsyncStorage";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const { storeData } = useAsyncStorage();
  const signOut = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    storeData("isSignedInBefore", "false");
    router.replace("/authentication")
  };
  return (
    <View className="bg-slate-100 flex flex-1 p-1">
      <Stack.Screen options={{ headerTitle: "Profile" }} />
      <Text className="text-center text-xl">Profile  {id}</Text>
      <TouchableOpacity
        className="bg-stone-800 m-2 flex flex-row gap-1 py-4 px-10 justify-center"
        onPress={() => {
          signOut();
        }}
      >
        <Image
          source={require("../../../assets/images/google.png")}
          className="h-[25px] w-[25px]"
          style={{ objectFit: "contain" }}
        />
        <Text
          className="text-white font-bold"
          style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
