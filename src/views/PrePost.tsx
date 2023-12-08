import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { WriteDataComponent } from "../components/databaseComponents/WriteDataComponent";
import { writeData } from "../firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "@react-navigation/native";
import { InterDataImg, InterUsuario } from "../interfaces/products.interface";
import { useVariablesContext } from "../contexts/VariablesContext";

export default function PrePost({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const route = useRoute();
  const image = (route.params as { uri?: string })?.uri || "";
  const address = (route.params as { address?: string })?.address || "";
  const coords = (route.params as { coords?: string })?.coords || "";

  const { keyUser } = useVariablesContext();
  //const [location, setLocation] = useState<any>(null);
  //const [address, setAdress] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  //------------------------FUNCIONES PRINCIPALES--------------------------
  const handleGuardarEnBaseDeDatos = async () => {
    /*try {
      const clave = generarClave();
      //const base64Image = (await convertirURIABase64(image)) as string;
      const object2: InterDataImg = {
        userID: keyUser,
        PublicacionID: clave,
        img: image,
      };
      const res_url = await writeData(object2);
      console.log("res_url: ", res_url);
      const object: InterUsuario = {
        userID: keyUser,
        userEmail: null,
        PublicacionID: clave,
        direccion: address,
        coordenadasPublicacion: coords,
        url_img: res_url,
      };
      const res = await WriteDataComponent(object, 2);
    } catch (error) {
      console.error("Error al guardar en la base de datos:", error);
    }*/
  };
  //------------------------PROCESOS--------------------------
  useEffect(() => {
    //setLoading(true);
  }, []);
  console.log("variables pasadas: ", coords);
  const convertirURIABase64 = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          if (reader.result) {
            resolve(reader.result.toString());
          }
        };
        reader.readAsDataURL(blob);
      });
      return base64;
    } catch (error) {
      console.error("Error al convertir la imagen a base64:", error);
      throw error;
    }
  };
  const generarClave = () => {
    let caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let clave = "";
    for (let i = 0; i < 10; i++) {
      clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return clave;
  };
  if (loading)
    return (
      <View style={{ flex: 1 }}>
        <Text>Cargando...</Text>
      </View>
    );
  else if (!loading) {
    console.log("cargado");
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
          <TouchableOpacity
            onPress={handleGuardarEnBaseDeDatos}
            style={styles.botonSubir}
          >
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
