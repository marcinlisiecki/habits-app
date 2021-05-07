import React, { FunctionComponent } from 'react';
import Typography from '@app/components/atoms/Typography';

import useUser from '@app/hooks/useUser';
import { changeHabitStatus } from '@app/mutations/habit';
import { calculateStreak } from '@app/utils/habits';

import { StyledWrapper } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';

interface Props {
  habit: Habit;
  date: Date;
}

const HabitsListItem: FunctionComponent<Props> = ({ habit, date }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const { user, updateUser } = useUser();

  const { name, backup } = habit;
  const streak = calculateStreak(habit, date);

  const status = habit.doneHistory.includes(date.toDateString())
    ? 'done'
    : habit.backupHistory.includes(date.toDateString())
    ? 'backup'
    : 'undone';

  const handleClick = async () => {
    if (moment(date) <= moment(new Date())) {
      if (!user) return;
      await updateUser(changeHabitStatus({ user, habit, date }));
    }
  };

  const handleLongPress = () => {
    navigation.navigate('HabitStatsScreen', { habit });
  };

  return (
    <StyledWrapper onPress={handleClick} onLongPress={handleLongPress} status={status}>
      <Typography size={'h5'} weight={600} color={'primary'}>
        {name}
      </Typography>
      {backup && (
        <Typography size={'p'} weight={500} color={'secondary'}>
          {backup}
        </Typography>
      )}
      <Typography
        margin={'10px 0 0 0'}
        color={streak > 0 ? 'special' : 'secondary'}
        weight={500}
        letterSpacing={'1px'}
      >
        {streak} days streak
      </Typography>
    </StyledWrapper>
  );
};

export default HabitsListItem;
