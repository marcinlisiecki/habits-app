import "react-native-gesture-handler";
import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Screen, Navigator } = createStackNavigator();

import HabitsScreen from "@app/screens/HabitsScreen";
import useLoadFonts from "@app/hooks/useLoadFonts";
import { Text } from "react-native";

const Router: FunctionComponent = () => {
  const [fontsLoaded] = useLoadFonts();
  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name={"HabitsScreen"} component={HabitsScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
