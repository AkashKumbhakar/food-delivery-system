import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { supabase } from "../../api/SupabaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
const stripePromise = loadStripe(
  "pk_test_51SA4RyCpG6xHkkDxIULcfCYAsGMSboRsH5NcyN7ZG6nrH73D1xkThdttEHhsXJYRW3PC5MnnE0u97xmT01C9D21200ukHt89G3"
);
const PlaceOrder = () => {
  const { foods, cartItems, getTotalCartAmount, user_id } =
    useContext(StoreContext);

  const placeOrder = async () => {
    const stripe = await stripePromise;
  const orderItems = foods
    .filter((food) => cartItems[food.id] > 0)
    .map((food) => ({
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: cartItems[food.id],
    }));

  const { data: newOrder } = await supabase
    .from("order_data")
    .insert([
      {
        user_id,        
        items: orderItems, 
        amount: getTotalCartAmount()+2,
        status_text: "pending", // default
      },
    ])
    .select()
    .single();

  console.log("Order created:", newOrder);


  
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1SACcMCpG6xHkkDxoVtfC8yC", 
          quantity: 1,
        },
      ],
      mode: "payment",
      // customerEmail: data.email,
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
      
    });
    console.log(cartItems);
    if (error) {
      console.error("Stripe Checkout Error:", error);
    }
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input name="email" type="email" placeholder="Email Address" required />
        <input name="street" type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input name="city" type="text" placeholder="City" required />
          <input name="state" type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input name="zipcode" type="text" placeholder="Zip Code" required />
          <input name="country" type="text" placeholder="Country" required />
        </div>
        <input name="phone" type="text" placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="button" onClick={placeOrder}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
