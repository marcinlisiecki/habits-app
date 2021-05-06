import React, { FunctionComponent, useMemo } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainTemplate from '@app/templates/MainTemplate';
import Typography from '@app/components/atoms/Typography';

import {
  StyledHeader,
  StyledHeaderContent,
  StyledCardContent,
  StyledCardWrapper,
  StyledStatCardsWrapper,
} from './styles';
import HabitHistoryCalendar from '@app/components/organisms/HabitHistoryCalendar';
import { calculateStreak } from '@app/utils/habits';
import moment from 'moment';

interface Props {
  route: RouteProp<StackParams, 'HabitStatsScreen'>;
}

const HabitsStatsScreen: FunctionComponent<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const habit: Habit = route.params.habit;

  const currentStreak: number = calculateStreak(habit, new Date());
  const totalDone: number = habit.doneHistory.length + habit.backupHistory.length;

  // const doneHistory = habit.doneHistory.sort(
  //   (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
  // );
  // const backupHistory = habit.backupHistory.sort(
  //   (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
  // );
  //
  // const firstDay = Math.min(
  //   new Date(doneHistory[0]).getTime() || Infinity,
  //   new Date(backupHistory[0]).getTime() || Infinity
  // );
  //
  // const lastDay = Math.max(
  //   new Date(doneHistory.reverse()[0]).getTime() || -Infinity,
  //   new Date(backupHistory.reverse()[0]).getTime() || -Infinity
  // );
  //
  // const firstDayToTodayDifference = moment(lastDay).diff(firstDay, 'days');
  //
  // const percentageOfDone = Math.round((totalDone / firstDayToTodayDifference) * 100);

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
            paddingTop: 20,
            paddingBottom: 20,
            width: '100%',
          }}
        >
          <StyledStatCardsWrapper>
            <StyledCardWrapper>
              <Typography isCentered color={'secondary'}>
                Current Streak
              </Typography>

              <StyledCardContent>
                <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
                  {currentStreak}
                </Typography>
                <FontAwesome5 name="fire" size={32} color="#4ADE80" />
              </StyledCardContent>
            </StyledCardWrapper>

            <StyledCardWrapper>
              <Typography isCentered color={'secondary'}>
                Total Done
              </Typography>

              <StyledCardContent>
                <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
                  {totalDone}
                </Typography>
                <FontAwesome name="check" size={32} color="#4ADE80" />
              </StyledCardContent>
            </StyledCardWrapper>

            {/*<StyledCardWrapper>*/}
            {/*  <Typography isCentered color={'secondary'}>*/}
            {/*    Total days*/}
            {/*  </Typography>*/}

            {/*  <StyledCardContent>*/}
            {/*    <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>*/}
            {/*      {firstDayToTodayDifference}*/}
            {/*    </Typography>*/}
            {/*    <MaterialIcons name="hourglass-top" size={32} color="#4ADE80" />*/}
            {/*  </StyledCardContent>*/}
            {/*</StyledCardWrapper>*/}

            {/*<StyledCardWrapper>*/}
            {/*  <Typography isCentered color={'secondary'}>*/}
            {/*    % of Done*/}
            {/*  </Typography>*/}

            {/*  <StyledCardContent>*/}
            {/*    <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>*/}
            {/*      {percentageOfDone}*/}
            {/*    </Typography>*/}
            {/*    <FontAwesome5 name="percentage" size={32} color="#4ADE80" />*/}
            {/*  </StyledCardContent>*/}
            {/*</StyledCardWrapper>*/}
          </StyledStatCardsWrapper>
          <HabitHistoryCalendar habit={habit} />
        </ScrollView>
      </MainTemplate>
    </>
  );
};

export default HabitsStatsScreen;
