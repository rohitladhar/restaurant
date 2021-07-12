import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Color from "../constants/Color";
import DummyData from "../data/DummyData";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
//import * as FileSystem from "expo-file-system";

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

const OrderDetailScreen = ({ route }) => {
  const { itemList } = route.params;
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            
            .title {
                text-align: center;
                color: rgb(255, 196, 0);
                font-size: 30px;
            }
            .subtitle{
              text-align:center;
              color: rgb(255, 196, 0);
              font-size: 15px;
            }
            h4{
              font-size:10px
            }
            .flex-container {
              display: flex;
            }
            
            .flex-container > div {
              font-size: 12px;
              height:100px;
            }

            .flex-containerFirst {
              display: flex;
              align-items: center;
              border-style: solid;
            }
            
            .flex-containerFirst > div {
              font-size: 12px;
              font-weight:bold;
              margin-left:15px
            }
            .flex-containerSecond {
              display: flex;
              align-items: center;
              border-style: solid;
            }
            
            .flex-containerSecond > div {
              font-size: 12px;
              font-weight:bold;
              margin-left:15px
            }

            .flex-containerThird{
              display: flex;
              align-items: center;
            }
            
            .flex-containerThird > div {
              font-size: 15px;
              font-weight:bold;
              margin-left:15px
            }

            .hrItem {
              border: none;
              height: 1px;
              color: rgb(255, 196, 0);
          }
        </style>
    </head>
    <body>
      <div>
        <h1 class="title">🍔 Ladhar Restaurant<br/>
        <span class="subtitle">A Perfect Home For Foodies</span> 
        </h1>
      </div>
        
        <div class="flex-container">
          <div style="flex-grow: 2; ">
            Sold By<br/>
            Ladhar Restaurant<br/>
            Kirti Nagar<br/>
            Phagwara<br/>
            Punjab<br/>
          </div>
          <div style="flex-grow: 4;">
            Delivery Address<br/>
            ${itemList.name}<br/>
            ${itemList.address}
          </div>
          <div style="flex-grow: 4;">
            Billing Address<br/>
            ${itemList.name}<br/>
            ${itemList.address}
          </div>
    
        </div>
        <div class="flex-containerFirst">
          <div style="Width:80%; border-right-style:solid;">
            Food Items
          </div>
          <div style="Width:10%; border-right-style:solid;">
            Quanitity
          </div>
          <div style="Width:10%;">
            Price
          </div>
    
        </div>
        <div class="flex-containerSecond">
          <div style="Width:80%; border-right-style:solid;">
          ${itemList.cartItems
            .map(({ name }) => {
              return `<h4>${name}</h4>`;
            })
            .join(" ")}
          </div>
          <div style="Width:10%; border-right-style:solid;">
          ${itemList.cartItems
            .map(({ qty }) => {
              return `<h4>${qty}</h4>`;
            })
            .join(" ")}
          </div>
          <div style="Width:10%;">
          ${itemList.cartItems
            .map(({ price }) => {
              return `<h4>₹  ${price}</h4>`;
            })
            .join(" ")}
          </div>
        </div>
        <br/>
        <br/>
        <div class="flex-containerThird">
          <div style="Width:60%; ">
          </div>
          <div style="Width:30%; ;">
            Items Price<br/>
            Delivery Charges<br/>
            Total Price <br/>
          </div>
          <div style="Width:10%;">
            ₹ ${itemList.itemsPrice}<br/>
            ${itemList.deliveryCharges}<br/>
            ₹ ${itemList.totalPrice} <br/>
          </div>
    
        </div>
        <br/><br/>
        <hr class='hrItem' />
        This is computer generated invoice no signature required. All Rights are reserved by Ladhar Restaurant
    </body>
    </html>
`;
  async function createAndSavePDF() {
    try {
      const response = await Print.printToFileAsync({ html: htmlContent });
      const { uri } = response;
      const pdfName = `${response.uri.slice(146, 146)}invoice_${
        itemList._id
      }.pdf`;

      if (Platform.OS === "ios") {
        await Sharing.shareAsync(pdfName);
        Alert.alert("Order Invoice", "Invoice Downloaded", [{ text: "OK" }]);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
          Alert.alert("Order Invoice", "Invoice Downloaded", [{ text: "OK" }]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
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

      <ScrollView>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdText}>Order Id-{itemList._id}</Text>
        </View>

        <View style={{ width: "100%" }}>
          {itemList.cartItems.map((item) => {
            return (
              <View
                key={item.id}
                style={{ flexDirection: "row", margin: 5, padding: 5 }}
              >
                <View style={{ width: "70%", paddingLeft: "7%" }}>
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                  <Text style={{ color: "green" }}>₹ {item.price}</Text>
                  <Text style={{ fontSize: 12, color: Color.darkYellow }}>
                    Quantity:- {item.qty}
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  {DummyData.filter((data) => data.id === item.id).map(
                    (filtereddata) => (
                      <View key={filtereddata.id}>
                        <Image
                          source={filtereddata.image}
                          style={{ width: 80, height: 80 }}
                        />
                      </View>
                    )
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={{ paddingLeft: "5%" }}
          onPress={createAndSavePDF}
        >
          <Text>
            <MaterialCommunityIcons
              name="receipt"
              size={25}
              color={Color.darkYellow}
            />
            <Text
              style={{
                color: Color.darkYellow,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Download Invoice
            </Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.personalContainer}>
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 12 }}>Delivery Details</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {itemList.name}
            </Text>
            <Text>Phone:-{itemList.phone}</Text>
            <Text>Order Date:-{itemList.date}</Text>
            <Text>{itemList.address}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 12 }}>Price Details</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "80%", paddingVertical: 10 }}>
              <Text>Items Price</Text>
              <Text>Delivery Charges</Text>
              <Text>Total Price</Text>
            </View>
            <View style={{ width: "20%", paddingVertical: 10 }}>
              <Text>₹ {itemList.itemsPrice}</Text>
              <Text>{itemList.deliveryCharges}</Text>
              <Text>₹ {itemList.totalPrice}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 20, paddingLeft: "7%", paddingBottom: "7%" }}>
          <Text>⦿ {itemList.modeOfPayment}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailScreen;

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
  orderIdContainer: {
    height: 30,
    paddingLeft: "7%",
    paddingTop: "2%",
  },
  invoiceContainer: {
    paddingLeft: "5%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  invoiceText: {
    color: Color.darkYellow,
    fontSize: 15,
    fontWeight: "bold",
  },
  invoiceContainerRight: {
    width: "50%",
    color: Color.darkYellow,
    justifyContent: "flex-end",
  },
  personalContainer: {
    height: 200,
    width: "100%",
    paddingLeft: "7%",
  },
  priceContainer: {
    height: 120,
    width: "100%",
    paddingLeft: "7%",
  },
});
