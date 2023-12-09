import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CamaraScreen from "../views/CamaraScreen";
import PrePost from "../views/PrePost";
import Home from "../views/Home";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  function LogoTitle() {
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
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="CamaraScreen" component={CamaraScreen} />
      <Drawer.Screen name="PrePost" component={PrePost} />
    </Drawer.Navigator>
  );
}
