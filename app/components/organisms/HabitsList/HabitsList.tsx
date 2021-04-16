import React, { FunctionComponent } from "react";

interface Props {
  habits: Habit[];
  selectedDate: Date;
}

import { StyledWrapper } from "./styles";
import HabitsListItem from "@app/components/molecules/HabitsListItem";
import { FlatList, View } from "react-native";

const HabitsList: FunctionComponent<Props> = ({ habits, selectedDate }) => {
  return (
    <StyledWrapper>
      <FlatList
        style={{ flex: 1 }}
        data={habits}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <HabitsListItem habit={item} key={index} date={selectedDate} />
        )}
      />
    </StyledWrapper>
  );
};

export default HabitsList;
