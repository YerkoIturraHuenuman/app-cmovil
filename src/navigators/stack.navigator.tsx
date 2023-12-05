import React from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import CamaraScreen from "../containers/CamaraScreen";
import PrePost from "../views/PrePost";
import Home from "../views/Home";
import AuthScreen from "../screens/AuthScreen";

export function LogoTitle() {
  return (
    <Image
      style={{
        width: 150,
        height: 50,
        objectFit: "contain",
      }}
      source={require("../../assets/bass/Bass.png")}
    />
  );
}

export default function StackNavigator() {
  const navigation = useNavigation();

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
        name="Home"
        component={Home}
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
