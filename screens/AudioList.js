import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AudioList() {
  return (
    <View style={styles.contanier}>
      <Text>Player</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
