import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Navbar from './components/Overlay/Navbar';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from './constants/themes';
import ParkSense from './components/Overlay/ParkSense';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

export default function App() {

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or render a loading indicator
  }
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>

        {/* <Dashboard /> */}
        <ParkSense />
        {/* <ScrollView> */}


        {/* </ScrollView> */}
        <Navbar />
        {/* <Navbar2/> */}
        {/* <MyComponent /> */}
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
