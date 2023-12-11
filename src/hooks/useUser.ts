import { useVariablesContext } from "../contexts/VariablesContext";
import { PublicacionFinal, Usuario } from "../interfaces/products.interface";

import { readUserData } from "../firebase/database";
import { tiempoTranscurrido } from "../views/Home";

export default function useUser(){

    const {
        setLoading,
        setPublicaciones,
        setError
    } = useVariablesContext();

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
    return{
        getUsuarios
    }
}