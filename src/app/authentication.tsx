import {
  View,
  Text,
  BackHandler,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// android client - 361791862762-4bbedt66r5mt9rr1e8i5ak2u2ti2kqar.apps.googleusercontent.com
// web client - 361791862762-edg90jugc3kkncvu4tca013mcad3hg42.apps.googleusercontent.com

 // eas json "developmentClient": true,
WebBrowser.maybeCompleteAuthSession();

export default function authentication() {
  const { width } = Dimensions.get("window");
  const [userInfo,setUserInfo]=useState(null);

  const configGoogleSignIn=()=>{
    GoogleSignin.configure({
      webClientId:"361791862762-edg90jugc3kkncvu4tca013mcad3hg42.apps.googleusercontent.com"
    })
  }
  
  const navigateToOnboarding = (): boolean => {
    router.replace("/onboarding");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", navigateToOnboarding);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        navigateToOnboarding
      );
    };
  }, [BackHandler]);

  useEffect(()=>{
    configGoogleSignIn()
  },[])

  const signIn=async ()=>{
    try{
      console.log("signing in");
      await GoogleSignin.hasPlayServices()
      const res=await GoogleSignin.signIn()
      setUserInfo(res)
      console.log("info",res);
      
    }catch(e){
      console.log("error",e);
    }
  }

  const signOut=()=>{
    console.log("logout");
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  }

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
        <Text
          className="text-center text-4xl  py-4 text-black"
          style={{ fontFamily: "Kalam_400Regular" }}
        >
          Dibba {userInfo?.user ? JSON.stringify(userInfo.user):""}
        </Text>
        <TouchableOpacity
          className="bg-stone-800 flex flex-row gap-1 py-4 px-10 rounded-3xl"
          onPress={() => {
            console.log("click");
            signIn()
          }}
        >
          <Image
            source={require("../assets/images/google.png")}
            className="h-[25px] w-[25px]"
            style={{ objectFit: "contain" }}
          />
          <Text
            className="text-white font-bold"
            style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}
          >
            et started with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-stone-800 mt-1 flex flex-row gap-1 py-4 px-10 rounded-3xl"
          onPress={() => {
            console.log("click");
            signOut()
          }}
        >
          <Image
            source={require("../assets/images/google.png")}
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
