import { database } from "./firebaseConfig";
import { ref, set,update,get, onValue } from "firebase/database";

const userRef = ref(database, "usuarios");

const writeUserData = async(data: any) => {
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return update(userRef, data);
  } else {
    return set(userRef, data);
  }
};

const readUserData = () => {
  return new Promise((resolve, reject) => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
};

export { writeUserData, readUserData };
