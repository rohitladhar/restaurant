import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Color from "../constants/Color";
import DummyData from "../data/DummyData";
import TwoItemList from "../component/TwoItemList";
import { useNavigation } from "@react-navigation/native";

const CustomButton = (props) => {
  const { title } = props;
  const initialData = DummyData.filter((item) => {
    return item.category === title;
  });
  const [data, setData] = useState(initialData);
  const navigation = useNavigation();
  function filterList(title) {
    const newData = DummyData.filter((item) => {
      return item.category === title;
    });
    setData(newData);
    navigation.navigate("ItemList", { data });
  }
  return (
    <TouchableOpacity
      style={styles.buttonSubContainer}
      onPress={() => filterList(title)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <CustomButton title="Burger" />
        <CustomButton title="Pizza" />
        <CustomButton title="Sandwich" />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={DummyData}
        renderItem={({ item }) => <TwoItemList foodItem={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  buttonSubContainer: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: Color.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
