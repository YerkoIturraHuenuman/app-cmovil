import { useEffect, useState } from "react";
import {
  Button,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import * as Location from "expo-location";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const Publicacion = ({
  setModalVisible,
  userName,
  address,
  coords,
  setCoordenadas,
  imagePost,
}: any) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.headerPublicacion}>
        <Image
          source={require("../../assets/bass/fotoPerfil1.jpg")}
          style={styles.fotoPerfil}
        />
        <Text style={styles.nombreUserPublicacion}>{userName}</Text>
      </View>
      <Image source={{ uri: imagePost }} style={styles.fotoPublicacion} />
      <View style={styles.footerPublicacion}>
        <View style={{}}>
          <FontAwesomeIcon icon={faLocationDot} size={20} color="#5bee00" />
        </View>
        <Text style={styles.textUbicacion}>{address}</Text>
        <TouchableOpacity
          style={styles.botonMapa}
          onPress={() => {
            setCoordenadas(coords);
            setModalVisible(true);
          }}
        >
          <Text style={{ color: "#5bee00", fontWeight: "bold" }}>Mapa</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          color: "#777777",
          fontSize: 12,
        }}
      >
        Hace 2 horas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    opacity: 1,
    objectFit: "cover",
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
    //backgroundColor: "#5bee00",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 7,
    borderColor: "#5bee00",
    borderWidth: 2,
  },
});
