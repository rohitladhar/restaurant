import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Color from "../constants/Color";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../actions/cartAction";
import axiosExtra from "../constants/axiosExtra";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PaymentScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userEmail } = useSelector((state) => state);
  const { date, shippingPrice, cartItem, subtotalPrice, totalPrice, form } =
    route.params;
  const { baseUrl } = axiosExtra;
  const { address, phone, fname } = form;
  const [cashRadio, setCashRadio] = useState(false);
  const [cardRadio, setCardRadio] = useState(false);
  const onSuccessInitial = () => {
    dispatch(emptyCart());
    navigation.navigate("Home");
  };

  const onSuccess = () => {
    Alert.alert("Order Information", "Order Placed", [
      { text: "OK", onPress: () => onSuccessInitial() },
    ]);
  };

  const payment = () => {
    if (cashRadio === true) {
      const modeOfPayment = "Cash Of Delivery";
      axios({
        method: "POST",
        url: baseUrl + "neworder",
        data: {
          email: userEmail,
          name: fname,
          phone: phone,
          address: address,
          date: date,
          itemsPrice: subtotalPrice,
          deliveryCharges: shippingPrice,
          totalPrice: totalPrice,
          modeOfPayment: modeOfPayment,
          cartItems: cartItem,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(onSuccess)
        .catch((err) => console.log(err));
    }
    if (cardRadio === true) {
      navigation.navigate("CardPayment", {
        date: date,
        cartItem: cartItem,
        shippingPrice: shippingPrice,
        subtotalPrice: subtotalPrice,
        totalPrice: totalPrice,
        form: form,
      });
    }
  };
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View
          style={{
            width: "90%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "#e1ad01" }}>
            Delivery Address
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressContainerLeft}>
            <Text style={{ fontSize: 17 }}>Order Date</Text>
            <Text style={{ fontSize: 17 }}>Address</Text>
          </View>
          <View style={styles.addressContainerRight}>
            <Text style={{ fontSize: 17 }}>{date}</Text>
            <View style={{ flex: 1, width: "80%" }}>
              <Text style={{ fontSize: 17, textAlign: "right" }}>
                {address}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 20, color: "#e1ad01" }}>Price Details</Text>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceContainerLeft}>
            <Text style={{ fontSize: 17 }}>Items Price</Text>
            <Text style={{ fontSize: 17 }}>Delivery Charges</Text>
            <Text style={{ fontSize: 17 }}>Grand Total</Text>
          </View>
          <View style={styles.priceContainerRight}>
            <View>
              <Text style={{ fontSize: 17, color: "green" }}>
                ₹ {subtotalPrice}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 17, color: "red" }}>
                {shippingPrice === "Free" ? " " : "₹ "}
                {shippingPrice}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 17, color: "blue" }}>
                ₹ {totalPrice}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 20, color: "#e1ad01" }}>
            Delivery Options
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setCashRadio(false);
            setCardRadio(true);
          }}
          style={styles.deliveryContainer}
        >
          {cardRadio === false ? (
            <View>
              <MaterialCommunityIcons
                name="circle-outline"
                size={25}
                color={"black"}
              />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons name="circle" size={25} color={"black"} />
            </View>
          )}
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 16 }}>Debit Card/Credit Card</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCardRadio(false);
            setCashRadio(true);
          }}
          style={styles.deliveryContainer}
        >
          {cashRadio === false ? (
            <View>
              <MaterialCommunityIcons
                name="circle-outline"
                size={25}
                color={"black"}
              />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons name="circle" size={25} color={"black"} />
            </View>
          )}

          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 15 }}>Cash On Delivery</Text>
          </View>
        </TouchableOpacity>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {cardRadio === false && cashRadio === false ? (
            <TouchableOpacity style={styles.buttonDisable}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonContainer} onPress={payment}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#e1ad01" }}
              >
                {cashRadio === true ? "Place Order" : "Proceed To Pay"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.shieldContainer}>
          <View style={{ justifyContent: "center" }}>
            <MaterialCommunityIcons
              name="shield-check"
              size={45}
              color={"#e1ad01"}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <View>
              <Text style={{ fontSize: 12 }}>
                Safe and Secure Payments. Easy returns
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>100% Authentic products</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  buttonContainer: {
    width: 300,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.yellow,
    borderRadius: 20,
  },
  addressContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
  },
  addressContainerLeft: {
    alignItems: "flex-start",
    width: "30%",
  },
  addressContainerRight: {
    alignItems: "flex-end",
    width: "70%",
  },
  priceContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
  },
  priceContainerLeft: {
    alignItems: "flex-start",
    width: "50%",
  },
  priceContainerRight: {
    alignItems: "flex-end",
    marginLeft: "5%",
    width: "50%",
  },
  deliveryContainer: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    paddingVertical: 5,
  },
  buttonDisable: {
    width: 300,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 20,
  },
  shieldContainer: {
    height: 70,
    flexDirection: "row",
  },
});
