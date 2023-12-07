import React from "react";
import { Button } from "react-native";
import { writeUserData } from "../../firebase/database";
import { InterUsuario } from "../../interfaces/products.interface";

export const WriteDataComponent = (object: InterUsuario, op: number) => {
  if (op === 1) {
    const id_random = `usuario_${getRandomNumber()}`;
    const user = {
      [object.userID ? object.userID : id_random]: {
        email: object.userEmail,
      },
    };
    writeUserData(user, 1);
  } else if (op === 2) {
    const id_random = generarClave();
    const publicacion = {
      userID: object.userID,
      data_publicacion: {
        [id_random]: {
          coordenada: object.coordenadasPublicacion,
        },
      },
    };
    writeUserData(publicacion, 2);
  }
};
function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}
function generarClave(): string {
  let caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let clave = "";
  for (let i = 0; i < 10; i++) {
    clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return clave;
}
