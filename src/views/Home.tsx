import React, { useEffect, useCallback, useState } from "react";
import {
  useUserContext,
  useVariablesContext,
} from "../contexts/VariablesContext"; // Asegúrate de ajustar la ruta correcta

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Publicacion } from "../components/Publicacion";
import ModalMap from "../containers/ModalMapContainer";

import { ErrorComp } from "../components/Error";
import { Carga } from "../components/Carga";
import useUser from "../hooks/useUser";

export default function Home({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const { publicaciones, setModalVisible, error, loading } =
    useVariablesContext();

  const { setCoordenadas } = useUserContext();

  const { getUsuarios } = useUser();

  const [refreshing, setRefreshing] = useState(false);

  //------------------------PROCESOS--------------------------
  const onRefresh = useCallback(() => {
    //console.log("hola");
    setRefreshing(true);
    getUsuarios();
    setRefreshing(false);
  }, []);
  useEffect(
    () =>
      navigation.addListener("focus", () => {
        console.log(
          "=========================================================================================="
        );
        getUsuarios();
      }),
    []
  );
  if (error) return <ErrorComp title={"Tuvimos un problema :c"} />;
  else if (loading) return <Carga />;
  return (
    <View style={styles.body}>
      <View style={styles.contenedorPrincipal}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {publicaciones.map((publicacion: any, index: number) => (
              <Publicacion
                key={index}
                IDAvatar={publicacion.id_avatar}
                userName={publicacion.email}
                address={publicacion.direccion}
                imagePost={publicacion.url_image}
                coords={publicacion.coordenadas}
                tiempoTranscurrido={publicacion.tiempoTranscurrido}
                setCoordenadas={setCoordenadas}
                setModalVisible={setModalVisible}
              />
            ))}
          </ScrollView>
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
      <ModalMap />
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
