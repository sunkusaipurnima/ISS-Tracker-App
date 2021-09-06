/** @format */

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import ISSLocationScreen from "./Screens/ISSLocationScreen";
import MeteorScreen from "./Screens/MeteorScreen";
import UpdatesScreen from "./Screens/UpdatesScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="ISSLocation"
          component={ISSLocationScreen}
        ></Stack.Screen>
        <Stack.Screen name="Meteor" component={MeteorScreen}></Stack.Screen>
        <Stack.Screen name="Updates" component={UpdatesScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
