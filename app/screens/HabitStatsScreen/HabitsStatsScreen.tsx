import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { mutateMonthByHabitStatus } from '@app/utils/calendar';

import moment from 'moment';

import MainTemplate from '@app/templates/MainTemplate';
import Typography from '@app/components/atoms/Typography';

import {
  StyledHeader,
  StyledHeaderContent,
  StyledCalendarWrapper,
  StyledCalendarWeekdaysWrapper,
  StyledCalendarWeekday,
  StyledCalendarDay,
  StyledCalendarDaysWrapper,
  StyledCalendarHeaderWrapper,
} from './styles';

interface Props {
  route: RouteProp<StackParams, 'HabitStatsScreen'>;
}

const HabitsStatsScreen: FunctionComponent<Props> = ({ route }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<any>(null);

  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const habit: Habit = route.params.habit;

  useEffect(() => {
    setDays(mutateMonthByHabitStatus(habit, selectedMonth));
  }, [selectedMonth]);

  const changeMonth = (value: number) => {
    setSelectedMonth(moment(selectedMonth).add(value, 'month').toDate());
  };

  if (!days) return <Text>loading...</Text>;

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
          <StyledCalendarWrapper>
            <StyledCalendarHeaderWrapper>
              <AntDesign name={'arrowleft'} size={28} color={'#aaa'} onPress={() => changeMonth(-1)} />
              <Typography weight={700}>{moment(selectedMonth).format('MMMM YYYY')}</Typography>
              <AntDesign name={'arrowright'} size={28} color={'#aaa'} onPress={() => changeMonth(1)} />
            </StyledCalendarHeaderWrapper>

            <StyledCalendarWeekdaysWrapper>
              {['M', 'T', 'W', 'F', 'T', 'S', 'S'].map((item, index) => (
                <StyledCalendarWeekday key={index}> {item}</StyledCalendarWeekday>
              ))}
            </StyledCalendarWeekdaysWrapper>
            <StyledCalendarDaysWrapper>
              {[
                ...Array(
                  moment(days[0].date.toISOString()).weekday() ? moment(days[0].date.toISOString()).weekday() - 1 : 0
                ),
              ].map((item, index) => (
                <StyledCalendarDay key={index} />
              ))}

              {days.map((day: any) => {
                const isGray = day.color == 'none';
                const blackColor = day.color === 'warning';

                return (
                  <StyledCalendarDay key={day.date} color={day.color}>
                    <Typography numberOfLines={1} color={blackColor ? 'black' : isGray ? 'tertiary' : 'primary'}>
                      {day.date.getDate()}
                    </Typography>
                  </StyledCalendarDay>
                );
              })}
            </StyledCalendarDaysWrapper>
          </StyledCalendarWrapper>
        </ScrollView>
      </MainTemplate>
    </>
  );
};

export default HabitsStatsScreen;
