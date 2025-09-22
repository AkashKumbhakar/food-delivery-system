import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <Card className="food-item" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <div className="food-item-img-container">
          <CardMedia component="img" height="140" image={image} alt="" />

          {!cartItems[id] ? (
            <IoMdAdd
              className="add"
              style={{ fontSize: "28px" }}
              onClick={() => addToCart(id)}
            ></IoMdAdd>
          ) : (
            <div className="food-item-counter">
              <IoMdRemoveCircleOutline
                style={{ fontSize: "22px", color: "red" }}
                onClick={() => removeFromCart(id)}
              ></IoMdRemoveCircleOutline>
              <p style={{ fontSize: "22px" }}>{cartItems[id]}</p>
              <IoAddCircleOutline
                style={{ fontSize: "22px", color: "green" }}
                onClick={() => addToCart(id)}
              ></IoAddCircleOutline>
            </div>
          )}
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "20px", fontWeight: 500, margin: "10px 0px" }}
          >
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "tomato",
              fontSize: "22px",
              fontWeight: 500,
              margin: "10px 0px",
            }}
          >
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default FoodItem;
