import React, { FunctionComponent, forwardRef, Ref, useState } from "react";

import { FlatList } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Typography from "@app/components/atoms/Typography";

interface Props {
  selectedDate: Date;
  days: Date[];
  selectDay: (index: number) => void;
  openDatePicker: () => void;
  ref: any;
}

import {
  StyledWrapper,
  StyledContent,
  StyledCalendarItem,
  StyledBar,
} from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const HabitsHeader: FunctionComponent<Props> = forwardRef(
  ({ selectedDate, days, selectDay, openDatePicker }, ref: Ref<any>) => {
    const navigation = useNavigation<StackNavigationProp<StackParams>>();

    return (
      <StyledWrapper>
        <StyledContent>
          <StyledBar>
            <Feather
              name={"menu"}
              color={"#fff"}
              size={32}
              onPress={openDatePicker}
            />

            <Typography weight={600}>Habits</Typography>

            <Ionicons
              name={"add"}
              color={"#fff"}
              size={32}
              onPress={() => navigation.navigate("NewHabitScreen")}
            />
          </StyledBar>

          <FlatList
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={selectedDate.getUTCDate() - 1}
            onScrollToIndexFailed={() => {}}
            ref={ref}
            contentContainerStyle={{}}
            horizontal
            snapToAlignment={"center"}
            keyExtractor={(item: any, index: number): string =>
              index.toString()
            }
            data={days}
            renderItem={({ item, index }) => {
              const day = item.getDate();
              const name = weekdays[item.getDay()];

              return (
                <StyledCalendarItem key={day} onPress={() => selectDay(index)}>
                  <Typography
                    color={
                      selectedDate.getUTCDate() - 1 == index
                        ? "primary"
                        : "secondary"
                    }
                    isCentered
                  >
                    {name}
                  </Typography>
                  <Typography
                    size={"h4"}
                    color={
                      selectedDate.getUTCDate() - 1 == index
                        ? "primary"
                        : "secondary"
                    }
                    isCentered
                  >
                    {day}
                  </Typography>
                </StyledCalendarItem>
              );
            }}
          />
        </StyledContent>
      </StyledWrapper>
    );
  }
);

export default HabitsHeader;
