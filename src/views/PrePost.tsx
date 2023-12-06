import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import * as Location from "expo-location";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { useRoute } from "@react-navigation/native";
export default function PrePost({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const [location, setLocation] = useState<any>(null);
  const [address, setAdress] = useState<any>(null);
  //------------------------FUNCIONES PRINCIPALES--------------------------
  useEffect(
    () =>
      navigation.addListener(
        "focus",
        () => {
          console.log("home");
        },
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            return;
          }
          let location: any = await Location.getCurrentPositionAsync({});
          let address = await Location.reverseGeocodeAsync(location.coords);
          setAdress(
            `${address[0].street} ${address[0].streetNumber}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
          );
          setLocation(location);
          //funcionSaveCoords(address[0], id_user) AQUI FUNCION PARA GUARDAR LAS COORDENADAS DEL USUARIO EN FIREBASE
          console.log("address", address);
        })()
      ),
    [, navigation]
  );
  //------------------------PROCESOS--------------------------
  const route = useRoute();
  const image = (route.params as { uri?: string })?.uri;
  return (
    <View style={styles.contenedorPrincipal}>
      <Image source={{ uri: image }} style={styles.fotoTomada} />
      <View style={styles.footerPublicacion}>
        <View style={{}}>
          <FontAwesomeIcon icon={faLocationDot} size={20} color="#5bee00" />
        </View>
        <Text style={styles.textUbicacion}>{address}</Text>
      </View>
      <View style={styles.contenedorBotones}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.botonCancelar}
        >
          <Text
            style={{
              color: "#5bee00",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Cancelar
          </Text>
        </Pressable>
        <TouchableOpacity style={styles.botonSubir}>
          <Text
            style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
          >
            Subir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contenedorPrincipal: {
    paddingTop: 120,
    paddingBottom: 78,
    backgroundColor: "#fff",
    flex: 1,
  },
  fotoTomada: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  footerPublicacion: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textUbicacion: {
    marginHorizontal: 10,
    flex: 1,
  },
  contenedorBotones: {
    paddingHorizontal: 10,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginBottom: 10,
  },
  botonSubir: {
    flex: 1,
    backgroundColor: "#5bee00",
    width: 110,
    paddingVertical: 15,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,

    borderColor: "#5bee00",
    borderWidth: 2,
  },
  botonCancelar: {
    flex: 1,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    backgroundColor: "transparent",
    width: 110,
    paddingVertical: 15,
    borderColor: "#5bee00",
    borderWidth: 2,
  },
});
