import { languages } from "@/utils/i18next";
import { Entypo } from "@expo/vector-icons";
import { changeLanguage } from "i18next";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface props {
  modalVisible: boolean;
  handleClose: () => void;
}

export default function LanguageModal({ modalVisible, handleClose }:props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleClose();
      }}
    >
      <View className="flex-1 bg-black/30 justify-center items-center">
        <View className="bg-slate-100 rounded-2xl p-4  min-w-[250px]  h-[340px]">
          <View className="flex flex-row gap-2 justify-center m-2">
            <Text className="text-orange-800 text-lg">Select Language</Text>
            <Entypo name="language" size={24} color="black" />
          </View>
          <FlatList
            data={Object.keys(languages)}
            className="mt-2"
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-slate-50 m-1 p-4 border rounded-2xl"
                onPress={() => {
                  changeLanguage(item);
                  handleClose();
                }}
              >
                <Text className="text-black text-lg">
                  {`${languages[item].nativeName}  ${languages[item].name}`}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
