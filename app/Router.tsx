import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { FunctionComponent, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const { Screen, Navigator } = createStackNavigator();

import useLoadFonts from "@app/hooks/useLoadFonts";

import useUser from "@app/hooks/useUser";

import HabitsScreen from "@app/screens/HabitsScreen";
import NewHabitScreen from "@app/screens/NewHabitScreen";
import UpdateHabitScreen from "@app/screens/UpdateHabitScreen";

const Tab = createMaterialBottomTabNavigator();

const MainStackScreen = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { opacity: 1, margin: 0, padding: 0 },
    }}
  >
    <Screen name={"HabitsScreen"} component={HabitsScreen} />
    <Screen name={"NewHabitScreen"} component={NewHabitScreen} />
    <Screen name={"UpdateHabitScreen"} component={UpdateHabitScreen} />
  </Navigator>
);

const Router: FunctionComponent = () => {
  const [fontsLoaded] = useLoadFonts();
  const { isUserLoaded, initialLoad, user } = useUser();

  useEffect(() => {
    initialLoad();
  }, []);

  if (!fontsLoaded || !isUserLoaded || !user) return <Text>Loading...</Text>;

  return (
    <>
      <NavigationContainer theme={{ colors: { background: "#0B0E11" } }}>
        <Tab.Navigator
          barStyle={{ backgroundColor: "#0B0E11" }}
          labeled={false}
        >
          <Tab.Screen
            name={"MainStack"}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-home" size={20} color={color} />
              ),
            }}
            component={MainStackScreen}
          />
          <Tab.Screen
            name={"NewHabitsScreen"}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-stats-chart" size={20} color={color} />
              ),
            }}
            component={NewHabitScreen}
          />
          <Tab.Screen
            name={"SettingsScreen"}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings-sharp" size={24} color={color} />
              ),
            }}
            component={NewHabitScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Router;
