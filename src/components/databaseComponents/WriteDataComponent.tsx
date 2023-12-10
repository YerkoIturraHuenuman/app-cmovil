import { format, utcToZonedTime } from "date-fns-tz";
import { putUser, writeUserData } from "../../firebase/database";
import { InterUsuario } from "../../interfaces/products.interface";

export const WriteDataComponent = async (object: InterUsuario, op: number) => {
  const id_random = `usuario_${getRandomNumber()}`;

  if (op === 1) {
    const user = {
      [object.userID ? object.userID : id_random]: {
        email: object.userEmail,
        registroCompleto: object.registroCompleto,
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
          fechaPublicacion: obtenerFechaActual(),
        },
      },
    };
    console.log("datos antes de bd: ", publicacion);
    writeUserData(publicacion, 2);
  } else if (op === 3) {
    //console.log("id avatar pasado: ", object.id_avatar);
    const addAvatar = {
      id_avatar: object.id_avatar,
      registroCompleto: object.registroCompleto,
    };

    console.log(
      "Respuesta subida avatar: ",
      putUser(addAvatar, object.userID as string)
    );
    return true;
  }
};

function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

function obtenerFechaActual(): Date {
  const fechaActual = new Date();
  const fechaActualChilena = utcToZonedTime(fechaActual, "America/Santiago");
  const fechaActualChilenaFormateada = format(
    fechaActualChilena,
    "yyyy-MM-dd HH:mm:ss",
    { timeZone: "America/Santiago" }
  );
  const fechaActualChilenaDate = new Date(fechaActualChilenaFormateada);
  return fechaActualChilenaDate;
}
