import React, { useState } from "react";
import "./LoginPopup.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addUser, fetchUsers } from "../Redux/Slice/FoodAppSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const dispatch = useDispatch();
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const submitHandler = (data) => {
    console.log("Form Submitted : ", data);
    currentState === "Login"
      ? dispatch(
          fetchUsers({
            email: data.email,
            password: data.password,
          })
        )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Login Successful!",
            })
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
            });
          })
      : dispatch(
          addUser({
            name: data.name,
            email: data.email,
            password: data.password,
          })
        ).then((res) => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
            });
          })
  };
  return (
    <div className="login-popup">
      <form
        className="login-popup-container"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <IoMdClose
            className="close-icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your Name"
              required
              {...register("name", {
                required: {
                  value: true,
                  message: "* Name is required",
                },
              })}
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            required
            {...register("email", {
              required: {
                value: true,
                message: "* Email is required",
              },
            })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            {...register("password", {
              required: {
                value: true,
                message: "* Password is required",
              },
            })}
          />
        </div>
        <button>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
