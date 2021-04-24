import React, { FunctionComponent, useState } from "react";

import useUser from "@app/hooks/useUser";
import { generateUUID } from "@app/utils/uuid";
import { createNewHabit, updateHabit } from "@app/mutations/habit";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import FormField from "@app/components/molecules/FormField";
import Label from "@app/components/atoms/Label";
import SelectRepeat from "@app/components/molecules/SelectRepeat";
import Button from "@app/components/atoms/Button";

import { createError } from "./utils";

interface ValidationError {
  path: string;
  message: string;
}

interface Props {
  initialHabit?: Habit;
  createNew?: boolean;
}

const HabitForm: FunctionComponent<Props> = ({
  initialHabit = null,
  createNew = true,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const { updateUser, user } = useUser();

  const [name, setName] = useState<string>(initialHabit?.name || "");
  const [backup, setBackup] = useState<string>(initialHabit?.backup || "");
  const [repeat, setRepeat] = useState<number[]>(initialHabit?.repeat || []);
  const [error, setError] = useState<ValidationError | null>(null);

  const handleSelectRepeat = (value: number) => {
    let newRepeat: number[] = [...repeat];

    if (newRepeat.includes(value))
      newRepeat = newRepeat.filter((item) => item !== value);
    else newRepeat.push(value);

    setRepeat(newRepeat);
  };

  const handleSelectAll = () =>
    isAllSelected() ? setRepeat([]) : setRepeat([0, 1, 2, 3, 4, 5, 6]);

  const isSelected = (value: number) => repeat.includes(value);
  const isAllSelected = (): boolean =>
    [0, 1, 2, 3, 4, 5, 6].every((item) => repeat.includes(item));

  const handleCreateHabit = async () => {
    if (!user) return;

    if (name.length <= 0) {
      setError({
        path: "name",
        message: "Name is required",
      });
      return;
    }

    // if (backup.length <= 0) {
    //   setError({
    //     path: "backup",
    //     message: "Backup goal is required",
    //   });
    //   return;
    // }

    if (repeat.length <= 0) {
      setError({
        path: "repeat",
        message: "You need to specify when you want repeat habit",
      });
      return;
    }

    if (!createNew && !initialHabit) return;

    let newHabit: Habit = {
      _id: createNew ? generateUUID() : initialHabit?._id || generateUUID(),
      history: createNew ? [] : initialHabit?.history || [],
      name,
      repeat,
    };

    if (backup.length > 0) newHabit = { ...newHabit, backup };

    if (createNew) updateUser(createNewHabit(user, newHabit));
    else updateUser(updateHabit(user, newHabit));

    navigation.goBack();
  };

  return (
    <>
      <FormField
        label={"Name"}
        marginTop={"20px"}
        value={name}
        onChange={(text) => setName(text)}
      />
      {createError(error, "name")}

      <FormField
        label={"Backup goal (optional)"}
        marginTop={"40px"}
        value={backup}
        onChange={(text) => setBackup(text)}
      />
      {createError(error, "backup")}

      <Label margin={"40px 0 4px 0"}>When you want to repeat the habit?</Label>
      <SelectRepeat
        isSelected={isSelected}
        handleSelectAll={handleSelectAll}
        handleSelectRepeat={handleSelectRepeat}
        isAllSelected={isAllSelected}
      />
      {createError(error, "repeat")}

      <Button onPress={handleCreateHabit}>
        {createNew ? "Create" : "Update"}
      </Button>
    </>
  );
};
export default HabitForm;
