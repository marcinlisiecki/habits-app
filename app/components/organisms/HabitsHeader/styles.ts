import styled from "styled-components/native";
import { StatusBar, Platform } from "react-native";

export const StyledWrapper = styled.SafeAreaView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding-top: ${Platform.OS == "android" ? StatusBar.currentHeight : 0}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderColors.primary};
`;

export const StyledContent = styled.View`
  padding: 20px 0 20px 0;
`;

export const StyledBar = styled.View`
  padding: 0 18px 30px 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCalendarItem = styled.TouchableOpacity`
  margin: 0 20px;
`;

interface DotProps {
  color: "danger" | "success" | "none" | "warning";
}

export const StyledDot = styled.View<DotProps>`
  margin: 8px auto 0 auto;
  border-radius: 100000px;
  width: 6px;
  height: 6px;
  background-color: ${({ theme, color }) =>
    color === "none" ? "transparent" : theme.colors[color][500]};
`;
