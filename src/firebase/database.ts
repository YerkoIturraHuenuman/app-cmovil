import { Usuarios } from "../interfaces/products.interface";
import { database } from "./firebaseConfig";
import { ref, set, update, get, onValue } from "firebase/database";

const writeUserData = async (data: any, op: number) => {
  if (op === 1) {
    const userRef = ref(database, "usuarios");

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return update(userRef, data);
    } else {
      return set(userRef, data);
    }
  } else if (op === 2) {
    const userPostRef = ref(database, `usuarios/${data.userID}/publicaciones`);

    const snapshot = await get(userPostRef);

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

export { writeUserData, readUserData };
