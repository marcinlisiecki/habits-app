import React, { createContext, FunctionComponent, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { createLocalUser } from "@app/utils/userUtils";

export interface ContextState {
  user: User | null;
  isUserLoaded: boolean;
  loading: boolean;
  initialLoad: () => void;
  saveUser: () => void;
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

  const saveUser = async () => {
    await SecureStore.setItemAsync("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider
      value={{ user, initialLoad, isUserLoaded, loading, saveUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
