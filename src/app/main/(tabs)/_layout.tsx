import { useAsyncStorage } from "@/utils/useAsyncStorage";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { User } from "@react-native-google-signin/google-signin";
import { Link, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Pressable, Text } from "react-native";

export default () => {
  const { getData } = useAsyncStorage();
  const [profileUrl, setProfileUrl] = useState<string>(null);
  const [userId, setUserId] = useState<string>(null);
  const getUserProfile = async () => {
    const userData: User = await getData("userInfo");
    setProfileUrl(userData.user.photo);
    setUserId(userData.user.id);
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const ProfileIcon = () => (
    <Link
      href={{
        pathname: "/main/profile/[id]",
        params: { id: userId ? userId : "" },
      }}
      asChild
    >
      <Pressable className="bg-white rounded-full h-[40px] w-[40px] mr-2 border-slate-400">
        {profileUrl != null ? (
          <Image
            className="bg-slate-50 rounded-full h-full w-full"
            source={{ uri: profileUrl }}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <FontAwesome name="user-o" size={30} color="black" />
        )}
      </Pressable>
    </Link>
  );
  const Title = () => (
    <Text className="text-center w-full  text-stone-800" style={{ fontFamily: "Kalam_400Regular", fontSize: 25 }}>
      Dibba
    </Text>
  );
  return (
    <>
      <StatusBar style="dark" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "#FFAE42" }}>
        <Tabs.Screen
          name="browse"
          options={{
            headerTitle: (props) => <Title />,
            headerRight: (props) => <ProfileIcon />,
            headerTitleAlign: "center",
            title: "Explore",
            tabBarIcon: ({ color }) => <Entypo name="shop" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="fav"
          options={{
            headerTitle: (props) => <Title />,
            headerRight: (props) => <ProfileIcon />,
            headerTitleAlign: "center",
            title: "Favourites",
            tabBarIcon: ({ color }) => <MaterialIcons name="favorite-border" size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
};
