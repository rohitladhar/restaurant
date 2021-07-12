import { ADD_TO_CART, INCREMENT, DECREMENT, EMPTYCART } from "../actions/types";
import { LOGIN, LOGOUT } from "../actions/types";
import DummyData from "../data/DummyData";
const initialState = {
  basket: [],
  userEmail: null,
  loggedIn: false,
};
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const product = state.basket.find((x) => x.id === item.id);
      if (product) {
        product["id"] = item.id;
        product["name"] = item.name;
        product["price"] = product.price + item.price;
        product["qty"] = product.qty + 1;
        product["image"] = product.image;
        return {
          ...state,
          basket: [...state.basket, { product }],
        };
      }

      return {
        ...state,
        basket: [
          ...state.basket,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image,
            qty: 1,
          },
        ],
      };
    case INCREMENT:
      const itemIncrement = action.payload;
      const productIncrement = state.basket.find(
        (x) => x.id === itemIncrement.id
      );
      const itemPriceIncrement = DummyData.find(
        (x) => x.id === itemIncrement.id
      );
      if (productIncrement) {
        productIncrement["id"] = itemIncrement.id;
        productIncrement["name"] = itemIncrement.name;
        productIncrement["price"] =
          productIncrement.price + itemPriceIncrement.price;
        productIncrement["qty"] = productIncrement.qty + 1;
        productIncrement["image"] = productIncrement.image;
        return {
          ...state,
          basket: [...state.basket, { productIncrement }],
        };
      }

    case DECREMENT:
      const itemDecrement = action.payload;
      const productDecrement = state.basket.find(
        (x) => x.id === itemDecrement.id
      );
      const itemPriceDecrement = DummyData.find(
        (x) => x.id === itemDecrement.id
      );
      if (productDecrement.qty > 1) {
        productDecrement["id"] = itemDecrement.id;
        productDecrement["name"] = itemDecrement.name;
        productDecrement["price"] =
          productDecrement.price - itemPriceDecrement.price;
        productDecrement["qty"] = productDecrement.qty - 1;
        productDecrement["image"] = productDecrement.image;
        return {
          ...state,
          basket: [...state.basket, { productDecrement }],
        };
      }

      if (productDecrement.qty === 1) {
        productDecrement["id"] = itemDecrement.id;
        productDecrement["name"] = itemDecrement.name;
        productDecrement["price"] = 0;
        productDecrement["qty"] = 0;
        productDecrement["image"] = productDecrement.image;
        return {
          ...state,
          basket: [...state.basket, { productDecrement }],
        };
      }
    case EMPTYCART:
      return {
        ...state,
        basket: [],
      };
    case LOGIN:
      const email = action.payload.email;
      return {
        ...state,
        userEmail: email,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        userEmail: null,
        loggedIn: false,
      };

    default:
      return state;
  }
}

export default cartReducer;
