import React, { FunctionComponent } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";

import { StyledHeader, StyledHeaderContent } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import HabitForm from "@app/components/organisms/HabitForm";

const NewHabitScreen: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

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
          <Typography weight={700} color={"primary"} letterSpacing={"1px"}>
            New habit
          </Typography>
          <MaterialCommunityIcons
            name={"keyboard-backspace"}
            size={32}
            color={"#0B0E11"}
          />
        </StyledHeaderContent>
      </StyledHeader>
      <MainTemplate>
        <HabitForm />
      </MainTemplate>
    </>
  );
};

export default NewHabitScreen;
