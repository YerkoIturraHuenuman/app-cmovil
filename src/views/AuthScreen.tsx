import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { Auth } from "../containers/AuthContainer";

export default function AuthScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Auth navigation={navigation} />
    </View>
  );
}
//<LoginComponent />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
