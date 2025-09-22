import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../api/SupabaseConfig";

export const fetchFoods = createAsyncThunk("FoodApp/fetchFoods", async () => {
  const res = await supabase.from("food_list").select("*");
  // console.log("Respose for fetching foods", res);
  return res?.data;
});
export const fetchMenu = createAsyncThunk("FoodApp/fetchMenu", async () => {
  const res = await supabase.from("menu").select("*");
  // console.log("Respose for fetching menu", res);
  return res?.data;
});
export const addUser = createAsyncThunk(
  "FoodApp/addUser",
  async (data) => {
    const res = await supabase.from("users").insert(data).single();
    console.log("Response for add user: ", res);
    return res?.data;
  }
);
export const fetchUsers = createAsyncThunk("FoodApp/fetchUsers",
    async(data)=>{
        const res = await supabase.from("users").select("*").eq("email",data.email).eq("password",data.password)
        console.log("Response for fetching users",res);
        return res?.data;
    })
const initial_value = {
  isLoading: true,
  menu: [],
  foods: [],
  error: null,
};
export const FoodAppSlice = createSlice({
  name: "FoodApp",
  initialState: initial_value,
  extraReducers: (builder) => {
    //fetching menu
    builder.addCase(fetchMenu.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      console.log("Action for fulfilled: ", action);
      state.isLoading = false;
      state.menu = action.payload;
      state.error = null;
    });

    builder.addCase(fetchMenu.rejected, (state, action) => {
      console.log("Action for rejected: ", action);
      state.isLoading = false;
      state.menu = [];
      state.error = action.error.message;
    });
    //fetching foods
    builder.addCase(fetchFoods.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      console.log("Action for fulfilled: ", action);
      state.isLoading = false;
      state.foods = action.payload;
      state.error = null;
    });

    builder.addCase(fetchFoods.rejected, (state, action) => {
      console.log("Action for rejected: ", action);
      state.isLoading = false;
      state.menu = [];
      state.error = action.error.message;
    });
    // addUser
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log("Action for fulfilled: ", action);
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      console.log("Action for rejected: ", action);
      state.isLoading = false;
      state.error = action.error.message;
    });
    //fetching Users
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("Action for fulfilled: ", action);
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
      sessionStorage.setItem("user_id",action.payload[0].id)
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("Action for rejected: ", action);
      state.isLoading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});
export default FoodAppSlice.reducer;
