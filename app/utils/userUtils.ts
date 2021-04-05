import "react-native-get-random-values";
import { v4 } from "uuid";

export const createLocalUser = (): User => {
  const _id = v4();

  return {
    _id,
    habits: [],
  };
};
