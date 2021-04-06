import React, { FunctionComponent, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";

import {
  StyledHeader,
  StyledHeaderContent,
  StyledSelectRepeatDay,
  StyledSelectRepeatTop,
  StyledSelectRepeatWrapper,
  StyledSelectRepeatBottom,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FormField from "@app/components/molecules/FormField";
import Label from "@app/components/atoms/Label";
import Button from "@app/components/atoms/Button";
import useUser from "@app/hooks/useUser";
import { generateUUID } from "@app/utils/uuid";
import { createNewHabit } from "@app/mutations/habit";

interface ValidationError {
  path: string;
  message: string;
}

const NewHabitScreen: FunctionComponent = () => {
  const { updateUser, user } = useUser();

  const [name, setName] = useState<string>("");
  const [repeat, setRepeat] = useState<number[]>([]);
  const [error, setError] = useState<ValidationError | null>(null);

  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const handleSelectRepeat = (value: number) => {
    let newRepeat: number[] = [...repeat];

    if (newRepeat.includes(value))
      newRepeat = newRepeat.filter((item) => item !== value);
    else newRepeat.push(value);

    setRepeat(newRepeat);
  };

  const handleSelectAll = () =>
    isAllSelected() ? setRepeat([]) : setRepeat([0, 1, 2, 3, 4, 5, 6]);

  const isSelected = (value: number) => repeat.includes(value);
  const isAllSelected = (): boolean =>
    [0, 1, 2, 3, 4, 5, 6].every((item) => repeat.includes(item));

  const handleCreateHabit = async () => {
    if (!user) return;

    if (name.length <= 0) {
      setError({
        path: "name",
        message: "Name is required",
      });
      return;
    }

    if (repeat.length <= 0) {
      setError({
        path: "repeat",
        message: "You need to specify when you want repeat habit",
      });
      return;
    }

    const newHabit = { _id: generateUUID(), name, repeat, history: [] };
    updateUser(createNewHabit(user, newHabit));

    navigation.goBack();
  };

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
        <FormField
          label={"Name"}
          margin={"20px 0 0 0"}
          value={name}
          onChange={(text) => setName(text)}
        />
        {error?.path === "name" && (
          <Typography color={"error"} margin={"4px 0 0 0"}>
            {error.message}
          </Typography>
        )}

        <Label margin={"20px 0 4px 0"}>When?</Label>
        <StyledSelectRepeatWrapper>
          <StyledSelectRepeatTop>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(1)}
              isSelected={isSelected(1)}
              roundLeft
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                M
              </Typography>
            </StyledSelectRepeatDay>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(2)}
              isSelected={isSelected(2)}
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                T
              </Typography>
            </StyledSelectRepeatDay>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(3)}
              isSelected={isSelected(3)}
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                W
              </Typography>
            </StyledSelectRepeatDay>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(4)}
              isSelected={isSelected(4)}
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                T
              </Typography>
            </StyledSelectRepeatDay>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(5)}
              isSelected={isSelected(5)}
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                F
              </Typography>
            </StyledSelectRepeatDay>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(6)}
              isSelected={isSelected(6)}
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                S
              </Typography>
            </StyledSelectRepeatDay>
            <StyledSelectRepeatDay
              onPress={() => handleSelectRepeat(0)}
              isSelected={isSelected(0)}
              roundRight
              activeOpacity={1}
            >
              <Typography isCentered weight={700}>
                S
              </Typography>
            </StyledSelectRepeatDay>
          </StyledSelectRepeatTop>
          <StyledSelectRepeatBottom
            onPress={handleSelectAll}
            isSelected={isAllSelected()}
            activeOpacity={1}
          >
            <Typography isCentered weight={700} letterSpacing={"2px"}>
              EVERYDAY
            </Typography>
          </StyledSelectRepeatBottom>
        </StyledSelectRepeatWrapper>
        {error?.path === "repeat" && (
          <Typography color={"error"} margin={"4px 0 0 0"}>
            {error.message}
          </Typography>
        )}

        <Button onPress={handleCreateHabit}>Create</Button>
      </MainTemplate>
    </>
  );
};

export default NewHabitScreen;
