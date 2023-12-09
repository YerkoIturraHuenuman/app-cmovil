import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as Location from "expo-location";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faBolt, faRotate } from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect } from "@react-navigation/native";
export default function CamaraScreen({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  let camaraRef = useRef<any>(null);
  const [image, setImage] = useState(null);
  const [address, setAdress] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [loading, setLoading] = useState(true);
  //------------------------FUNCIONES PRINCIPALES--------------------------

  //------------------------PROCESOS--------------------------
  const tomarFoto = async () => {
    if (camaraRef && camaraRef.current) {
      try {
        const data = await camaraRef.current.takePictureAsync();
        navigation.pop();
        navigation.navigate("PrePost", {
          uri: data.uri,
          address: address,
          coords: location,
        });
      } catch (error) {}
    }
  };
  const tomandoLocalizacion = async () => {
    console.log("Tomando localizacion...");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("!granted");
      return;
    }
    let coordenadas: any;
    let address: any;
    try {
      coordenadas = await Location.getCurrentPositionAsync({});
      address = await Location.reverseGeocodeAsync(coordenadas.coords);
      setAdress(
        `${address[0].street} ${address[0].streetNumber}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
      );
      setLocation(coordenadas.coords);
      console.log("Localizacion completa");
    } catch (error) {
      console.error(error);
    }
  };
  const recargaCam = () => {
    if (camaraRef.current !== null) {
      console.log("Camara: ", camaraRef);
      camaraRef.current.resumePreview();
      console.log("Recamara completa");
    }
  };
  useEffect(() => {
    tomandoLocalizacion();
    recargaCam();
    setLoading(false);
  }, []);

  if (!permission?.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          paddingHorizontal: 30,
          backgroundColor: "#000",
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 10, color: "#fff" }}>
          Se necesitan permisos para acceder a la camara
        </Text>
        <Button onPress={requestPermission} title="Dar Permisos" />
      </View>
    );
  }
  //console.log("viendo:", navigation);
  else if (!loading) {
    //console.log("return");

    return (
      <View style={styles.contenedorPrincipal}>
        <Camera
          style={styles.camara}
          type={type}
          flashMode={flash}
          ref={camaraRef}
          ratio="16:9"
        ></Camera>
        <View style={styles.footerBotonesCamara}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faBolt} size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={tomarFoto}
            style={{ marginHorizontal: 60 }}
          >
            <FontAwesomeIcon icon={faCircle} size={70} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faRotate} size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (loading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "transparent",
  },
  footerBotonesCamara: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    grow: 10,
    marginBottom: 50,
    zIndex: 9999,
    alignItems: "center",
  },
  camara: {
    flex: 1,
    borderWidth: 2,
  },
});
