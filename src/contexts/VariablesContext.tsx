import React, { createContext, useContext, useState } from "react";

const VariablesContext = createContext<any>(undefined);
const UserContext = createContext<any>(undefined);
const AuthContext = createContext<any>(undefined);

export const VariablesContextProvider = ({ children }: any) => {
  //....................variablesContext..........................................
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  //.....................userContext.........................................
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyUser, setKeyUser] = useState(undefined);
  const [coordenadas, setCoordenadas] = useState<any>();
  //...................authContext...........................................
  const [title, setTitle] = useState<string>("Inicio Sesión");
  const [titleBoton, setTitleBoton] = useState<string>("Login");
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);

  return (
    <VariablesContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        error,
        setError,
        loading,
        setLoading,
        toggle,
        setToggle
      }}
    >
      <AuthContext.Provider value={{
        title,
        setTitle,
        titleBoton,
        setTitleBoton,
        mensaje,
        setMensaje
      }}>
        <UserContext.Provider value={{
          email,
          setEmail,
          password,
          setPassword,
          keyUser,
          setKeyUser,
          coordenadas,
          setCoordenadas
        }} >
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
