import { generateUUID } from "@app/utils/uuid";

export const createLocalUser = (): User => ({
  _id: generateUUID(),
  habits: [],
});
