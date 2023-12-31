import { Text, View } from "react-native";

export function ErrorComp({ title }: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text>{title}</Text>
    </View>
  );
}
