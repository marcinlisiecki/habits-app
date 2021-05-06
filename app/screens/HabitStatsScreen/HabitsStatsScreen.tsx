import React, { FunctionComponent } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainTemplate from '@app/templates/MainTemplate';
import Typography from '@app/components/atoms/Typography';

import { StyledHeader, StyledHeaderContent } from './styles';
import HabitHistoryCalendar from '@app/components/organisms/HabitHistoryCalendar';

interface Props {
  route: RouteProp<StackParams, 'HabitStatsScreen'>;
}

const HabitsStatsScreen: FunctionComponent<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const habit: Habit = route.params.habit;

  return (
    <>
      <StyledHeader>
        <StyledHeaderContent>
          <MaterialCommunityIcons
            name={'keyboard-backspace'}
            size={32}
            color={'#aaa'}
            onPress={() => navigation.goBack()}
          />

          <Typography weight={700} color={'primary'} letterSpacing={'1px'}>
            Habit statistics
          </Typography>

          <MaterialCommunityIcons
            name="pencil"
            size={26}
            color={'#aaa'}
            onPress={() =>
              navigation.navigate('UpdateHabitScreen', {
                habit,
              })
            }
          />
        </StyledHeaderContent>
      </StyledHeader>
      <MainTemplate>
        <ScrollView
          style={{
            width: '100%',
          }}
        >
          <HabitHistoryCalendar habit={habit} />
        </ScrollView>
      </MainTemplate>
    </>
  );
};

export default HabitsStatsScreen;
