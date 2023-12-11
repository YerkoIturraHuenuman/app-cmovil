import { useVariablesContext } from "../contexts/VariablesContext";
import { PublicacionFinal, Usuario } from "../interfaces/products.interface";
import { utcToZonedTime } from "date-fns-tz";

import { readUserData } from "../firebase/database";

export default function useUser() {
  const { setLoading, setPublicaciones, setError } = useVariablesContext();

  const getUsuarios = async () => {
    setLoading(true);
    try {
      const res = (await readUserData()) as Usuario;
      if (res) {
        const usuariosConPublicaciones = Object.values(res).filter(
          (usuario: Usuario) => {
            return usuario.publicaciones;
          }
        );
        let resultado: PublicacionFinal[] = [];
        usuariosConPublicaciones.forEach((usuario: any) => {
          Object.values(usuario.publicaciones).forEach((publicacion: any) => {
            resultado.push({
              id_avatar: usuario.id_avatar,
              email: usuario.email,
              direccion: publicacion.direccion,
              coordenadas: publicacion.coordenada,
              url_image: publicacion.url_img,
              tiempoTranscurrido: tiempoTranscurrido(
                new Date(publicacion.fechaPublicacion)
              ),
            });
          });
        });
        setPublicaciones(resultado);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(false);
    }
  };
  return {
    getUsuarios,
  };
}

function tiempoTranscurrido(fechaPasada: Date): string {
  const fechaActual = new Date();
  const fechaActualChilena = utcToZonedTime(fechaActual, "America/Santiago");

  const diferenciaMillis = fechaActualChilena.getTime() - fechaPasada.getTime();
  const segundosTranscurridos = Math.floor(diferenciaMillis / 1000);
  const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
  const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
  const diasTranscurridos = Math.floor(horasTranscurridas / 24);
  const mesesTranscurridos = Math.floor(diasTranscurridos / 30);
  const añosTranscurridos = Math.floor(mesesTranscurridos / 12);

  if (segundosTranscurridos < 60) {
    return "Hace un momento";
  } else if (minutosTranscurridos === 1) {
    return "Hace 1 minuto";
  } else if (minutosTranscurridos < 60) {
    return `Hace ${minutosTranscurridos} minutos`;
  } else if (horasTranscurridas === 1) {
    return "Hace 1 hora";
  } else if (horasTranscurridas < 24) {
    return `Hace ${horasTranscurridas} horas`;
  } else if (diasTranscurridos === 1) {
    return "Hace 1 día";
  } else if (diasTranscurridos < 30) {
    return `Hace ${diasTranscurridos} días`;
  } else if (mesesTranscurridos === 1) {
    return "Hace 1 mes";
  } else if (mesesTranscurridos < 12) {
    return `Hace ${mesesTranscurridos} meses`;
  } else if (añosTranscurridos === 1) {
    return "Hace 1 año";
  } else {
    return `Hace ${añosTranscurridos} años`;
  }
}
