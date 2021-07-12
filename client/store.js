import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
//import userReducer from "./reducers/userReducer";

//const rootReducer = combineReducers({
// cartReducer,
//userReducer,
//});
const store = createStore(cartReducer);

export default store;
