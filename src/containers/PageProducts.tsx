import { useEffect, useState } from "react";
import { Button, TouchableOpacity, Text, View, StyleSheet } from "react-native";

import { getProducts } from "../services/products.service";
import { Root, Root2 } from "../interfaces/products.interface";
import { Productos } from "../components/Productos";
import { Carga } from "../components/Carga";
import { ErrorComp } from "../components/Error";

export default function PageProductos() {
  //------------------------SET GENERALES--------------------------
  const [order, setOrder] = useState("desc");
  const [carga, setCarga] = useState(true);
  const [error, setError] = useState(false);
  //------------------------FUNCIONES PRINCIPALES--------------------------
  const [datos, setDatos] = useState<Root>([]);
  const getDatos = async () => {
    setCarga(true);

    try {
      const res = await getProducts();
      let productos = res.data;
      if (order === "desc")
        productos.sort((a: Root2, b: Root2) => a.price - b.price);
      else if (order === "asc")
        productos.sort((a: Root2, b: Root2) => b.price - a.price);
      setDatos(productos);
    } catch (error) {
      setError(true);
    } finally {
      setCarga(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, [, order]);
  return (
    <View style={styles.contenedorPrincipal}>
      <TouchableOpacity
        style={{
          padding: 20,
          marginBottom: 20,
          backgroundColor: "#7d1ad9",
          borderRadius: 4,
        }}
        onPress={() => {
          setOrder(order === "asc" ? "desc" : "asc");
        }}
      >
        <Text style={{ color: "#ffff", textAlign: "center" }}>
          Cambiar Orden
        </Text>
      </TouchableOpacity>
      {!carga ? <Productos data={datos}></Productos> : null}
      {carga ? <Carga></Carga> : null}
    </View>
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
});
