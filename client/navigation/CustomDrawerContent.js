import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Color from "../constants/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as RootNavigation from "../navigation/RootNavigation";
import { useSelector } from "react-redux";

export default function CustomDrawerContent(props) {
  const { loggedIn } = useSelector((state) => state);
  //const loggedIn = true;
  const windowHeight = useWindowDimensions().height;
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) =>
      item.name !== "Login" &&
      item.name !== "Logout" &&
      item.name !== "OrderDetail"
  );

  return (
    <View style={styles.androidSafeArea}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            height: windowHeight * 0.3,
            backgroundColor: Color.yellow,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="account-tie"
            size={150}
            color={Color.darkYellow}
          />
          <View>
            <Text style={{ fontSize: 20, color: Color.darkYellow }}>
              Ladhar Restaurant
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white", height: windowHeight * 0.5 }}>
          <DrawerItemList state={newState} {...rest} />
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: windowHeight * 0.2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              loggedIn === false
                ? RootNavigation.navigate("Login")
                : RootNavigation.navigate("Logout");
            }}
          >
            <Text
              style={{ fontSize: 17, fontWeight: "bold", color: "#e1ad01" }}
            >
              {loggedIn ? "SignOut" : "SignIn..."}
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  leftHeader: {
    flexDirection: "row",
    width: "50%",
  },
  buttonContainer: {
    width: "90%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.yellow,
    borderRadius: 20,
  },
  restaurantContainer: {
    justifyContent: "center",
  },
  restaurant: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  cart: {
    marginRight: 5,
  },
  basket: {
    marginLeft: 1,
  },
  basketText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  myContent: {
    flex: 1,
    paddingLeft: 0,
    paddingTop: 10,
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: Color.yellow,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
