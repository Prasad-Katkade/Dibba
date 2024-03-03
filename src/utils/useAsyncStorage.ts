import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useAsyncStorage = () => {
  const [error, setError] = useState<string>(null);
  const storeData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (err: any) {
      setError(err);
      return null
    }
  };
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      setError(err);
      return null
    }
  };
  return { storeData, getData, error };
};
