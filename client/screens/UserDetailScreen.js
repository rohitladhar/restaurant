import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import Color from "../constants/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserDetailScreen = ({ route, navigation }) => {
  const { date, shippingPrice, cartItem, subtotalPrice, totalPrice } =
    route.params;
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const onSubmit = () => {
    if (!form.fname) {
      setErrors((prev) => {
        return { ...prev, fname: "Please add Name" };
      });
    }

    if (!form.phone) {
      setErrors((prev) => {
        return { ...prev, phone: "Please add a Phone" };
      });
    }
    if (!form.address) {
      setErrors((prev) => {
        return { ...prev, address: "Please add a Address" };
      });
    }

    if (
      Object.values(form).length === 3 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(errors).every((item) => !item)
    ) {
      navigation.navigate("Payment", {
        date: date,
        cartItem: cartItem,
        shippingPrice: shippingPrice,
        subtotalPrice: subtotalPrice,
        totalPrice: totalPrice,
        form: form,
      });
    }
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (value !== "") {
      if (name === "fname") {
        let reg = /^[a-zA-Z ]*$/;
        if (reg.test(form.fname) === false) {
          setErrors((prev) => {
            return { ...prev, [name]: "Name Invalid Format" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: "" };
          });
        }
      }

      if (name === "phone") {
        if (value.length !== 10) {
          setErrors((prev) => {
            return { ...prev, [name]: "Phone Number must be 10 digits" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: "" };
          });
        }
      }

      if (name === "address") {
        let reg = /^[a-zA-Z,'-'' '\.0-9\n]+$/;
        if (reg.test(form.address) === false) {
          setErrors((prev) => {
            return { ...prev, [name]: "Address Invalid Format" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: "" };
          });
        }
      }
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.welcome}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", paddingTop: "2%" }}
            >
              Add Details
            </Text>
          </View>
          <View style={styles.continue}>
            <Text style={{ fontSize: 15, color: "grey" }}>
              Shipping Details
            </Text>
          </View>
          <View style={{ width: "100%", paddingLeft: "4%" }}>
            <View style={styles.screenContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"account"}
                  size={35}
                  color={Color.darkYellow}
                />
              </View>

              <View>
                <View>
                  <Text style={styles.labelText}>Name</Text>
                </View>
                <View style={{ width: 240 }}>
                  <TextInput
                    style={styles.textInput}
                    multiline={false}
                    placeholder={"Enter Your Name"}
                    value={form.fname || null}
                    onChangeText={(value) => {
                      onChange({ name: "fname", value });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 10, justifyContent: "center" }}>
              <Text style={{ color: "red", paddingLeft: 15 }}>
                {errors.fname}
              </Text>
            </View>

            <View style={styles.screenContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"cellphone"}
                  size={35}
                  color={Color.darkYellow}
                />
              </View>

              <View>
                <View>
                  <Text style={styles.labelText}>Phone</Text>
                </View>
                <View style={{ width: 240 }}>
                  <TextInput
                    style={styles.textInput}
                    multiline={false}
                    placeholder={"Enter Value"}
                    keyboardType="number-pad"
                    placeholder={"Enter Your Phone"}
                    value={form.phone || null}
                    onChangeText={(value) => {
                      onChange({ name: "phone", value });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 10, justifyContent: "center" }}>
              <Text style={{ color: "red", paddingLeft: 15 }}>
                {errors.phone}
              </Text>
            </View>

            <View style={styles.addressContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={35}
                  color={Color.darkYellow}
                />
              </View>

              <View>
                <View>
                  <Text style={styles.labelText}>Address</Text>
                </View>

                <View style={{ height: 150, width: 240 }}>
                  <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder={"Enter Address"}
                    value={form.address || null}
                    onChangeText={(value) => {
                      onChange({ name: "address", value });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 20, justifyContent: "center" }}>
              <Text style={{ color: "red", paddingLeft: 15 }}>
                {errors.address}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onSubmit}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "#e1ad01" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    paddingTop: "5%",
    backgroundColor: "#f5f5f5",
    height: 600,
  },
  welcome: {
    paddingTop: 1,
  },
  continue: {
    paddingVertical: 1,
  },

  buttonContainer: {
    width: "90%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.yellow,
    borderRadius: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  account: {
    fontSize: 14,
    color: "black",
  },

  addressContainer: {
    width: "90%",
    height: 200,
    margin: 10,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
  },

  screenContainer: {
    width: "90%",
    height: 70,
    margin: 10,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
  },
  iconContainer: {
    paddingTop: "8%",
    paddingHorizontal: "3%",
  },
  textInput: {
    color: Color.darkYellow,
    fontSize: 17,
  },
  labelText: {
    color: "black",
    fontSize: 17,
  },
  textInputAddress: {
    color: Color.darkYellow,
    fontSize: 17,
    height: 40,
  },
});
