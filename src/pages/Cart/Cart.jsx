import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import { toast } from 'react-toastify';
const Cart = () => {
  const { foods,cartItems, removeFromCart, getTotalCartAmount,user_id } = useContext(StoreContext);
  const navigate=useNavigate();
  let orderHandler=()=>{
    // !user_id?alert("You need to Login first"):navigate('/order');
    !user_id?toast.error("You are not logged in!"):navigate('/order');
  
  }
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foods.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>${item.price * cartItems[item.id]}</p>
                  <p className="cross" onClick={()=>removeFromCart(item.id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
                    <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
                
            </div>
            <button onClick={()=>orderHandler()}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
            <div>
                <p>If you have a promo code, Enter it here </p>
                <div className="cart-promocode-input">
                    <input type="text" placeholder="promo code" />
                    <button>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
