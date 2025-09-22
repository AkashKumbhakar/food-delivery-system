import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { supabase } from '../../api/SupabaseConfig';

const MyOrder = () => {
     const { user_id } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("order_data")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
    };

    if (user_id) fetchOrders();
  }, [user_id]);
  console.log(orders);
  
    
  return (
     <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <div className="order-header">
                <span>Order ID: {order.id}</span>
                <span>Status: {order.status_text}</span>
              </div>
              <div className="order-body">
                <p><b>Total:</b> ₹{order.amount}</p>
                <p><b>Placed on:</b> {new Date(order.created_at).toLocaleString()}</p>
                <p><b>Items:</b></p>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrder;