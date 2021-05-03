import React, { FunctionComponent, forwardRef, Ref, useState } from "react";

import { FlatList } from "react-native";
import { Ionicons, Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Typography from "@app/components/atoms/Typography";

interface Props {
  selectedDate: Date;
  days: HeaderDays[];
  selectDay: (index: number) => void;
  openDatePicker: () => void;
  ref: any;
}

import {
  StyledWrapper,
  StyledContent,
  StyledCalendarItem,
  StyledBar,
  StyledDot,
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
            <AntDesign
              name={"calendar"}
              color={"#aaa"}
              size={26}
              style={{ marginRight: 10 }}
              onPress={openDatePicker}
            />

            <Typography weight={700} color={"special"} letterSpacing={"4px"}>
              HABITS
            </Typography>

            <Ionicons
              name={"ios-add-outline"}
              color={"#aaa"}
              size={32}
              onPress={() => navigation.navigate("NewHabitScreen")}
            />
          </StyledBar>

          <FlatList
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={selectedDate.getDate() - 1}
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
              const day = item.date.getDate();
              const name = weekdays[item.date.getDay()];

              return (
                <StyledCalendarItem key={day} onPress={() => selectDay(index)}>
                  <Typography
                    color={
                      selectedDate.getDate() - 1 == index
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
                      selectedDate.getDate() - 1 == index
                        ? "primary"
                        : "secondary"
                    }
                    isCentered
                  >
                    {day}
                  </Typography>
                  <StyledDot color={item.color} />
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
