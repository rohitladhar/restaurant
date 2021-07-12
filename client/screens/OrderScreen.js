import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Color from "../constants/Color";
import axios from "axios";
import axiosExtra from "../constants/axiosExtra";
import OrderList from "../component/OrderList";
function LogoTitle() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.logoContainer}
      onPress={() => navigation.navigate("Home")}
    >
      <View style={styles.leftLogo}>
        <FontAwesome5 name="hamburger" size={60} color={Color.darkYellow} />
      </View>
      <View style={styles.rightLogo}>
        <Text style={styles.restaurant}>Ladhar</Text>
        <Text style={styles.restaurant}>Restaurant</Text>
      </View>
    </TouchableOpacity>
  );
}

function Cart() {
  const navigation = useNavigation();
  const { basket } = useSelector((state) => state);
  const [cartItems, setCartItems] = React.useState();
  React.useEffect(() => {
    const subCart = [...new Set(basket)];
    const cart = subCart.filter((item) => item.qty > 0);
    const cartNumber = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartItems(cartNumber);
  }, [basket]);
  return (
    <TouchableOpacity
      style={styles.cart}
      onPress={() => navigation.navigate("Cart")}
    >
      <View style={styles.basket}>
        <Text style={styles.basketText}>{cartItems}</Text>
      </View>
      <MaterialCommunityIcons
        name="cart-outline"
        size={40}
        color={Color.darkYellow}
      />
    </TouchableOpacity>
  );
}

const OrderScreen = () => {
  const { userEmail } = useSelector((state) => state);
  //const userEmail = "rohit.ladhar@gmail.com";
  const { baseUrl } = axiosExtra;
  const [list, setList] = React.useState([]);
  const [errors, setErrors] = React.useState();

  const onSuccess = ({ data }) => {
    setList(data.results);
  };
  const onFailure = (error) => {
    if (error.message === "Network Error") {
      setError("Server Down For Maintenance");
    } else {
      setErrors("No Order Placed Yet");
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: baseUrl + `orderlist/${userEmail}`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(onSuccess)
      .catch(onFailure);
    return () => {
      setList({});
    };
  }, []);
  return (
    <View style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 120,
          backgroundColor: "#FFFF66",
        }}
      >
        <View style={{ width: "50%" }}>
          <LogoTitle />
        </View>
        <View style={{ width: "50%" }}>
          <Cart />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {errors ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
              data={list}
              renderItem={({ item }) => <OrderList item={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    paddingTop: 45,
    paddingLeft: "10%",
  },
  rightLogo: {
    justifyContent: "center",
  },
  cart: {
    paddingTop: 40,
    alignSelf: "flex-end",
    paddingRight: "5%",
    paddingBottom: "5%",
  },
  restaurant: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  basketText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70%",
  },
  errorText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
