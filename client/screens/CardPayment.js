import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
//import axios from "axios";
import Color from "../constants/Color";
import { useDispatch, useSelector } from "react-redux";
import axiosExtra from "../constants/axiosExtra";
//import { emptyCart } from "../actions/cartAction";
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CardPaymentScreen = ({ route, navigation }) => {
  const { initPaymentSheet, createPaymentMethod } = useStripe();
  const [cardPaymentDetails, setCardPaymentDetails] = useState();
  const { confirmPayment } = useConfirmPayment();
  const [loading, setLoading] = useState(false);
  const [variablePayment, setVariablePayment] = useState("");
  const dispatch = useDispatch();
  const { userEmail } = useSelector((state) => state);
  const { date, shippingPrice, cartItem, subtotalPrice, totalPrice, form } =
    route.params;
  const { baseUrl } = axiosExtra;
  const { address, phone, fname } = form;

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(baseUrl + "createPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalPrice: totalPrice }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();
    setVariablePayment(paymentIntent);
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    try {
      // Create payment method
      const { paymentIntent, error } = await confirmPayment(variablePayment, {
        payment_method: {
          card: cardPaymentDetails,
          billingDetails: {
            email: "rohit.ladhar@gmail.com",
          },
        },
      });
      console.log(paymentIntent);
      console.log(error);
      //if (error) {
      //console.log(error.message);
      //} else {
      //console.log("Success from promise", paymentIntent);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setVariablePayment("");
    setCardPaymentDetails("");
    initializePaymentSheet();
  }, [variablePayment]);

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: Color.darkYellow, fontSize: 20 }}>
          Debit Card
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 220,
          marginBottom: 20,
          backgroundColor: "yellow",
          justifyContent: "center",
        }}
      >
        <View
          style={{ paddingBottom: 10, paddingLeft: 15, flexDirection: "row" }}
        >
          <View>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={40}
              color={Color.darkYellow}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 20,
                color: Color.darkYellow,
                fontWeight: "bold",
                paddingLeft: 15,
              }}
            >
              Debit Card/Credit Card
            </Text>
          </View>
        </View>
        <CardField
          postalCodeEnabled={false}
          style={{
            height: 50,
            width: "100%",
          }}
          onCardChange={(cardDetails) => {
            setCardPaymentDetails(cardDetails);
          }}
        />
        <View style={{ paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 15,
              color: Color.darkYellow,
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Customer Name - {fname}
          </Text>
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {loading === true ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={openPaymentSheet}
          >
            <Text
              style={{ fontSize: 17, fontWeight: "bold", color: "#e1ad01" }}
            >
              Pay Now
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.disableContainer}>
            <Text
              style={{ fontSize: 17, fontWeight: "bold", color: "#e1ad01" }}
            >
              Pay Now
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
  );
};

export default CardPaymentScreen;

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
  shieldContainer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
  },
  disableContainer: {
    width: 300,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 20,
  },
});
