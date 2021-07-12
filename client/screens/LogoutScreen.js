import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../actions/cartAction";

const LogoutScreen = ({ navigation }) => {
  const signout = () => {
    const dispatch = useDispatch();
    dispatch(logout());
    navigation.navigate("Home");
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={signout()}>
        <Text>Yes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    paddingTop: "5%",
    backgroundColor: "#f5f5f5",
  },
});
