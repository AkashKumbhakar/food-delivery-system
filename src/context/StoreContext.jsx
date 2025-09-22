import {  useEffect, useState } from "react";
import React from 'react'
import { fetchFoods, fetchMenu } from "../components/Redux/Slice/FoodAppSlice";
import { useDispatch, useSelector } from "react-redux";

export const StoreContext = React.createContext(null)
let user_id = sessionStorage.getItem("user_id"); 
console.log("user id in session storage",user_id);

const StoreContextProvider = (props) => {
const { isLoading,menu, foods, error } = useSelector((state) => state.posts);
const dispatch = useDispatch()
useEffect(() => {
    dispatch(fetchMenu())
      .then((res) => console.log("Fetched", res))
      .catch((err) => console.log("Error", err));
  }, [dispatch]);
useEffect(() => {
    dispatch(fetchFoods())
      .then((res) => console.log("Fetched", res))
      .catch((err) => console.log("Error", err));
  }, [dispatch]);
    // console.log("foods",foods);
  
    const [cartItems,setCartItems] = useState({})
    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
   const getTotalCartAmount=()=>{
    let totalAmount = 0;
    // console.log(cartItems);
    
    for(const item in cartItems)
        {
    console.log(item);
    
            if(cartItems[item]>0){
                let itemInfo = foods.find((product)=>product.id === parseInt(item))
                console.log("item info",itemInfo);
                
                totalAmount += itemInfo.price*cartItems[item]
            }
    }
    return totalAmount;
   }
    const contexValue = {
        menu,
        foods,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        user_id
    }
    return (
        <StoreContext.Provider value={contexValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;