import React, { createContext, useContext, useState } from "react";
import { PublicacionFinal } from "../interfaces/products.interface";

const VariablesContext = createContext<any>(undefined);
const UserContext = createContext<any>(undefined);
const AuthContext = createContext<any>(undefined);

export const VariablesContextProvider = ({ children }: any) => {
  //....................variablesContext..........................................
  const [publicaciones, setPublicaciones] = useState<PublicacionFinal[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  //.....................userContext.........................................
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyUser, setKeyUser] = useState(undefined);
  const [coordenadas, setCoordenadas] = useState<any>();
  const [correctData, setCorrectData] = useState(false);
  //...................authContext...........................................
  const [title, setTitle] = useState<string>("Inicio Sesión");
  const [titleBoton, setTitleBoton] = useState<string>("Login");
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);

  return (
    <VariablesContext.Provider
      value={{
        publicaciones,
        setPublicaciones,
        modalVisible,
        setModalVisible,
        error,
        setError,
        loading,
        setLoading,
        toggle,
        setToggle,
        keyUser,
        setKeyUser,
      }}
    >
      <AuthContext.Provider
        value={{
          title,
          setTitle,
          titleBoton,
          setTitleBoton,
          mensaje,
          setMensaje,
        }}
      >
        <UserContext.Provider
          value={{
            email,
            setEmail,
            password,
            setPassword,
            keyUser,
            setKeyUser,
            coordenadas,
            setCoordenadas,
            correctData,
            setCorrectData,
          }}
        >
          {children}
        </UserContext.Provider>
      </AuthContext.Provider>
    </VariablesContext.Provider>
  );
};

export const useVariablesContext = () => {
  return useContext(VariablesContext);
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
