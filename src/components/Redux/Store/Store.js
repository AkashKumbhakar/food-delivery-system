import { configureStore } from "@reduxjs/toolkit";
import FoodAppReducer from "../Slice/FoodAppSlice";
const Store = configureStore({
    reducer: {
        posts: FoodAppReducer,
    }
});
export default Store;