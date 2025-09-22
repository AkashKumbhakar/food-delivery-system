import React, { useContext} from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({category}) => {
  const { foods } = useContext(StoreContext);
  return (
    <div className="food-display" id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {foods.map((item)=>{
                if(category==="All" || category===item.category){
                return <FoodItem key={item.id} id={item.id} name={item.name} image={item.image} description={item.description} price={item.price}></FoodItem>
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay