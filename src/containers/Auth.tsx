import React, { useEffect, useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Animated,
} from "react-native";
import { logIn, signIn } from "../firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);
  const animation = useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = useState(false);

  const handlerRegister = async () => {
    setLoading(true);
    setError(undefined);
    setMensaje(undefined);

    const user = await signIn(email, password);
    if (user) {
      setLoading(false);
      setTitle("Inicio Sesión");
      setTitleBoton("Login");
      setMensaje("Usuario creado, inicia sesión");
      setToggle(!toggle);
      return true;
    } else {
      setError("Usuario ya está registrado!");
      setLoading(false);
      return false;
    }
  };
  const handlerLogin = async () => {
    setLoading(true);
    setError(undefined);
    setMensaje(undefined);

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
  const handlerLoginGoogle = () => {};
  useEffect(() => {
    if (email !== "" && password !== "") {
      setCorrectData(false);
    } else {
      setCorrectData(true);
    }
  }, [email, password]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: toggle ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [toggle]);

  const translateY = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={fondoImage}
        style={styles.fondoImage}
        resizeMode="cover"
      >
        <Animated.View
          style={[
            styles.contenedorForm,
            { opacity },
            { transform: [{ translateY }] },
          ]}
        >
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
          {mensaje ? (
            <Text style={{ width: "100%", marginBottom: 20 }}>{mensaje}</Text>
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
          <TouchableOpacity
            onPress={handlerLoginGoogle}
            style={{
              borderWidth: 2,
              borderColor: "#00c503",
              borderRadius: 50,
              marginTop: 40,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faGoogle}
              style={{ marginRight: 10 }}
              color="#00c503"
            />
            <Text style={{ color: "#00c503", fontWeight: "400", fontSize: 16 }}>
              Inicia Sesión con Google
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {titleBoton === "Login" ? <Text>No tienes cuenta?, </Text> : null}
            <TouchableOpacity
              onPress={() => {
                if (titleBoton === "Login") {
                  setTitle("Registro");
                  setTitleBoton("Enviar");
                } else if (titleBoton === "Enviar") {
                  setTitle("Inicio Sesión");
                  setTitleBoton("Login");
                }
                setError(undefined);
                setToggle(!toggle);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#04d408" }}>
                {titleBoton === "Login" ? "Registrate Aquí" : "Inicia Sesión"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingBottom: 25,
    paddingTop: 40,
    marginTop: 150,
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
