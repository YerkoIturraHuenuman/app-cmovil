import React from "react";
import { Button } from "react-native";
import { writeUserData } from "../../firebase/database";

export const WriteDataComponent = (
  userID: string | null,
  userEmail: string | null
) => {
  const id_random = `usuario_${getRandomNumber()}`;
  const user = {
    [userID ? userID : id_random]: {
      email: userEmail,
    },
  };
  writeUserData(user);
};
function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}
