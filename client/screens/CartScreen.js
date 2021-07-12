import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { decrement, increment } from "../actions/cartAction";
import { useDispatch } from "react-redux";
import Color from "../constants/Color";
import moment from "moment";

const CartScreen = (props) => {
  const navigation = useNavigation();
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingSymbol, setShippingSymbol] = useState(false);
  const { basket, loggedIn } = useSelector((state) => state);
  const subCart = [...new Set(basket)];
  const cart = subCart.filter((item) => item.qty > 0);
  const checkout = () => {
    if (loggedIn === true) {
      const date = moment().format("Do MMMM YYYY");
      navigation.navigate("Details", {
        date: date,
        cartItem: cart,
        shippingPrice: shipping,
        subtotalPrice: subTotal,
        totalPrice: total,
      });
    } else {
      navigation.navigate("Login");
    }
  };

  const subTotalValue = cart.reduce((sum, item) => sum + item.price, 0);
  const dispatch = useDispatch();
  function incrementItem(id, name, price, image) {
    dispatch(increment(id, name, price, image));
  }
  function decrementItem(id, name, price, image) {
    dispatch(decrement(id, name, price, image));
  }

  useEffect(() => {
    setSubTotal(subTotalValue);
    if (subTotal !== 0) {
      if (subTotal > 200 && subTotal < 500) {
        const abc = subTotal * 0.1;
        setShipping(abc);
        const totalValue = abc + subTotal;
        setTotal(totalValue);
      }
      if (subTotal >= 500) {
        setShipping("Free");
        setShippingSymbol(true);
        setTotal(subTotal);
      }
      if (subTotal < 300) {
        const shippingPrice = 30;

        setShipping(shippingPrice);
        const totalValue = shippingPrice + subTotal;
        setTotal(totalValue);
      }
    }
    if (subTotal === 0) {
      setShipping(0);
      setShippingSymbol(false);
      setTotal(0);
    }
  }, [cart]);

  return (
    <ScrollView>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Cart Is Empty</Text>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.homeText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: "99%" }}>
          {cart.map((item) => {
            return (
              <View key={item.id} style={styles.cart}>
                <View style={styles.cartContainer}>
                  <Image
                    source={item.image}
                    style={{ width: 100, height: 100 }}
                  />
                  <View style={styles.title}>
                    <Text style={styles.titleName}>{item.name}</Text>
                  </View>
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        decrementItem(
                          item.id,
                          item.name,
                          item.price,
                          item.image
                        )
                      }
                    >
                      <MaterialCommunityIcons
                        name="minus"
                        color="black"
                        size={20}
                      />
                    </TouchableOpacity>
                    <View style={styles.qty}>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        incrementItem(
                          item.id,
                          item.name,
                          item.price,
                          item.image
                        )
                      }
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        color="black"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.price}>
                    <Text>Price</Text>
                    <Text style={styles.priceText}>₹ {item.price}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={styles.totalContainer}>
            <View>
              <Text style={styles.totalText}>SubTotal</Text>
              <Text style={styles.totalText}>Delivery Charges</Text>
              <Text style={styles.totalText}>Total Price</Text>
            </View>
            <View>
              <Text style={styles.totalText}>₹ {subTotal}</Text>
              <Text style={styles.shippingText}>
                {shippingSymbol === true ? "" : "₹ "}
                {shipping}
              </Text>
              <Text style={styles.totalInput}>₹ {total}</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 25,
            }}
          >
            <TouchableOpacity style={styles.buttonContainer} onPress={checkout}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#e1ad01" }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  emptyCart: {
    paddingTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 21,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#e1ad01",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "90%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.yellow,
    borderRadius: 20,
  },
  homeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cart: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cartContainer: {
    height: 100,
    width: "95%",
    flexDirection: "row",
  },
  title: {
    marginTop: "10%",
    paddingLeft: "2%",
    width: "30%",
  },
  titleName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  qtyContainer: {
    flexDirection: "row",
    width: "25%",
    marginTop: "10%",
  },
  qty: {
    width: "35%",
    height: "35%",
    borderColor: "black",
    borderWidth: 1,
  },
  qtyText: {
    textAlign: "center",
    fontSize: 14,
  },
  price: {
    right: 0,
    position: "absolute",
    marginTop: "5%",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
  },
  totalText: {
    fontSize: 16,
    color: "black",
  },
  totalInput: {
    fontSize: 16,
    color: "green",
  },
  shippingText: {
    fontSize: 16,
    color: "red",
  },
});
