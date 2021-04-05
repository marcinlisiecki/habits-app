import "react-native-gesture-handler";
import React, { FunctionComponent, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Screen, Navigator } = createStackNavigator();

import HabitsScreen from "@app/screens/HabitsScreen";
import useLoadFonts from "@app/hooks/useLoadFonts";
import { Text } from "react-native";
import useUser from "@app/hooks/useUser";

const Router: FunctionComponent = () => {
  const [fontsLoaded] = useLoadFonts();
  const { isUserLoaded, initialLoad } = useUser();

  useEffect(() => {
    initialLoad();
  }, []);

  if (!fontsLoaded || !isUserLoaded) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name={"HabitsScreen"} component={HabitsScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
