import { database } from "./firebaseConfig";
import { ref, set, onValue } from "firebase/database";

const userRef = ref(database, "users/usuario23");

const writeUserData = (data: any) => {
  return set(userRef, data);
};

const readUserData = () => {
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log('====================')
    console.log('DATA en RDB')
    console.log(data);
  });
};

export { writeUserData, readUserData };
