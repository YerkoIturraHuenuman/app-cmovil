export interface InterUsuario {
  userID: string | null;
  userEmail: string | null;
  coordenadasPublicacion: object | null;
}
export interface RespuestaLogin {
  res: boolean;
  userID: string;
}