import React, { createContext, useContext, useState } from "react";

const VariablesContext = createContext<any>(undefined);

export const VariablesContextProvider = ({ children }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyUser, setKeyUser] = useState(undefined);
  const [coordenadas, setCoordenadas] = useState<any>();

  return (
    <VariablesContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        keyUser,
        setKeyUser,
        coordenadas,
        setCoordenadas,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariablesContext = () => {
  return useContext(VariablesContext);
};
