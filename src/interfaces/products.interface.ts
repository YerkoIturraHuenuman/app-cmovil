export interface InterUsuario {
  userID: string | null;
  userEmail: string | null;
  PublicacionID: string | null;
  direccion: string | null;
  coordenadasPublicacion: object | null;
  url_img: string | unknown;
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
export interface Coordenada {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

export interface Publicacion {
  coordenada: Coordenada;
  url_img: string;
}

export interface Usuario {
  email?: string;
  publicaciones?: Record<string, Publicacion>;
}

export interface Usuarios {
  [key: string]: Usuario;
}
