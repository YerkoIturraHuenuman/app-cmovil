import React, { useEffect, createContext, useContext, useState } from "react";
import { useVariablesContext } from "../contexts/VariablesContext"; // Asegúrate de ajustar la ruta correcta

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Publicacion } from "../components/Publicacion";
import ModalMap from "../containers/ModalMapContainer";

import { ReadDataComponent } from "../components/databaseComponents/ReadDataComponent";
import { readUserData } from "../firebase/database";
import { PublicacionFinal, Usuario } from "../interfaces/products.interface";
import { ErrorComp } from "../components/Error";
import { Carga } from "../components/Carga";

//--------------------------------------------------------------------------------------

export default function Home({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const { modalVisible, setModalVisible, coordenadas, setCoordenadas } =
    useVariablesContext();
  const [publicaciones, setPublicaciones] = useState<PublicacionFinal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //------------------------FUNCIONES PRINCIPALES--------------------------
  const getUsuarios = async () => {
    setLoading(true);
    try {
      const res = (await readUserData()) as Usuario;
      if (res) {
        const usuariosConPublicaciones = Object.values(res).filter(
          (usuario: Usuario) => {
            console.log(usuario);
            return usuario.publicaciones;
          }
        );
        let resultado: PublicacionFinal[] = [];
        usuariosConPublicaciones.forEach((usuario: any) => {
          Object.values(usuario.publicaciones).forEach((publicacion: any) => {
            resultado.push({
              email: usuario.email,
              direccion: publicacion.direccion,
              coordenadas: publicacion.coordenada,
              url_image: publicacion.url_img,
            });
          });
        });
        setPublicaciones(resultado);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
  //------------------------PROCESOS--------------------------
  useEffect(
    () =>
      navigation.addListener("focus", () => {
        console.log(
          "==================================================================================================================================================================="
        );
        getUsuarios();
      }),
    [navigation]
  );
  if (error) return <ErrorComp title={"Tuvimos un problema :c"} />;
  else if (loading) return <Carga />;
  return (
    <View style={styles.body}>
      <View style={styles.contenedorPrincipal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {publicaciones.map((publicacion: any, index: number) => (
            <Publicacion
              key={index}
              userName={publicacion.email}
              address={publicacion.direccion}
              coords={publicacion.coordenadas}
              setCoordenadas={setCoordenadas}
              imagePost={publicacion.url_image}
              setModalVisible={setModalVisible}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.contenedorBotonesPrincipales}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CamaraScreen")}
          style={styles.botonMas}
        >
          <FontAwesomeIcon icon={faCirclePlus} size={60} color="#5bee00" />
        </TouchableOpacity>
      </View>
      <ModalMap
        coords={coordenadas}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  contenedorPrincipal: {
    paddingTop: 90,
    flex: 1,
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
