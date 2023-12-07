import React, { createContext, useContext, useState } from "react";

const VariablesContext = createContext<any>(undefined);

export const VariablesContextProvider = ({ children }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyUser, setKeyUser] = useState(undefined);

  return (
    <VariablesContext.Provider
      value={{ modalVisible, setModalVisible, keyUser, setKeyUser }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariablesContext = () => {
  return useContext(VariablesContext);
};
