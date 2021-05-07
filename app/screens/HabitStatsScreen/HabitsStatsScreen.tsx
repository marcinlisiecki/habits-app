import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

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
  const [weeklyDoneChartData, setWeeklyDoneChartData] = useState<any[]>([]);
  const [weeklyDoneChartArray, setWeeklyDoneChartArray] = useState<any[]>([]);
  const [weeklyDoneChartLabels, setWeeklyDoneChartLabels] = useState<any[]>([]);

  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const habit: Habit = route.params.habit;

  const currentStreak: number = calculateStreak(habit, new Date());
  const totalDone: number = habit.doneHistory.length + habit.backupHistory.length;

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
    setWeeklyDoneChartLabels(labelArray);
  }, []);

  useEffect(() => {
    console.log(weeklyDoneChartData);
    setWeeklyDoneChartData([...weeklyDoneChartArray.map((item: any) => item.length)]);
  }, [weeklyDoneChartArray]);

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
          </StyledStatCardsWrapper>

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

          <HabitHistoryCalendar habit={habit} />
        </ScrollView>
      </MainTemplate>
    </>
  );
};

export default HabitsStatsScreen;
