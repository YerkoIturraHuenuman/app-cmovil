import { Root, Root2, Producto } from "../interfaces/products.interface";
import { Button, Image, Text, View, ScrollView } from "react-native";

export function Productos(props: Producto) {
  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Lista de Productos
          </Text>
        </View>
        {props.data.map((producto: Root2, index: number) => (
          <View
            key={index}
            style={{
              borderWidth: 2,
              borderColor: "#e8e8e8",
              marginVertical: 10,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {producto.title}
            </Text>
            <Text style={{ color: "#389602" }}>{producto.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
