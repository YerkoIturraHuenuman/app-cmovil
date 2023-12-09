import React from "react";
import { Button } from "react-native";
import { writeUserData } from "../../firebase/database";
import { InterUsuario } from "../../interfaces/products.interface";

export const WriteDataComponent = (object: InterUsuario, op: number) => {
  const id_random = `usuario_${getRandomNumber()}`;

  if (op === 1) {
    const user = {
      [object.userID ? object.userID : id_random]: {
        email: object.userEmail,
      },
    };
    writeUserData(user, 1);
  } else if (op === 2) {
    const publicacion = {
      userID: object.userID,
      data_publicacion: {
        [object.PublicacionID ? object.PublicacionID : id_random]: {
          direccion: object.direccion,
          coordenada: object.coordenadasPublicacion,
          url_img: object.url_img,
        },
      },
    };
    writeUserData(publicacion, 2);
  }
};
function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}
