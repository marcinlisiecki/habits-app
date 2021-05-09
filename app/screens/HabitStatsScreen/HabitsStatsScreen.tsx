import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { deleteHabitData } from '@app/mutations/habit';
import { calculateStreak } from '@app/utils/habits';
import { deleteHabit } from '@app/mutations/habit';
import useUser from '@app/hooks/useUser';

import HabitHistoryCalendar from '@app/components/organisms/HabitHistoryCalendar';
import CustomLineChart from '@app/components/molecules/CustomLineChart';
import CustomPieChart from '@app/components/molecules/CustomPieChart';
import LoadingScreen from '@app/components/atoms/LoadingScreen';
import Typography from '@app/components/atoms/Typography';
import MainTemplate from '@app/templates/MainTemplate';

import {
  calculateBestStreak,
  getFirstHabitHistoryDay,
  getLastHabitHistoryDay,
  getPieChartData,
  getTotalDays,
} from './utils';

import {
  StyledHeader,
  StyledHeaderContent,
  StyledCardContent,
  StyledCardWrapper,
  StyledStatCardsWrapper,
} from './styles';

interface Props {
  route: RouteProp<StackParams, 'HabitStatsScreen'>;
}

const HabitsStatsScreen: FunctionComponent<Props> = ({ route }) => {
  const { user, updateUser } = useUser();

  const [weeklyDoneChartData, setWeeklyDoneChartData] = useState<any[] | null>(null);
  const [weeklyDoneChartArray, setWeeklyDoneChartArray] = useState<any[] | null>(null);
  const [weeklyDoneChartLabels, setWeeklyDoneChartLabels] = useState<any[] | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const habit: Habit = route.params.habit;

  const totalDone: number = habit.doneHistory.length + habit.backupHistory.length;
  const totalMainGoalDone: number = habit.doneHistory.length;
  const totalBackupGoalDone: number = habit.backupHistory.length;

  const firstDay = getFirstHabitHistoryDay(habit);
  const lastDay = getLastHabitHistoryDay(habit);

  const totalDays = getTotalDays(habit);
  const totalUndone = totalDays - totalDone;

  useEffect(() => {
    setCurrentStreak(calculateStreak(habit, new Date()));
    setBestStreak(calculateBestStreak(habit));
  }, []);

  useEffect(() => {
    const chartArray: any = [];
    const labelArray: any = [];

    let currentDate = new Date(firstDay);

    while (
      moment(currentDate).isBefore(new Date(lastDay)) ||
      moment(currentDate).isSame(new Date(lastDay))
    ) {
      const thisWeekDone = habit.doneHistory
        .filter((item) =>
          moment(item).isBetween(
            new Date(currentDate),
            moment(currentDate).add(1, 'weeks'),
            undefined,
            '[)'
          )
        )
        .concat(
          habit.backupHistory.filter((item) =>
            moment(item).isBetween(
              new Date(currentDate),
              moment(currentDate).add(1, 'weeks'),
              undefined,
              '[)'
            )
          )
        );

      chartArray.push([...thisWeekDone]);
      labelArray.push(
        `${moment(new Date(currentDate)).format('DD')} - ${moment(currentDate)
          .add(1, 'weeks')
          .subtract('1', 'day')
          .format('DD')}`
      );

      currentDate = moment(currentDate).add(1, 'week').toDate();
    }

    setWeeklyDoneChartArray(chartArray);
    setWeeklyDoneChartLabels(labelArray.slice(Math.max(labelArray.length - 5, 0)));
  }, []);

  useEffect(() => {
    if (!weeklyDoneChartArray) {
      setWeeklyDoneChartData([]);
      return;
    }

    setWeeklyDoneChartData(
      [...weeklyDoneChartArray.map((item: any) => item.length)].slice(
        Math.max(weeklyDoneChartArray.length - 5, 0)
      )
    );
  }, [weeklyDoneChartArray]);

  const handleDeleteDataAsk = () => {
    Alert.alert('Are you sure?', "Are you sure you want to delete this habit's data?", [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => handleDeleteData(),
        style: 'destructive',
      },
    ]);
  };

  const handleDeleteData = () => {
    if (!user) return;

    updateUser(deleteHabitData(user, habit._id));
    navigation.navigate('HabitsScreen');
  };

  const handleDeleteAsk = () => {
    Alert.alert('Are you sure?', 'Are you sure you want to delete this habit?', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => handleDelete(),
        style: 'destructive',
      },
    ]);
  };

  const handleDelete = () => {
    if (!user) return;

    updateUser(deleteHabit(user, habit._id));
    navigation.navigate('HabitsScreen');
  };

  if (!weeklyDoneChartLabels || !weeklyDoneChartArray || !weeklyDoneChartData)
    return <LoadingScreen />;

  const statsItem = (title: string, value: string | number, icon: any) => (
    <StyledCardWrapper>
      <Typography isCentered color={'secondary'}>
        {title}
      </Typography>

      <StyledCardContent>
        <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
          {value}
        </Typography>
        {icon}
      </StyledCardContent>
    </StyledCardWrapper>
  );

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
          <HabitHistoryCalendar habit={habit} />

          <>
            <Typography isCentered margin={'0 0 20px 0'} color={'secondary'}>
              Weekly done
            </Typography>
            <CustomLineChart
              segments={habit.repeat.length}
              labels={weeklyDoneChartLabels}
              datasets={[
                {
                  data: weeklyDoneChartData.length ? weeklyDoneChartData : [0],
                },
                {
                  data: [habit.repeat.length],
                  withDots: false,
                },
              ]}
            />
          </>

          <StyledStatCardsWrapper>
            {statsItem(
              'Current Streak',
              currentStreak,
              <FontAwesome5 name="fire" size={32} color="#4ADE80" />
            )}

            {statsItem(
              'Best Streak',
              bestStreak,
              <FontAwesome5 name="fire" size={32} color="#4ADE80" />
            )}

            {statsItem(
              'Total Done',
              totalDone,
              <FontAwesome name="check" size={32} color="#4ADE80" />
            )}

            {habit.backup && (
              <>
                {statsItem(
                  'Total main Goal',
                  totalMainGoalDone,
                  <FontAwesome name="check" size={32} color="#4ADE80" />
                )}

                {statsItem(
                  'Total backup Goal',
                  totalBackupGoalDone,
                  <FontAwesome name="check" size={32} color="#EAB308" />
                )}

                {statsItem(
                  'Main goal %',
                  Math.round((totalMainGoalDone / totalDone) * 100) || 0,
                  <FontAwesome5 name="percentage" size={32} color="#4ADE80" />
                )}
              </>
            )}
          </StyledStatCardsWrapper>

          {totalMainGoalDone + totalBackupGoalDone + totalUndone > 0 && (
            <CustomPieChart
              data={getPieChartData(totalMainGoalDone, totalBackupGoalDone, totalUndone)}
            />
          )}

          <TouchableOpacity onPress={handleDeleteDataAsk}>
            <Typography margin={'20px 0 20px 0'} isCentered color={'warning'}>
              Reset habit data
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAsk}>
            <Typography margin={'0 0 50px 0'} isCentered color={'error'}>
              Delete habit
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </MainTemplate>
    </>
  );
};

export default HabitsStatsScreen;
