import React, { FunctionComponent } from "react";

import {
  StyledSelectRepeatBottom,
  StyledSelectRepeatDay,
  StyledSelectRepeatTop,
  StyledSelectRepeatWrapper,
} from "./styles";
import Typography from "@app/components/atoms/Typography";

interface Props {
  handleSelectRepeat: (index: number) => void;
  handleSelectAll: () => void;
  isSelected: (index: number) => boolean;
  isAllSelected: () => boolean;
}

const SelectRepeat: FunctionComponent<Props> = ({
  handleSelectRepeat,
  isSelected,
  handleSelectAll,
  isAllSelected,
}) => {
  return (
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
  );
};

export default SelectRepeat;
