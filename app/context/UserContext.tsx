import React, { createContext, FunctionComponent, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { createLocalUser } from "@app/utils/userUtils";

export interface ContextState {
  user: User | null;
  isUserLoaded: boolean;
  loading: boolean;
  initialLoad: () => void;
  saveUser: () => void;
  handleAddHabit: (habit: Habit) => void;
}

const UserContext = createContext<ContextState | null>(null);

const UserProvider: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const initialLoad = async () => {
    let userString: string | null = await SecureStore.getItemAsync("user");
    let user: null | User;

    if (!userString) {
      user = createLocalUser();
      await SecureStore.setItemAsync("user", JSON.stringify(user));
    } else {
      user = JSON.parse(userString);
    }

    setUser(user);
    setIsUserLoaded(true);
  };

  const handleAddHabit = async (habit: Habit) => {
    if (user === null) return;

    setUser({ ...user, habits: [...user.habits, habit] });
    await saveUser();
  };

  const saveUser = async () => {
    await SecureStore.setItemAsync("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        initialLoad,
        isUserLoaded,
        loading,
        saveUser,
        handleAddHabit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
