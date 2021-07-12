import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import axios from "axios";
import Color from "../constants/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { login } from "../actions/cartAction";
import axiosExtra from "../constants/axiosExtra";

const LoginScreen = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [colorCode, setColorCode] = useState({});
  const dispatch = useDispatch();
  const { baseUrl } = axiosExtra;
  const onSuccess = ({ data }) => {
    setForm({});
    setError("");
    setMessage(data.success);
    setColorCode({ color: "green" });
    dispatch(login(form.email));
    setTimeout(() => {
      navigation.navigate("Home");
    }, 5000);
  };
  const onFailure = (error) => {
    setForm({});
    setMessage("");
    if (error.message === "Network Error") {
      setError("Server Down For Maintenance");
      setColorCode({ color: "red" });
    } else {
      setError("Invalid Creditionals");
      setColorCode({ color: "red" });
    }
  };
  const onSubmit = () => {
    if (!form.email) {
      setErrors((prev) => {
        return { ...prev, email: "Please add a email" };
      });
    }
    if (!form.password) {
      setErrors((prev) => {
        return { ...prev, password: "Please add a password" };
      });
    }
    if (
      Object.values(form).length === 2 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(errors).every((item) => !item)
    ) {
      axios({
        method: "POST",
        url: baseUrl + "login",
        data: {
          email: form.email,
          password: form.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(onSuccess)
        .catch(onFailure);
    }
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (value !== "") {
      if (name === "email") {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(form.email) === false) {
          setErrors((prev) => {
            return { ...prev, [name]: "Email Invalid Format" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: "" };
          });
        }
      }

      if (name === "password") {
        if ((value.length = 0)) {
          setErrors((prev) => {
            return { ...prev, [name]: "" };
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
          <View>
            <Image source={require("../assets/logo1.png")} />
          </View>
          <View style={styles.welcome}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              Welcome Back
            </Text>
          </View>
          <View style={styles.continue}>
            <Text style={{ fontSize: 15, color: "grey" }}>
              Sign to continue
            </Text>
          </View>
          <View style={{ height: "35%", width: "100%", paddingLeft: "4%" }}>
            <View style={styles.screenContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"email-variant"}
                  size={35}
                  color={Color.darkYellow}
                />
              </View>

              <View style={styles.container}>
                <View>
                  <Text style={styles.labelText}>Email</Text>
                </View>
                <View style={{ width: "90%" }}>
                  <TextInput
                    style={styles.textInput}
                    multiline={false}
                    placeholder={"Email  "}
                    value={form.email || null}
                    onChangeText={(value) => {
                      onChange({ name: "email", value });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 10, justifyContent: "center" }}>
              <Text style={{ color: "red", paddingLeft: 15 }}>
                {errors.email}
              </Text>
            </View>

            <View style={styles.screenContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={"lock-outline"}
                  size={35}
                  color={Color.darkYellow}
                />
              </View>

              <View style={styles.container}>
                <View>
                  <Text style={styles.labelText}>Password</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.textInput}
                    multiline={false}
                    placeholder={"Password  "}
                    value={form.password || null}
                    secureTextEntry={true}
                    onChangeText={(value) => {
                      onChange({ name: "password", value });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 10, justifyContent: "center" }}>
              <Text style={{ color: "red", paddingLeft: 15 }}>
                {errors.password}
              </Text>
            </View>
            <View>
              <Text style={[styles.message, colorCode]}>
                {message || error}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.account}>Don't have an account? </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: Color.darkYellow }}>
                  {" "}
                  Create new Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 70, paddingTop: "1%" }}>
            <Text style={styles.copyright}>© All Rights are Reserved</Text>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    paddingTop: "5%",
    backgroundColor: "#f5f5f5",
  },
  welcome: {
    paddingTop: 1,
  },
  continue: {
    paddingVertical: 1,
  },
  buttonContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    paddingTop: "4%",
  },
  button: {
    width: "90%",
    backgroundColor: Color.darkYellow,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
  copyright: {
    fontSize: 15,
    color: "black",
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
  message: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: "1%",
  },
});
