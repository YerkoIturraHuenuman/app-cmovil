import React, { useEffect, useCallback, useState } from "react";
import { useUserContext, useVariablesContext } from "../contexts/VariablesContext"; // Asegúrate de ajustar la ruta correcta

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { format, utcToZonedTime } from "date-fns-tz";

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
  const {
    publicaciones,
    setPublicaciones,
    modalVisible, 
    setModalVisible, 
    error,
    setError,
    loading,
    setLoading
  } = useVariablesContext();

  const {
    coordenadas, 
    setCoordenadas
  } = useUserContext();

  const [refreshing, setRefreshing] = useState(false);

  //------------------------FUNCIONES PRINCIPALES--------------------------
  const getUsuarios = async () => {
    setLoading(true);
    try {
      const res = (await readUserData()) as Usuario;
      if (res) {
        const usuariosConPublicaciones = Object.values(res).filter(
          (usuario: Usuario) => {
            return usuario.publicaciones;
          }
        );
        //console.log("usuariosConPublicaciones: ", usuariosConPublicaciones);
        let resultado: PublicacionFinal[] = [];
        usuariosConPublicaciones.forEach((usuario: any) => {
          Object.values(usuario.publicaciones).forEach((publicacion: any) => {
            //console.log("publicaciones: ", publicacion);
            resultado.push({
              id_avatar: usuario.id_avatar,
              email: usuario.email,
              direccion: publicacion.direccion,
              coordenadas: publicacion.coordenada,
              url_image: publicacion.url_img,
              tiempoTranscurrido: tiempoTranscurrido(
                new Date(publicacion.fechaPublicacion)
              ),
            });
          });
        });
        //console.log("resultado: ", resultado);
        setPublicaciones(resultado);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(false);
    }
  };

  //------------------------PROCESOS--------------------------
  const onRefresh = useCallback(() => {
    console.log("hola");
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
      <ModalMap
        coords={coordenadas}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
function tiempoTranscurrido(fechaPasada: Date): string {
  const fechaActual = new Date();
  const fechaActualChilena = utcToZonedTime(fechaActual, "America/Santiago");

  const diferenciaMillis = fechaActualChilena.getTime() - fechaPasada.getTime();
  const segundosTranscurridos = Math.floor(diferenciaMillis / 1000);
  const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
  const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
  const diasTranscurridos = Math.floor(horasTranscurridas / 24);
  const mesesTranscurridos = Math.floor(diasTranscurridos / 30);
  const añosTranscurridos = Math.floor(mesesTranscurridos / 12);
  console.log("viendo los fechaPasada: ", fechaPasada);

  console.log("viendo los fechaPasada.getTime(): ", fechaPasada.getTime());

  console.log(
    "viendo los fechaActualChilena.getTime(): ",
    fechaActualChilena.getTime()
  );

  console.log("viendo los diferenciaMillis: ", diferenciaMillis);
  console.log("viendo los segundosTranscurridos: ", segundosTranscurridos);
  if (segundosTranscurridos < 60) {
    return "Hace un momento";
  } else if (minutosTranscurridos === 1) {
    return "Hace 1 minuto";
  } else if (minutosTranscurridos < 60) {
    return `Hace ${minutosTranscurridos} minutos`;
  } else if (horasTranscurridas === 1) {
    return "Hace 1 hora";
  } else if (horasTranscurridas < 24) {
    return `Hace ${horasTranscurridas} horas`;
  } else if (diasTranscurridos === 1) {
    return "Hace 1 día";
  } else if (diasTranscurridos < 30) {
    return `Hace ${diasTranscurridos} días`;
  } else if (mesesTranscurridos === 1) {
    return "Hace 1 mes";
  } else if (mesesTranscurridos < 12) {
    return `Hace ${mesesTranscurridos} meses`;
  } else if (añosTranscurridos === 1) {
    return "Hace 1 año";
  } else {
    return `Hace ${añosTranscurridos} años`;
  }
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
