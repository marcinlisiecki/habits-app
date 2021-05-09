import 'react-native-gesture-handler';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import { Dimensions } from 'react-native';

// @ts-ignore
import AnimatedSplash from 'react-native-animated-splash-screen';

import AppLoading from 'expo-app-loading';

const { Screen, Navigator } = createStackNavigator();

import useLoadFonts from '@app/hooks/useLoadFonts';

import useUser from '@app/hooks/useUser';

import HabitsScreen from '@app/screens/HabitsScreen';
import NewHabitScreen from '@app/screens/NewHabitScreen';
import UpdateHabitScreen from '@app/screens/UpdateHabitScreen';
import HabitStatsScreen from '@app/screens/HabitStatsScreen';

// @ts-ignore
import logo from 'assets/splash.png';

const Tab = createMaterialBottomTabNavigator();

const MainStackScreen = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { opacity: 1, margin: 0, padding: 0 },
    }}
  >
    <Screen name={'HabitsScreen'} component={HabitsScreen} />
    <Screen name={'NewHabitScreen'} component={NewHabitScreen} />
    <Screen name={'HabitStatsScreen'} component={HabitStatsScreen} />
    <Screen name={'UpdateHabitScreen'} component={UpdateHabitScreen} />
  </Navigator>
);

const Router: FunctionComponent = () => {
  const [fontsLoaded] = useLoadFonts();
  const { isUserLoaded, initialLoad, user } = useUser();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    if (isUserLoaded && fontsLoaded && user && !isLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setIsLoaded(true);
      }, 1);
    }
  }, [fontsLoaded, isUserLoaded, user]);

  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      backgroundColor={'#0B0E11'}
      logoImage={logo}
      logoWidth={Dimensions.get('screen').width}
      logoHeight={Dimensions.get('screen').height}
    >
      {fontsLoaded && isUserLoaded && user !== null ? (
        <NavigationContainer theme={{ colors: { background: '#0B0E11' } }}>
          <Tab.Navigator barStyle={{ backgroundColor: '#0B0E11' }} labeled={false}>
            <Tab.Screen
              name={'MainStack'}
              options={{
                tabBarIcon: ({ color }) => <Ionicons name="ios-home" size={20} color={color} />,
              }}
              component={MainStackScreen}
            />
            <Tab.Screen
              name={'NewHabitsScreen'}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-stats-chart" size={20} color={color} />
                ),
              }}
              component={NewHabitScreen}
            />
            <Tab.Screen
              name={'SettingsScreen'}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="settings-sharp" size={24} color={color} />
                ),
              }}
              component={NewHabitScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : null}
    </AnimatedSplash>
  );
};

export default Router;
