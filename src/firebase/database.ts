import { useVariablesContext } from "../contexts/VariablesContext";
import { database } from "./firebaseConfig";
import { ref, set, update, get, onValue } from "firebase/database";

const writeUserData = async (data: any, op: number) => {
  console.log("entra en writeUserData");

  if (op === 1) {
    console.log("entra op 1");
    const userRef = ref(database, "usuarios");

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return update(userRef, data);
    } else {
      return set(userRef, data);
    }
  } else if (op === 2) {
    console.log("entra op 2");

    const userPostRef = ref(database, `usuarios/${data.userID}/publicaciones`);

    const snapshot = await get(userPostRef);
    console.log("data antes de la bd 2: ", data.data_publicacion);
    if (snapshot.exists()) {
      return update(userPostRef, data.data_publicacion);
    } else {
      return set(userPostRef, data.data_publicacion);
    }
  }
};

const readUserData = () => {
  const userRef = ref(database, "usuarios");

  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
const getUser = (id_user: string) => {
  const userRef = ref(database, `usuarios/${id_user}`);

  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
const putUser = async (data: any, userID: string) => {
  console.log("Key user: ", userID);
  console.log("id avatar: ", data);

  const userRef = ref(database, `usuarios/${userID}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return update(userRef, data);
  } else {
    return set(userRef, data);
  }
};
export { writeUserData, readUserData, getUser, putUser };
