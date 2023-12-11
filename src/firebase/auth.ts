import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { RespuestaLogin } from "../interfaces/products.interface";

const signIn = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};

const logIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //console.log("=========");
      //console.log(userCredential.user);
      return {res: true, userID: userCredential.user.uid};
    })
    .catch((error) => {
      //console.error(error);
      return {res: false, userID: ''};
    });
};


export { signIn, logIn };
