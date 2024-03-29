import React, { FunctionComponent, createContext, useState, useEffect } from 'react';

import { createLocalUser } from '@app/utils/userUtils';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ContextState {
  user: User | null;
  isUserLoaded: boolean;
  loading: boolean;
  initialLoad: () => void;
  saveUser: () => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<ContextState | null>(null);

const UserProvider: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const initialLoad = async () => {
    let userString: string | null = await AsyncStorage.getItem('user');
    let user: null | User;

    if (!userString || userString == 'null') {
      user = createLocalUser();
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      user = JSON.parse(userString);
    }

    setUser(user);
    setIsUserLoaded(true);
  };

  const updateUser = async (newUser: User) => {
    setUser({ ...newUser });
  };

  const saveUser = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    saveUser().then();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        initialLoad,
        isUserLoaded,
        loading,
        saveUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
