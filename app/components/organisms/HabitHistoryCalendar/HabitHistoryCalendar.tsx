import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  StyledCalendarDay,
  StyledCalendarDaysWrapper,
  StyledCalendarHeaderWrapper,
  StyledCalendarWeekday,
  StyledCalendarWeekdaysWrapper,
  StyledCalendarWrapper,
} from './styles';

import { AntDesign } from '@expo/vector-icons';
import Typography from '@app/components/atoms/Typography';
import moment from 'moment';
import { mutateMonthByHabitStatus } from '@app/utils/calendar';
import { Text } from 'react-native';

interface Props {
  habit: Habit;
}

const HabitHistoryCalendar: FunctionComponent<Props> = ({ habit }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<any>(null);

  useEffect(() => {
    setDays(mutateMonthByHabitStatus(habit, selectedMonth));
  }, [selectedMonth]);

  const changeMonth = (value: number) => {
    setSelectedMonth(moment(selectedMonth).add(value, 'month').toDate());
  };

  if (!days) return <Text>loading...</Text>;

  return (
    <StyledCalendarWrapper>
      <StyledCalendarHeaderWrapper>
        <AntDesign name={'arrowleft'} size={28} color={'#aaa'} onPress={() => changeMonth(-1)} />
        <Typography weight={700}>{moment(selectedMonth).format('MMMM YYYY')}</Typography>
        <AntDesign name={'arrowright'} size={28} color={'#aaa'} onPress={() => changeMonth(1)} />
      </StyledCalendarHeaderWrapper>

      <StyledCalendarWeekdaysWrapper>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((item, index) => (
          <StyledCalendarWeekday key={index}> {item}</StyledCalendarWeekday>
        ))}
      </StyledCalendarWeekdaysWrapper>
      <StyledCalendarDaysWrapper>
        {[
          ...Array(
            moment(days[0].date.toISOString()).weekday() === 0
              ? 6
              : moment(days[0].date.toISOString()).weekday() - 1
          ),
        ].map((item, index) => (
          <StyledCalendarDay key={index} />
        ))}

        {days.map((day: any) => {
          const isGray = day.color == 'none';
          const blackColor = day.color === 'warning';

          return (
            <StyledCalendarDay key={day.date} color={day.color}>
              <Typography
                numberOfLines={1}
                color={blackColor ? 'black' : isGray ? 'tertiary' : 'primary'}
              >
                {day.date.getDate()}
              </Typography>
            </StyledCalendarDay>
          );
        })}
      </StyledCalendarDaysWrapper>
    </StyledCalendarWrapper>
  );
};

export default HabitHistoryCalendar;
