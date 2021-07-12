import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ItemListScreen from "../screens/ItemListScreen";
import PaymentScreen from "../screens/PaymentScreen";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CartScreen from "../screens/CartScreen";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RegisterScreen from "../screens/RegisterScreen";
import Color from "../constants/Color";
import OrderScreen from "../screens/OrderScreen";
import LoginScreen from "../screens/LoginScreen";
import { navigationRef } from "./RootNavigation";
import CustomDrawerContent from "./CustomDrawerContent";
import UserDetailScreen from "../screens/UserDetailScreen";
import LogoutScreen from "../screens/LogoutScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import CardPaymentScreen from "../screens/CardPayment";

function LogoTitle() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <View style={styles.leftHeader}>
        <FontAwesome5 name="hamburger" size={60} color={Color.darkYellow} />
        <View style={styles.restaurantContainer}>
          <Text style={styles.restaurant}>Ladhar</Text>
          <Text style={styles.restaurant}>Restaurant</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Root() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: (props) => {
          null;
        },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: (props) => <Cart {...props} />,
        headerStyle: {
          height: 120,
          backgroundColor: "#FFFF66",
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ItemList" component={ItemListScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Details" component={UserDetailScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="CardPayment" component={CardPaymentScreen} />
    </Stack.Navigator>
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

const HomeNavigator = () => {
  const Home = createDrawerNavigator();

  return (
    <Home.Navigator
      initialRouteName="Home"
      drawerStyle={{
        width: "70%",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: Color.darkYellow,
        itemStyle: { margin: 2, padding: 5 },
      }}
    >
      <Home.Screen name="Home" component={Root} />
      <Home.Screen name="Register" component={RegisterScreen} />
      <Home.Screen name="Login" component={LoginScreen} />
    </Home.Navigator>
  );
};

const AuthNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        width: "70%",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: Color.darkYellow,
        itemStyle: { margin: 2, padding: 5 },
      }}
    >
      <Drawer.Screen name="Home" component={Root} />
      <Drawer.Screen name="Orders" component={OrderScreen} />
      <Drawer.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};
const MealsNavigator = () => {
  const { loggedIn } = useSelector((state) => state);
  //const loggedIn = true;
  return (
    <NavigationContainer ref={navigationRef}>
      {loggedIn ? <AuthNavigator /> : <HomeNavigator />}
    </NavigationContainer>
  );
};

export default MealsNavigator;

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
