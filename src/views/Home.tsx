import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus, faLocationDot } from "@fortawesome/free-solid-svg-icons";

//--------------------------------------------------------------------------------------

export default function Home({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const [modalVisible, setModalVisible] = useState(false);
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
        })()
      ),
    [, navigation]
  );
  //------------------------PROCESOS--------------------------
  const handleCamara = () => {
    navigation.navigate("CamaraScreen");
  };
  console.log(address);
  return (
    <View style={styles.body}>
      <View style={styles.contenedorPrincipal}>
        <View style={styles.headerPublicacion}>
          <Image
            source={require("../../assets/bass/fotoPerfil1.jpg")}
            style={styles.fotoPerfil}
          />
          <Text style={styles.nombreUserPublicacion}>Maria Gonazales</Text>
        </View>
        <Image
          source={require("../../assets/bass/fotoPublicacion.jpg")}
          style={styles.fotoPublicacion}
        />
        <View style={styles.footerPublicacion}>
          <View style={{}}>
            <FontAwesomeIcon icon={faLocationDot} size={20} color="#5bee00" />
          </View>
          <Text style={styles.textUbicacion}>
            C. Dr. Sotero del Rio 1241-1201, La Florida, Región Metropolitana
          </Text>
          <TouchableOpacity
            style={styles.botonMapa}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Mapa</Text>
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
      <View style={styles.contenedorBotonesPrincipales}>
        <TouchableOpacity onPress={handleCamara} style={styles.botonMas}>
          <FontAwesomeIcon icon={faCirclePlus} size={60} color="#5bee00" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            ></Pressable>
            <MapView
              region={
                location && location.coords
                  ? {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }
                  : undefined
              }
              style={styles.map}
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                >
                  <Callout tooltip style={{}}>
                    <View style={{ maxWidth: 300 }}>
                      <View style={styles.popperMarca}>
                        <Text>{address}</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              )}
            </MapView>
          </View>
        </View>
      </Modal>
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
