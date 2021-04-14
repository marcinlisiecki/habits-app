import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { FunctionComponent, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";

const { Screen, Navigator } = createStackNavigator();

import useLoadFonts from "@app/hooks/useLoadFonts";

import useUser from "@app/hooks/useUser";

import HabitsScreen from "@app/screens/HabitsScreen";
import NewHabitScreen from "@app/screens/NewHabitScreen";

const Router: FunctionComponent = () => {
  const [fontsLoaded] = useLoadFonts();
  const { isUserLoaded, initialLoad, user } = useUser();

  useEffect(() => {
    initialLoad();
  }, []);

  if (!fontsLoaded || !isUserLoaded || !user) return <Text>Loading...</Text>;

  return (
    <NavigationContainer theme={{ colors: { background: "#0B0E11" } }}>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, margin: 0, padding: 0 },
        }}
      >
        <Screen name={"HabitsScreen"} component={HabitsScreen} />
        <Screen name={"NewHabitScreen"} component={NewHabitScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
