import "react-native-gesture-handler";
import React, { FunctionComponent, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

const { Screen, Navigator } = createStackNavigator();

import useLoadFonts from "@app/hooks/useLoadFonts";

import useUser from "@app/hooks/useUser";

import HabitsScreen from "@app/screens/HabitsScreen";
import NewHabitScreen from "@app/screens/NewHabitScreen";

const Router: FunctionComponent = () => {
  const [fontsLoaded] = useLoadFonts();
  const { isUserLoaded, initialLoad } = useUser();

  useEffect(() => {
    initialLoad();
  }, []);

  if (!fontsLoaded || !isUserLoaded) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name={"HabitsScreen"} component={HabitsScreen} />
        <Screen name={"NewHabitScreen"} component={NewHabitScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
