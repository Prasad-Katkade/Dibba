import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Details() {
  const { id } = useLocalSearchParams();
  return (
    <View className='bg-slate-100 flex flex-1'>
        <Stack.Screen options={{headerTitle:"Details"}}/>
      <Text>details {id}</Text>
    </View>
  );
}
