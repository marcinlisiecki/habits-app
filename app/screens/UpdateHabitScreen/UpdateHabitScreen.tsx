import React, { FunctionComponent, useState } from 'react';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import MainTemplate from '@app/templates/MainTemplate';
import Typography from '@app/components/atoms/Typography';

import { StyledHeader, StyledHeaderContent } from './styles';

import { Route, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import HabitForm from '@app/components/organisms/HabitForm';
import { Alert, View } from 'react-native';
import useUser from '@app/hooks/useUser';
import { deleteHabit } from '@app/mutations/habit';

interface Props {
  route?: RouteProp<StackParams, 'UpdateHabitScreen'>;
}

const UpdateHabitScreen: FunctionComponent<Props> = ({ route }) => {
  const { user, updateUser } = useUser();
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const initialHabit: Habit | undefined = route?.params.habit;

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
    if (!initialHabit || !user) return;

    updateUser(deleteHabit(user, initialHabit._id));
    navigation.navigate('HabitsScreen');
  };

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
            Update habit
          </Typography>

          <MaterialIcons
            name={'delete-outline'}
            size={28}
            color={'#aaa'}
            onPress={handleDeleteAsk}
          />
        </StyledHeaderContent>
      </StyledHeader>
      <MainTemplate>
        <HabitForm createNew={false} initialHabit={initialHabit} />
      </MainTemplate>
    </>
  );
};

export default UpdateHabitScreen;
