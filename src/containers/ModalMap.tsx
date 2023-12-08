import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";

export default function ModalMap({
  modalVisible,
  setModalVisible,
  coords,
}: any) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          ></Pressable>
          <MapView
            region={
              coords
                ? {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }
                : undefined
            }
            style={styles.map}
          >
            {coords && (
              <Marker
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
              >
                <Callout tooltip style={{}}>
                  <View style={{ maxWidth: 300 }}>
                    <View style={styles.popperMarca}>
                      <Text>asdasd</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            )}
          </MapView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
