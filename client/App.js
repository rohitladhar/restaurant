import React from "react";
import MealsNavigator from "./navigation/MealsNavigator";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import store from "./store";
export default function App() {
  LogBox.ignoreLogs([
    "Warning: Cannot update a component from inside the function body of a different component",
    "VirtualizedLists should never be nested",
  ]);
  return (
    <StripeProvider
      publishableKey="pk_key"
      merchantIdentifier="merchant.indentifier"
    >
      <Provider store={store}>
        <MealsNavigator />
      </Provider>
    </StripeProvider>
  );
}
