import React, { useEffect, createContext, useContext, useState } from "react";
import { useVariablesContext } from "../contexts/VariablesContext"; // Asegúrate de ajustar la ruta correcta

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Publicacion from "../containers/Publicacion";
import ModalMap from "../containers/ModalMap";

import { ReadDataComponent } from "../components/databaseComponents/ReadDataComponent";
import { readUserData } from "../firebase/database";

//--------------------------------------------------------------------------------------

export default function Home({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const { modalVisible, setModalVisible } = useVariablesContext();
  const [usuarios, setUsuarios] = useState<unknown>([]);
  //------------------------FUNCIONES PRINCIPALES--------------------------
  const getUsuarios = async () => {
    const users = await readUserData();
    setUsuarios(users);
  };
  //------------------------PROCESOS--------------------------
  useEffect(
    () =>
      navigation.addListener("focus", () => {
        console.log("home");
        getUsuarios();
      }),
    [, navigation]
  );
  console.log("usuraios: ", usuarios);
  return (
    <View style={styles.body}>
      <View style={styles.contenedorPrincipal}>
        <Publicacion setModalVisible={setModalVisible} />
      </View>
      <View style={styles.contenedorBotonesPrincipales}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CamaraScreen")}
          style={styles.botonMas}
        >
          <FontAwesomeIcon icon={faCirclePlus} size={60} color="#5bee00" />
        </TouchableOpacity>
      </View>
      <ModalMap modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 110,
    paddingBottom: 78,
    backgroundColor: "#fff",
    flex: 1,
  },
  contenedorPrincipal: {
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
    flex: 1,
  },
  headerPublicacion: {
    paddingHorizontal: 15,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  fotoPerfil: {
    width: 55,
    height: 55,
    objectFit: "cover",
    borderRadius: 100,
  },
  nombreUserPublicacion: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
  },
  fotoPublicacion: {
    marginTop: 20,
    width: "100%",
    height: 400,
  },
  footerPublicacion: {
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textUbicacion: {
    marginHorizontal: 10,
    flex: 1,
  },
  botonMapa: {
    backgroundColor: "#5bee00",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 7,
  },
  contenedorBotonesPrincipales: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  botonMas: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "90%",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: 200,
    height: 10,
    backgroundColor: "#f1f1f1",
  },
  map: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  popperMarca: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d8d8d8",
  },
});
