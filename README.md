# Dibba

A Expo based React-Native application, Dibba focuses on showcasing live food menus from nearby food mess/parcel points and small-scale restaurants. The core idea is to enhance the visibility of these establishments, giving them a platform to connect with a wider audience.

## Setup  
Run the following commands to get started 
```sh
npm install
```
Download [Expo Go Client](https://expo.dev/client) application from the application store and run the following. 
```sh
npm run start
```
Scan the QR code through Expo-Go client, and the application should start loading.

## Build 
To build the application, you need to first [sign in](https://expo.dev/) at expo dashboard then install expo-cli.
```sh
npm install --global eas-cli  
```
Login to your expo-dashboard using terminal with 
```sh
eas login
```
I have added necessary configuration for two types of build, local (APK) for testing and default (AAB) for production.
```sh
eas build -p android --profile local
```
```sh
eas build --platform android 
```
For more details visit [Expo Docs](https://docs.expo.dev/build-reference/apk/)