import React from "react";
import { Image, View, StyleSheet, Pressable, Touchable } from "react-native";
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import CamaraScreen from "../views/CamaraScreen";
import PrePost from "../views/PrePost";
import Home from "../views/Home";
import AuthScreen from "../views/AuthScreen";
import Pruebas from "../views/Pruebas";

import RegistroAvatar from "../views/RegistroAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlipInEasyX } from "react-native-reanimated";
import { Auth } from "../containers/AuthContainer";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";

export function LogoTitle() {
  return (
    <Image
      style={{
        width: 150,
        height: 40,
        objectFit: "contain",
      }}
      source={require("../../assets/bass/Bass.png")}
    />
  );
}

export default function StackNavigator(props: any) {
  const navigation = useNavigation();

  const handleSignOut = () =>{
    console.log(auth)
    signOut(auth).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth"}],
      });
      console.log(auth)
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="RegistroAvatar"
          component={RegistroAvatar}
          options={{
            headerTitle: "",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ebebeb",
                  height: 90,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "column",
                }}
              >
                <Pressable style={{ flex: 1, justifyContent: "flex-start", paddingLeft: 10, paddingTop: 10}} onPress={handleSignOut}>
                  <FontAwesomeIcon icon={faSignOut} size={25} color="#5bee00" transform={{flipX: true}}/>
                </Pressable>
                <View style={{ alignItems: 'center',marginBottom: 10}}>
                  <LogoTitle />
                </View>
              </View>
            ),
            gestureEnabled: false, // Deshabilita los gestos
            headerLeft: () => null, // Oculta el botón de volver atrás
          }}
        />
        <Stack.Screen
          name="CamaraScreen"
          component={CamaraScreen}
          options={{
            headerTitle: "",
            headerTintColor: "#fff",
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="PrePost"
          component={PrePost}
          options={{
            header: () => (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  top: 30,
                }}
              >
                <LogoTitle />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  contenedorPrincipal: {
    paddingTop: 40,
    paddingBottom: 78,
    paddingHorizontal: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  borderBottom: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  w100: {
    width: "100%",
  },
});
