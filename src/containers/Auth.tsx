import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { logIn } from "../firebase/auth";

import { LinearGradient } from "expo-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";

import { signIn } from "../firebase/auth";
import { faD } from "@fortawesome/free-solid-svg-icons";
const fondoImage = require("../../assets/bass/fondoInicio.jpg");
interface IError {
  code: string;
  message: string;
}

export const Auth = (props: any) => {
  const [title, setTitle] = useState("Inicio Sesión");
  const [titleBoton, setTitleBoton] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [correctData, setCorrectData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handlerRegister = async () => {
    setLoading(true);
    setError(undefined);
    const user = await signIn(email, password);
    if (user) {
      setLoading(false);

      return true;
    } else {
      // TODO: manejar el error
      setLoading(false);
      return false;
    }
  };
  const handlerLogin = async () => {
    setLoading(true);
    setError(undefined);
    const successRegister = await logIn(email, password);
    if (successRegister) {
      setLoading(false);
      props.navigation.navigate("Home");
      console.log("redirecciona");
    } else {
      setError("Usuario no registrado!");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (email !== "" && password !== "") {
      setCorrectData(false);
    } else {
      setCorrectData(true);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={fondoImage}
        style={styles.fondoImage}
        resizeMode="cover"
      >
        <View style={styles.contenedorForm}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 40,
              color: "#34c400bb",
            }}
          >
            {title}
          </Text>
          <TextInput
            placeholder="Ingrese Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Ingrese Password"
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            secureTextEntry
          />
          {error ? (
            <Text style={{ width: "100%", marginBottom: 20, color: "#cd0a0a" }}>
              {error}
            </Text>
          ) : null}
          <TouchableOpacity
            onPress={titleBoton === "Login" ? handlerLogin : handlerRegister}
          >
            <LinearGradient
              colors={["#00c503", "#0aef0e"]}
              start={{ x: 0.0, y: 0.0 }}
              style={styles.botonLogin}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                {loading ? "Validando..." : titleBoton}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 40,
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text>No tienes cuenta?, </Text>
            <TouchableOpacity
              onPress={() => {
                setTitle("Registro");
                setTitleBoton("Enviar");
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#04d408" }}>
                Registrate Aquí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contenedorForm: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingBottom: 25,
    paddingTop: 40,
    marginTop: 90,
    // Sombras para Android
    elevation: 10,
    // Sombras para iOS
    shadowColor: "#0000008e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  input: {
    height: 50,
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#04d408",
    marginBottom: 20,
  },
  fondoImage: {
    flex: 1,
    justifyContent: "center",
  },
  botonLogin: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
});
