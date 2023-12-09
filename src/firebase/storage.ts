import { InterDataImg } from "../interfaces/products.interface";
import { storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const writeData = async (data: InterDataImg) => {
  const imageRef = ref(
    storage,
    `usuarios/${data.userID}/publicaciones/${data.PublicacionID}`
  );
  return convertedImage(data.img)
    .then((res) => {
      //console.log("data antes de subir: ", res);
      if (res)
        return uploadBytes(imageRef, res as Blob).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        });
    })
    .catch((error) => console.log(error));
};

const readUserData = () => {};
const convertedImage = async (uri: string) => {
  return await new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open("GET", uri, true);
    xhr.responseType = "blob";
    xhr.send(null);
  });
};
export { writeData, readUserData };
