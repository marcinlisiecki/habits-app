import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator, Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import 'moment-weekday-calc';
import { deleteHabitData } from '@app/mutations/habit';
import { enumerateDaysBetweenDates } from '@app/utils/calendar';

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
import { deleteHabit } from '@app/mutations/habit';
import useUser from '@app/hooks/useUser';

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

  const doneHistory = habit.doneHistory.sort(
    (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
  );
  const backupHistory = habit.backupHistory.sort(
    (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
  );

  const firstDay = Math.min(
    new Date(doneHistory[0]).getTime() || Infinity,
    new Date(backupHistory[0]).getTime() || Infinity
  );

  const lastDay = Math.max(
    new Date(doneHistory.reverse()[0]).getTime() || -Infinity,
    new Date(backupHistory.reverse()[0]).getTime() || -Infinity
  );

  // @ts-ignore
  const totalDays = moment().weekdayCalc({
    rangeStart: firstDay,
    rangeEnd: lastDay,
    weekdays: habit.repeat,
  });
  const totalUndone = totalDays - totalDone;

  useEffect(() => {
    setCurrentStreak(calculateStreak(habit, new Date()));
    setBestStreak(
      Math.max(
        ...enumerateDaysBetweenDates(new Date(firstDay), new Date(lastDay)).map((day) => {
          return calculateStreak(habit, new Date(day));
        }),
        0
      )
    );
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
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <ActivityIndicator color={'#40D68D'} size={'large'} />
      </View>
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
          <>
            <Typography isCentered margin={'0 0 20px 0'} color={'secondary'}>
              Weekly done
            </Typography>
            <LineChart
              fromZero
              data={{
                labels: weeklyDoneChartLabels,
                datasets: [
                  {
                    data: weeklyDoneChartData.length ? weeklyDoneChartData : [0],
                  },
                  {
                    data: [habit.repeat.length],
                    withDots: false,
                  },
                ],
              }}
              formatYLabel={(yValue) => yValue}
              height={200}
              width={Dimensions.get('window').width}
              chartConfig={{
                backgroundColor: '#0B0E11',
                backgroundGradientFrom: '#0B0E11',
                backgroundGradientTo: '#0B0E11',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(106, 223, 166, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#6ADFA6',
                  fill: '#6ADFA6',
                },
              }}
              bezier
              segments={habit.repeat.length}
              style={{
                margin: 0,
                padding: 0,
                marginLeft: -30,
                marginBottom: 50,
              }}
            />
          </>

          {totalMainGoalDone + totalBackupGoalDone + totalUndone > 0 && (
            <PieChart
              data={[
                {
                  name: 'Main goal',
                  color: '#40D68D',
                  count: totalMainGoalDone || 0,
                  legendFontColor: '#fff',
                },
                {
                  name: 'Backup goal',
                  color: '#EAB308',
                  count: totalBackupGoalDone || 0,
                  legendFontColor: '#fff',
                },
                {
                  name: 'Undone',
                  color: '#E64C4C',
                  count: totalUndone || 0,
                  legendFontColor: '#fff',
                },
              ]}
              width={Dimensions.get('window').width}
              height={200}
              accessor={'count'}
              backgroundColor={'transparent'}
              paddingLeft={'0'}
              chartConfig={{
                backgroundColor: '#0B0E11',
                backgroundGradientFrom: '#0B0E11',
                backgroundGradientTo: '#0B0E11',
                color: (opacity = 1) => `rgba(106, 223, 166, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{ marginBottom: 40 }}
            />
          )}

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
                Best Streak
              </Typography>

              <StyledCardContent>
                <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
                  {bestStreak}
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

            {habit.backup && (
              <>
                <StyledCardWrapper>
                  <Typography isCentered color={'secondary'}>
                    Total main Goal
                  </Typography>

                  <StyledCardContent>
                    <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
                      {totalMainGoalDone}
                    </Typography>
                    <FontAwesome name="check" size={32} color="#4ADE80" />
                  </StyledCardContent>
                </StyledCardWrapper>

                <StyledCardWrapper>
                  <Typography isCentered color={'secondary'}>
                    Total backup Goal
                  </Typography>

                  <StyledCardContent>
                    <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
                      {totalBackupGoalDone}
                    </Typography>
                    <FontAwesome name="check" size={32} color="#EAB308" />
                  </StyledCardContent>
                </StyledCardWrapper>

                <StyledCardWrapper>
                  <Typography isCentered color={'secondary'}>
                    Main goal %
                  </Typography>

                  <StyledCardContent>
                    <Typography weight={700} size={'h2'} color={'primary'} margin={'0 10px 0 0'}>
                      {Math.round((totalMainGoalDone / totalDone) * 100) || 0}
                    </Typography>
                    <FontAwesome5 name="percentage" size={32} color="#4ADE80" />
                  </StyledCardContent>
                </StyledCardWrapper>
              </>
            )}
          </StyledStatCardsWrapper>

          <HabitHistoryCalendar habit={habit} />

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
