import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Color from "../constants/Color";
const OrderList = (props) => {
  const { item } = props;
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("OrderDetail", { itemList: item })}
      >
        <View style={styles.subContainer}>
          <Image
            source={require("../assets/hamburger.jpg")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View style={styles.subContainerRight}>
          <Text style={styles.name}>{item.date}</Text>
          <Text style={styles.price}>{item.name}</Text>
          <Text style={styles.prepare}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
  },
  subContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    color: Color.green,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subContainerRight: {
    justifyContent: "center",
    paddingLeft: 10,
    width: "70%",
  },
  prepare: {
    fontSize: 14,
    fontWeight: "bold",
    color: Color.blue,
  },
});
