import React, { FunctionComponent, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";

import { StyledHeader, StyledHeaderContent } from "./styles";

import { Route, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import HabitForm from "@app/components/organisms/HabitForm";

interface Props {
  route?: RouteProp<StackParams, "UpdateHabitScreen">;
}

const UpdateHabitScreen: FunctionComponent<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const initialHabit: Habit | undefined = route?.params.habit;

  return (
    <>
      <StyledHeader>
        <StyledHeaderContent>
          <MaterialCommunityIcons
            name={"keyboard-backspace"}
            size={32}
            color={"#fff"}
            onPress={() => navigation.goBack()}
          />
          <Typography>New habit</Typography>
          <MaterialCommunityIcons
            name={"keyboard-backspace"}
            size={32}
            color={"#0B0E11"}
          />
        </StyledHeaderContent>
      </StyledHeader>
      <MainTemplate>
        <HabitForm createNew={false} initialHabit={initialHabit} />
      </MainTemplate>
    </>
  );
};

export default UpdateHabitScreen;
