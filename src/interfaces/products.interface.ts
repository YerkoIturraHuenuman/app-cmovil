export interface InterUsuario {
  userID?: string | null;
  userEmail?: string | null;
  PublicacionID?: string | null;
  direccion?: string | null;
  coordenadasPublicacion?: object | null | undefined;
  url_img?: string | unknown;
  registroCompleto?: boolean;
  id_avatar?: number;
}
export interface RespuestaLogin {
  res: boolean;
  userID: string;
}
export interface InterDataImg {
  userID: string;
  PublicacionID: string;
  img: any;
}
export interface Usuario {
  email: string;
  registroCompleto: boolean;
  id_avatar?: number;
  publicaciones?: Publicacion;
}

export interface Publicacion {
  coordenada: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  direccion: string;
  url_img: string;
  fechaPublicacion: Date;
}

export interface PublicacionFinal {
  id_avatar: number;
  email: string;
  direccion: string;
  coordenadas: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  url_image: string;
  tiempoTranscurrido: string;
}
