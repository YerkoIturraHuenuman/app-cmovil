import React, { useEffect, createContext, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { useVariablesContext } from "../contexts/VariablesContext";
import { WriteDataComponent } from "../components/databaseComponents/WriteDataComponent";
import { LinearGradient } from "expo-linear-gradient";

//--------------------------------------------------------------------------------------

export default function RegistroAvatar({ navigation }: any) {
  //------------------------SET GENERALES--------------------------
  const { keyUser } = useVariablesContext();
  const [selectionAvatar, setSelectionAvatar] = useState(0);
  //------------------------FUNCIONES PRINCIPALES--------------------------
  console.log("key en avatar: ", keyUser);

  const registrarAvatar = async () => {
    try {
      await WriteDataComponent(
        { userID: keyUser, id_avatar: selectionAvatar, registroCompleto: true },
        3
      );
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {}
  };
  //------------------------PROCESOS--------------------------

  return (
    <View style={styles.body}>
      <ImageBackground
        source={require("../../assets/bass/fondoRegistroAvatar.jpg")}
        style={{ flex: 1 }}
      >
        <View style={styles.contenedorPrincipal}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#ffffff" }}>
            Selecciona tu avatar
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "auto",
              maxWidth: 390,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectionAvatar(1)}
              style={
                selectionAvatar == 1
                  ? styles.borderSelection
                  : styles.borderDisabled
              }
            >
              <Image
                source={require("../../assets/bass/avatar1.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectionAvatar(2)}
              style={
                selectionAvatar == 2
                  ? styles.borderSelection
                  : styles.borderDisabled
              }
            >
              <Image
                source={require("../../assets/bass/avatar2.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectionAvatar(3)}
              style={
                selectionAvatar == 3
                  ? styles.borderSelection
                  : styles.borderDisabled
              }
            >
              <Image
                source={require("../../assets/bass/avatar3.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectionAvatar(4)}
              style={
                selectionAvatar == 4
                  ? styles.borderSelection
                  : styles.borderDisabled
              }
            >
              <Image
                source={require("../../assets/bass/avatar4.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectionAvatar(5)}
              style={
                selectionAvatar == 5
                  ? styles.borderSelection
                  : styles.borderDisabled
              }
            >
              <Image
                source={require("../../assets/bass/avatar5.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectionAvatar(6)}
              style={
                selectionAvatar == 6
                  ? styles.borderSelection
                  : styles.borderDisabled
              }
            >
              <Image
                source={require("../../assets/bass/avatar6.jpg")}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={registrarAvatar}
            style={{
              borderWidth: 3,
              padding: 10,
              borderColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Finalizar
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  contenedorPrincipal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 85,
    width: 85,
    borderRadius: 200,
    //marginHorizontal: 8,
  },
  borderSelection: {
    padding: 5,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: "#01d112ff",
  },
  borderDisabled: {
    padding: 5,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: "#e0e0e000",
  },
});
